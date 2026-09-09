/**
 * Разбор расшифрованной ленты КЛУБ-У (открытый .dbd) в структурированную модель.
 *
 * Принцип без потерь: модель хранит исходный байтовый буфер и накладывает
 * поверх него семантику (смещения записей). Любая правка — это точечная запись
 * байт по известному смещению, поэтому сборка обратно всегда байт-точная.
 *
 * Пока реализовано только ЧТЕНИЕ (декодирование в JSON-модель).
 * Правки данных и повторная сборка — отдельный слой (следующий этап).
 *
 * Порт логики из исследовательского Python-парсера (lenta.py).
 */

const K_PRESSURE = 0.04   // байт -> кгс/см^2

/** Тип давления по байту-типу записи внутри группы секунды. */
const PRESSURE_TYPE: Record<number, "TM" | "UR" | "TC"> = {
    0x05: "TM",   // тормозная магистраль
    0x06: "UR",   // уравнительный резервуар
    0x08: "TC"    // тормозные цилиндры
}

export interface TapeEvent {
    offset: number
    hex: string
}

export interface TapeItem {
    offset: number
    kind: "pressure" | "coord" | "discrete" | "event" | "raw"
    label: string
    /** сырые байты записи (hex) — для «песочницы» и неизвестных типов */
    hex: string
    /** декодированное значение, если тип известен */
    value?: number | string | null
}

export interface TapeSecond {
    /** абсолютное смещение 9-байтового кадра секунды в буфере */
    offset: number
    year: number
    month: number
    day: number
    hour: number
    minute: number
    second: number
    /** скорость, км/ч (сырой байт кадра) */
    speed: number
    /** ограничение скорости / Vдоп, км/ч (сырой байт кадра) */
    speedLimit: number
    /** флаговый байт кадра */
    flags: number
    /** давления, кгс/см^2 (undefined — записи в этой секунде не было) */
    pressureTM?: number
    pressureUR?: number
    pressureTC?: number
    /** координата, метры */
    coord?: number
    /** младший байт маски дискретных сигналов */
    discrete?: number
    /** события (записи типа 0x8F) */
    events: TapeEvent[]
    /** все мелкие записи внутри группы секунды (в т.ч. неизвестные) */
    items: TapeItem[]
}

export interface TapeMinute {
    offset: number
    year: number
    month: number
    day: number
    hour: number
    minute: number
}

export interface TapeModel {
    /** длина открытого заголовка (копируется как есть) */
    headerLen: number
    minutes: TapeMinute[]
    seconds: TapeSecond[]
}

export interface FieldChange {
    field: string
    a: number | string | null
    b: number | string | null
}

export interface SecondDiff {
    key: string
    /** тип: изменён / добавлен в B (вставка) / удалён из A */
    kind: "change" | "insert" | "delete"
    /** индекс кадра в файле A (для навигации/подсветки); для вставки — позиция вставки */
    indexA: number
    year: number
    month: number
    day: number
    hour: number
    minute: number
    second: number
    /** изменения известных полей */
    changes: FieldChange[]
    /** различаются ли сырые байты группы (ловит и неизвестные записи) */
    rawChanged: boolean
    /** конкатенация hex значимых записей группы — для «песочницы» */
    rawA: string
    rawB: string
}

const HDR = 0x108

const secKey = (s: {day: number, hour: number, minute: number, second: number}) =>
    `${s.day}:${s.hour}:${s.minute}:${s.second}`

/** Сырые значимые байты группы секунды (без FF-заполнителя) — по записям items. */
const rawSig = (s: TapeSecond): string => s.items.map(it=>it.hex).join("")

const KNOWN_FIELDS: {field: string, get: (s: TapeSecond)=>number | undefined}[] = [
    {field: "speed", get: s=>s.speed},
    {field: "speedLimit", get: s=>s.speedLimit},
    {field: "coord", get: s=>s.coord},
    {field: "pressureTM", get: s=>s.pressureTM},
    {field: "pressureUR", get: s=>s.pressureUR},
    {field: "pressureTC", get: s=>s.pressureTC},
    {field: "discrete", get: s=>s.discrete},
    {field: "events", get: s=>s.events.length}
]

/** Полная сигнатура содержимого кадра (для выравнивания). */
const frameSig = (s: TapeSecond): string =>
    `${s.speed},${s.speedLimit},${s.second}|${rawSig(s)}`

const fieldChanges = (sa: TapeSecond, sb: TapeSecond): FieldChange[] => {
    const changes: FieldChange[] = []
    for(const k of KNOWN_FIELDS){
        const va = k.get(sa) ?? null
        const vb = k.get(sb) ?? null
        if(va !== vb) changes.push({field: k.field, a: va, b: vb})
    }
    return changes
}

