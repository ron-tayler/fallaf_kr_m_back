import {createCipheriv, createDecipheriv} from "crypto"

/**
 * Расшифровка/шифрование ленты КЛУБ-У формата СУД (файлы .dbd).
 *
 * Схема вскрыта из USK.dll / SudLite.exe (класс TCipherAES):
 *   AES-256-CBC
 *   KEY = "15F4CFD6-40A6-49C1-99C8-5926D244"  (первые 32 байта GUID-строки)
 *   IV  = "m31!40\x12aDb87Q1~5"               (16 байт, hex 6d33...7e35)
 *   Дополнение — нулевыми байтами до кратности 16.
 *
 * Контейнер зашифрованного .dbd:
 *   0x000  264   заголовок (открытый текст, копируется как есть)
 *   0x108  4     сигнатура FF 52 50 41 ("ÿRPA")
 *   0x10C  8     размер расшифрованного файла, uint64 little-endian
 *   0x114  ...   AES-256-CBC шифртекст
 */

const KEY = Buffer.from("15F4CFD6-40A6-49C1-99C8-5926D244", "latin1")
const IV = Buffer.from("6d333121343012614462383751317e35", "hex")
const MAGIC = Buffer.from([0xff, 0x52, 0x50, 0x41])   // "ÿRPA"

const HDR = 0x108     // длина открытого заголовка
const BODY = 0x114    // смещение начала шифртекста

export class DbdCrypto {
    constructor(
        private key: Buffer = KEY,
        private iv: Buffer = IV
    ) {

    }

    /** Признак зашифрованного контейнера (наличие сигнатуры "ÿRPA"). */
    isEncrypted(dbd: Buffer): boolean{
        return dbd.length >= HDR + 4 && dbd.subarray(HDR, HDR + 4).equals(MAGIC)
    }

    /**
     * Расшифровать .dbd в открытый вид.
     * Если файл не зашифрован — возвращается без изменений.
     */
    decrypt(dbd: Buffer): Buffer{
        if(!this.isEncrypted(dbd)) return dbd

        const size = Number(dbd.readBigUInt64LE(HDR + 4))
        const ctLen = Math.floor((dbd.length - BODY) / 16) * 16
        const ct = dbd.subarray(BODY, BODY + ctLen)

        const decipher = createDecipheriv("aes-256-cbc", this.key, this.iv)
        decipher.setAutoPadding(false)
        const body = Buffer.concat([decipher.update(ct), decipher.final()])

        return Buffer.concat([dbd.subarray(0, HDR), body]).subarray(0, size)
    }

    /**
     * Зашифровать открытый .dbd обратно в формат контейнера.
     * Если файл уже зашифрован — возвращается без изменений.
     */
    encrypt(plain: Buffer): Buffer{
        if(this.isEncrypted(plain)) return plain

        const body = plain.subarray(HDR)
        const pad = (16 - (body.length % 16)) % 16
        const bodyPadded = Buffer.concat([body, Buffer.alloc(pad)])   // дополнение нулями

        const cipher = createCipheriv("aes-256-cbc", this.key, this.iv)
        cipher.setAutoPadding(false)
        const ct = Buffer.concat([cipher.update(bodyPadded), cipher.final()])

        const size = Buffer.alloc(8)
        size.writeBigUInt64LE(BigInt(plain.length))

        return Buffer.concat([plain.subarray(0, HDR), MAGIC, size, ct])
    }
}
