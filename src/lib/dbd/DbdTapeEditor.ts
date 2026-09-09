import {DbdTape, TapeSecond} from "@/lib/dbd/DbdTape"

/**
 * Слой правок ленты с байт-точной сборкой.
 *
 * Работает над расшифрованным буфером. Длину файла сохраняем за счёт
 * FF-заполнителя: при удлинении записи «съедаем» соседние байты 0xFF,
 * при укорачивании — дописываем 0xFF. Байты вне правок не меняются,
 * поэтому сборка обратно (шифрование) даёт исходный файл с точностью до правок.
 *
 * Порт логики из исследовательского Python-редактора (lenta.py).
 */

const K_PRESSURE = 0.04
const PRESS_CODE: Record<"TM" | "UR" | "TC", number> = {TM: 0x05, UR: 0x06, TC: 0x08}

export class DbdTapeEditor {
    private buf: Buffer

    /** @param plain расшифрованный .dbd (открытый вид); копируется. */
    constructor(plain: Buffer) {
        this.buf = Buffer.from(plain)
    }

    /** Текущий буфер (открытый вид) после всех правок. */
    result(): Buffer {
        return this.buf
    }

    private tape(): DbdTape {
        return new DbdTape(this.buf)
    }

    /**
     * Секунда (кадр) по индексу в ленте. Адресация по индексу, а не по времени:
     * одна и та же секунда встречается несколько раз (регистратор пишет по
     * нескольку кадров в секунду), поэтому время неуникально. Индекс же уникален
     * и стабилен — FF-сплайс не меняет порядок и число кадров.
     */
    private secAt(index: number): TapeSecond {
        const secs = this.tape().parse().seconds
        const sec = secs[index]
        if(!sec) throw new Error(`кадр #${index} не найден (всего ${secs.length})`)
        return sec
    }

    /**
     * Заменить кусок [off, off+delLen) на ins, сохранив общий размер файла
     * за счёт FF-заполнителя рядом с местом правки.
     */
    private splice(off: number, delLen: number, ins: Buffer): void {
        const before = this.buf.subarray(0, off)
        const after = this.buf.subarray(off + delLen)
        let merged = Buffer.concat([before, ins, after])
        const delta = ins.length - delLen

        if(delta > 0){
            // стало длиннее — удаляем delta байт 0xFF после места правки
            let eaten = 0
            let i = off + ins.length
            const arr = Array.from(merged)
            while(eaten < delta && i < arr.length){
                if(arr[i] === 0xff){ arr.splice(i, 1); eaten++ }
                else i++
            }
            if(eaten < delta) throw new Error("не хватило FF-заполнителя рядом с правкой")
            merged = Buffer.from(arr)
        } else if(delta < 0){
            // стало короче — дописываем FF на место правки
            merged = Buffer.concat([
                merged.subarray(0, off + ins.length),
                Buffer.alloc(-delta, 0xff),
                merged.subarray(off + ins.length)
            ])
        }
        this.buf = merged
    }

    /** Установить давление (кгс/см^2, шаг 0.04) в кадре #index. */
    setPressure(index: number, kind: "TM" | "UR" | "TC", kgf: number): void {
        const sec = this.secAt(index)
        const val = Math.max(0, Math.min(255, Math.round(kgf / K_PRESSURE)))
        const rec = Buffer.from([val, PRESS_CODE[kind]])
        const existing = sec.items.find(it=>it.kind === "pressure" && it.label === kind)
        if(existing) this.splice(existing.offset, 2, rec)
        else this.splice(this.groupStart(sec), 0, rec)   // записи не было — вставляем
    }

    /** Установить младший байт маски дискретных сигналов в кадре #index. */
    setDiscrete(index: number, maskLo: number): void {
        const sec = this.secAt(index)
        const existing = sec.items.find(it=>it.kind === "discrete")
        if(existing){
            const tail = this.buf.subarray(existing.offset + 1, existing.offset + 5)   // 00 02 40 6e
            this.splice(existing.offset, 5, Buffer.concat([Buffer.from([maskLo]), tail]))
        } else {
            this.splice(this.groupStart(sec), 0, Buffer.from([maskLo, 0x00, 0x02, 0x40, 0x6e]))
        }
    }

    /** Удалить записи-события 0x8F в кадре #index. */
    dropEvents(index: number): void {
        const sec = this.secAt(index)
        for(const ev of [...sec.events].reverse()) this.splice(ev.offset, 7, Buffer.alloc(0))
    }

    /** Записать байт кадра: field "speed" (+3) или "speedLimit" (+5). */
    setFrameByte(index: number, field: "speed" | "speedLimit", value: number): void {
        const sec = this.secAt(index)
        const off = sec.offset + (field === "speed" ? 3 : 5)
        this.buf[off] = Math.max(0, Math.min(255, Math.round(value)))
    }

    /**
     * Правка сырой записи #itemIndex внутри кадра #index (режим «песочницы»).
     * Длина записи сохраняется — байты ровно поверх.
     */
    setRawItem(index: number, itemIndex: number, hex: string): void {
        const sec = this.secAt(index)
        const it = sec.items[itemIndex]
        if(!it) throw new Error(`запись #${itemIndex} не найдена в кадре #${index}`)
        const bytes = Buffer.from(hex, "hex")
        const cur = Buffer.from(it.hex, "hex")
        if(bytes.length !== cur.length) throw new Error("длина сырой записи должна совпадать")
        bytes.copy(this.buf, it.offset)
    }

    /** Начало группы данных секунды (для вставки новых записей). */
    private groupStart(sec: TapeSecond): number {
        // группа = от конца предыдущего кадра до этого; вставляем в начало группы
        return sec.items.length > 0 ? sec.items[0].offset : sec.offset
    }
}