const mkDiff = (kind: "change" | "insert" | "delete", indexA: number,
                sa: TapeSecond | null, sb: TapeSecond | null): SecondDiff => {
    const ref = (sa ?? sb) as TapeSecond
    return {
        kind, indexA, key: secKey(ref),
        year: ref.year, month: ref.month,
        day: ref.day, hour: ref.hour, minute: ref.minute, second: ref.second,
        changes: sa && sb ? fieldChanges(sa, sb) : [],
        rawChanged: (sa ? rawSig(sa) : "") !== (sb ? rawSig(sb) : ""),
        rawA: sa ? rawSig(sa) : "",
        rawB: sb ? rawSig(sb) : ""
    }
}

/**
 * Сравнение двух лент «до/после» с ВЫРАВНИВАНИЕМ последовательностей.
 *
 * Правки могут добавлять/удалять кадры (напр. «убрать экстренное — сделать
 * стоянку»), из-за чего простое позиционное сравнение «съезжает» и выдаёт тысячи
 * ложных отличий. Поэтому идём двумя указателями и при рассинхроне ищем ближайшую
 * точку повторной синхронизации (ограниченный просмотр вперёд по сигнатуре кадра),
 * помечая блок как изменённый / вставленный / удалённый.
 *
 * Ловит изменения известных полей И любых записей (в т.ч. неразобранных).
 */
export function diffTapes(a: TapeModel, b: TapeModel): SecondDiff[] {
    const A = a.seconds, B = b.seconds
    const sigA = A.map(frameSig), sigB = B.map(frameSig)
    const W = 400          // окно ресинка (перекрывает локальные вставки/удаления)
    const RUN = 4          // столько совпадающих кадров подряд считаем синхронизацией
    const out: SecondDiff[] = []
    let i = 0, j = 0

    const runMatches = (ai: number, bj: number): boolean => {
        for(let k = 0; k < RUN; k++){
            if(ai + k >= A.length || bj + k >= B.length) return ai + k >= A.length && bj + k >= B.length
            if(sigA[ai + k] !== sigB[bj + k]) return false
        }
        return true
    }

    while(i < A.length || j < B.length){
        if(i < A.length && j < B.length && sigA[i] === sigB[j]){ i++; j++; continue }

        // поиск ближайшей точки ресинка: минимизируем a+b, где A[i+a] совпадает с B[j+b]
        let best: {a: number, b: number} | null = null
        for(let s = 1; s <= 2 * W && !best; s++){
            for(let x = Math.max(0, s - W); x <= Math.min(s, W); x++){
                const y = s - x
                if(y < 0 || y > W) continue
                if(i + x <= A.length && j + y <= B.length && runMatches(i + x, j + y)){
                    best = {a: x, b: y}; break
                }
            }
        }
        const da = best ? best.a : (i < A.length ? A.length - i : 0)
        const db = best ? best.b : (j < B.length ? B.length - j : 0)

        // спарить перекрытие как «изменения», остаток — вставка/удаление
        const paired = Math.min(da, db)
        for(let k = 0; k < paired; k++) out.push(mkDiff("change", i + k, A[i + k], B[j + k]))
        for(let k = paired; k < da; k++) out.push(mkDiff("delete", i + k, A[i + k], null))
        for(let k = paired; k < db; k++) out.push(mkDiff("insert", i + paired, null, B[j + k]))
        i += da; j += db
    }
    // «изменения» без реальной разницы отбрасываем
    return out.filter(d=>d.kind !== "change" || d.changes.length > 0 || d.rawChanged)
}

export class DbdTape {
    /** @param plain расшифрованный .dbd (открытый вид) */
    constructor(private plain: Buffer) {

    }

    /**
     * Маркер минуты — это полная метка времени из 6 байт:
     *   [год][месяц][день][час][минута][7F]
     *   год   = байт0 + 1792   (0xE8→2024, 0xE9→2025, 0xEA→2026)
     *   месяц = байт1 − 0x70   (0x71→январь … 0x7C→декабрь)
     * Такой разбор не зависит от версии прошивки и корректно ловит записи,
     * охватывающие несколько месяцев/годов (в одной ленте бывает 2 секции дат).
     */
    private isMinuteAt(i: number): boolean {
        const d = this.plain
        return d[i + 5] === 0x7f
            && d[i] >= 0xe0 && d[i] <= 0xf0           // год ≈ 2016..2032
            && d[i + 1] >= 0x71 && d[i + 1] <= 0x7c   // месяц 1..12
            && d[i + 2] >= 1 && d[i + 2] <= 31        // день
            && (d[i + 3] & 0x7f) <= 23                // час
            && d[i + 4] <= 59                         // минута
    }

