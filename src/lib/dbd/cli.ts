import {readFileSync, writeFileSync} from "fs"
import {DbdCrypto} from "@/lib/dbd/DbdCrypto"

/**
 * Изолированный CLI для проверки модуля вручную.
 *
 *   ts-node -r tsconfig-paths/register src/lib/dbd/cli.ts decrypt in.dbd out.dbd
 *   ts-node -r tsconfig-paths/register src/lib/dbd/cli.ts encrypt in.dbd out.dbd
 */
const [op, src, dst] = process.argv.slice(2)

if((op !== "decrypt" && op !== "encrypt") || !src || !dst){
    console.error("usage: cli.ts <decrypt|encrypt> <in> <out>")
    process.exit(1)
}

const dbd = new DbdCrypto()
const data = readFileSync(src)
const out = op === "decrypt" ? dbd.decrypt(data) : dbd.encrypt(data)
writeFileSync(dst, out)

console.log(`${op}: ${src} (${data.length}) -> ${dst} (${out.length})`)
