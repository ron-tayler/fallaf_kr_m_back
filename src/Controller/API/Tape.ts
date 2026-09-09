import {
    BaseHttpController,
    controller,
    httpPost, request, response
} from "inversify-express-utils"
import {Request, Response} from "express"

import {DbdCrypto} from "@/lib/dbd/DbdCrypto"
import {DbdTape, diffTapes} from "@/lib/dbd/DbdTape"
import {DbdTapeEditor} from "@/lib/dbd/DbdTapeEditor"

/**
 * API графического редактора ленты КЛУБ-У (.dbd).
 *
 * Сервер stateless: клиент загружает файл, получает модель + расшифрованный
 * буфер (base64), правки применяются к этому буферу при сохранении.
 *
 * POST /api/tape/parse  { fileBase64 }                  -> { model, plainBase64 }
 * POST /api/tape/save   { plainBase64, edits[] }        -> { fileBase64 }
 */

type Edit =
    | {op: "pressure", index: number, kind: "TM" | "UR" | "TC", kgf: number}
    | {op: "discrete", index: number, mask: number}
    | {op: "dropEvents", index: number}
    | {op: "frameByte", index: number, field: "speed" | "speedLimit", value: number}
    | {op: "rawItem", index: number, itemIndex: number, hex: string}

const applyEdit = (ed: DbdTapeEditor, e: Edit): void => {
    switch(e.op){
        case "pressure":   ed.setPressure(e.index, e.kind, e.kgf); break
        case "discrete":   ed.setDiscrete(e.index, e.mask); break
        case "dropEvents": ed.dropEvents(e.index); break
        case "frameByte":  ed.setFrameByte(e.index, e.field, e.value); break
        case "rawItem":    ed.setRawItem(e.index, e.itemIndex, e.hex); break
    }
}

@controller("/api/tape")
export class Controller_API_Tape extends BaseHttpController {

    private crypto = new DbdCrypto()

    /** Загрузка .dbd -> модель ленты + расшифрованный буфер (base64). */
    @httpPost("/parse", "IsSignIn")
    parse(@request() req: Request, @response() res: Response){
        const fileBase64 = req.body?.fileBase64
        if(typeof fileBase64 !== "string") return res.status(400).end("no_file")

        let plain: Buffer
        try {
            const dbd = Buffer.from(fileBase64, "base64")
            plain = this.crypto.decrypt(dbd)
        } catch {
            return res.status(400).end("bad_file")
        }

        const model = new DbdTape(plain).parse()
        return this.json({
            encrypted: this.crypto.isEncrypted(Buffer.from(fileBase64, "base64")),
            plainBase64: plain.toString("base64"),
            model
        })
    }

    /** Применение правок к расшифрованному буферу -> готовый зашифрованный .dbd. */
    @httpPost("/save", "IsSignIn")
    save(@request() req: Request, @response() res: Response){
        const plainBase64 = req.body?.plainBase64
        const edits: Edit[] = Array.isArray(req.body?.edits) ? req.body.edits : []
        if(typeof plainBase64 !== "string") return res.status(400).end("no_plain")

        try {
            const ed = new DbdTapeEditor(Buffer.from(plainBase64, "base64"))
            // сначала правки без сдвига длины (frameByte/rawItem) — по исходным позициям,
            // затем меняющие длину (pressure/discrete/dropEvents)
            const prio = (e: Edit)=>(e.op === "frameByte" || e.op === "rawItem") ? 0 : 1
            const ordered = [...edits].sort((a, b)=>prio(a) - prio(b))
            for(const e of ordered) applyEdit(ed, e)
            const out = this.crypto.encrypt(ed.result())
            return this.json({fileBase64: out.toString("base64")})
        } catch(err){
            return res.status(400).end((err as Error)?.message ?? "edit_error")
        }
    }

    /** Сравнение текущей ленты (A) с другим файлом (B). */
    @httpPost("/compare", "IsSignIn")
    compare(@request() req: Request, @response() res: Response){
        const plainBase64 = req.body?.plainBase64          // открытый буфер файла A
        const fileBase64 = req.body?.fileBase64            // файл B (зашифрованный или открытый)
        if(typeof plainBase64 !== "string" || typeof fileBase64 !== "string")
            return res.status(400).end("bad_input")

        try {
            const plainA = Buffer.from(plainBase64, "base64")
            const plainB = this.crypto.decrypt(Buffer.from(fileBase64, "base64"))
            const modelA = new DbdTape(plainA).parse()
            const modelB = new DbdTape(plainB).parse()
            return this.json({diffs: diffTapes(modelA, modelB)})
        } catch(err){
            return res.status(400).end((err as Error)?.message ?? "compare_error")
        }
    }
}