    /** Маркеры минут с полной датой (год/месяц/день/час/минута). */
    minuteMarks(): TapeMinute[] {
        const d = this.plain
        const out: TapeMinute[] = []
        for(let i = HDR; i < d.length - 6; i++){
            if(this.isMinuteAt(i)){
                out.push({
                    offset: i,
                    year: d[i] + 1792,
                    month: d[i + 1] - 0x70,
                    day: d[i + 2],
                    hour: d[i + 3] & 0x7f,
                    minute: d[i + 4]
                })
            }
        }
        return out
    }

    /** Кадры секунд в диапазоне [lo, hi): [fl][sec][00][V][00][Vlim][00][00]AE. */
    private secondFrames(lo: number, hi: number): number[] {
        const d = this.plain
        const out: number[] = []
        const end = Math.min(hi, d.length - 9)
        for(let i = lo; i < end; i++){
            if(d[i + 8] === 0xae && d[i + 1] < 60 && d[i + 2] === 0
                && d[i + 4] === 0 && d[i + 6] === 0 && d[i + 7] === 0){
                out.push(i)
            }
        }
        return out
    }

    /** Декодирование мелких записей внутри группы [a, b). */
    private decodeGroup(a: number, b: number): TapeItem[] {
        const d = this.plain
        const out: TapeItem[] = []
        let p = a
        while(p < b){
            if(d[p] === 0xff){ p++; continue }
            if(p + 1 < b && PRESSURE_TYPE[d[p + 1]] !== undefined){
                const t = PRESSURE_TYPE[d[p + 1]]
                out.push({
                    offset: p, kind: "pressure", label: t,
                    hex: d.subarray(p, p + 2).toString("hex"),
                    value: Math.round(d[p] * K_PRESSURE * 100) / 100
                })
                p += 2; continue
            }
            if(p + 3 < b && d[p + 3] === 0x5d){
                out.push({
                    offset: p, kind: "coord", label: "COORD",
                    hex: d.subarray(p, p + 4).toString("hex"),
                    value: (d[p] << 16) | (d[p + 1] << 8) | d[p + 2]
                })
                p += 4; continue
            }
            if(p + 4 < b && d[p + 4] === 0x6e){
                out.push({
                    offset: p, kind: "discrete", label: "DISCR",
                    hex: d.subarray(p, p + 5).toString("hex"),
                    value: d[p]
                })
                p += 5; continue
            }
            if(p + 6 < b && d[p + 6] === 0x8f){
                out.push({
                    offset: p, kind: "event", label: "EV8F",
                    hex: d.subarray(p, p + 7).toString("hex"),
                    value: null
                })
                p += 7; continue
            }
            out.push({
                offset: p, kind: "raw", label: "raw",
                hex: d.subarray(p, p + 1).toString("hex"),
                value: null
            })
            p++
        }
        return out
    }

    /** Полная модель: минуты и посекундная шкала с декодированными параметрами. */
    parse(): TapeModel {
        const d = this.plain
        const minutes = this.minuteMarks()
        const seconds: TapeSecond[] = []

        for(let k = 0; k < minutes.length; k++){
            const m = minutes[k]
            const end = k + 1 < minutes.length ? minutes[k + 1].offset : d.length
            // группа кадра = записи между предыдущей границей и этим кадром.
            // Границу ведём линейно (после маркера минуты и после каждого кадра),
            // а не обратным сканированием — иначе группа первого кадра заезжает
            // в высокоэнтропийную преамбулу и парсится как мусор.
            let prevEnd = m.offset + 6
            for(const off of this.secondFrames(m.offset, end)){
                const items = this.decodeGroup(prevEnd, off)
                prevEnd = off + 9
                const sec: TapeSecond = {
                    offset: off,
                    year: m.year, month: m.month,
                    day: m.day, hour: m.hour, minute: m.minute,
                    second: d[off + 1],
                    speed: d[off + 3],
                    speedLimit: d[off + 5],
                    flags: d[off],
                    events: [],
                    items
                }
                for(const it of items){
                    if(it.kind === "pressure" && it.label === "TM") sec.pressureTM = it.value as number
                    if(it.kind === "pressure" && it.label === "UR") sec.pressureUR = it.value as number
                    if(it.kind === "pressure" && it.label === "TC") sec.pressureTC = it.value as number
                    if(it.kind === "coord") sec.coord = it.value as number
                    if(it.kind === "discrete") sec.discrete = it.value as number
                    if(it.kind === "event") sec.events.push({offset: it.offset, hex: it.hex})
                }
                seconds.push(sec)
            }
        }
        return {headerLen: HDR, minutes, seconds}
    }
}
