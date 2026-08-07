import "dotenv/config"
import {PrismaClient} from "../../prisma/generated/client"

/**
 * Разовый скрипт миграции старых данных.
 *
 * Раньше оплата по файлам нигде не хранилась - она вычислялась на лету:
 * долг инструктора (Instructor.price) "съедался" файлами от самого нового к самому старому,
 * поэтому оплаченными считались самые старые файлы.
 *
 * Теперь оплата хранится в File.paid, а конкретные распределения - в FilePayment.
 * Скрипт проставляет File.paid ровно тем значением, которое сейчас показывает интерфейс,
 * то есть после запуска картинка в таблице файлов не меняется.
 *
 * Ничего не удаляет и не трогает: Instructor.price, InstructorHistory, суммы файлов.
 *
 * Запуск:
 *   ts-node src/scripts/backfill_file_paid.ts            # только показать, что будет сделано
 *   ts-node src/scripts/backfill_file_paid.ts --apply    # записать в базу
 *   ... --apply --force                                  # записать, даже если FilePayment не пуст
 */

const prisma = new PrismaClient()

function round2(value: number){
    return Math.round(value * 100) / 100
}

async function main(){
    const apply = process.argv.includes("--apply")
    const force = process.argv.includes("--force")

    const payments_count = await prisma.filePayment.count()
    if(payments_count > 0 && !force){
        console.log(`В базе уже есть ${payments_count} распределений оплат (FilePayment).`)
        console.log("Скрипт остановлен, чтобы не затереть новые данные. Если уверены - добавьте --force.")
        return
    }

    const instructors = await prisma.instructor.findMany({
        select: {id: true, name: true, price: true, File: true}
    })

    const updates: {id: number, name: string, fallaf_price: number, paid_old: number, paid_new: number}[] = []

    instructors.forEach(inst=>{
        // порядок ровно такой же, как в старом Controller_API_Money.getFiles
        let inst_balance = inst.price
        const inst_files = inst.File.sort((a,b)=>b.id-a.id)

        let inst_paid_total = 0
        inst_files.forEach(file=>{
            const c = inst_balance - file.fallaf_price
            let paid = 0
            if(inst_balance < 0){
                paid = file.fallaf_price
            } else if(c < 0){
                paid = c * -1
            }
            inst_balance = c
            paid = round2(paid)
            inst_paid_total += paid
            updates.push({
                id: file.id,
                name: file.name,
                fallaf_price: file.fallaf_price,
                paid_old: file.paid,
                paid_new: paid
            })
        })

        console.log(
            `#${inst.id} ${inst.name}: файлов ${inst_files.length}, `
            + `долг ${round2(inst.price)}, разнесено оплат ${round2(inst_paid_total)}`
        )
    })

    const changed = updates.filter(u=>round2(u.paid_old) != u.paid_new)

    console.log("")
    console.log(`Всего файлов: ${updates.length}, будет изменено: ${changed.length}`)
    changed.slice(0, 20).forEach(u=>{
        console.log(`  файл #${u.id} ${u.name}: paid ${u.paid_old} -> ${u.paid_new} (из ${u.fallaf_price})`)
    })
    if(changed.length > 20) console.log(`  ... и ещё ${changed.length - 20}`)

    if(!apply){
        console.log("")
        console.log("Это тестовый прогон, в базу ничего не записано. Для записи запустите с --apply")
        return
    }

    for(const u of changed){
        await prisma.file.update({
            where: {id: u.id},
            data: {paid: u.paid_new}
        })
    }

    console.log("")
    console.log(`Готово, обновлено файлов: ${changed.length}`)
}

main()
    .catch(err=>{
        console.error(err)
        process.exitCode = 1
    })
    .finally(()=>prisma.$disconnect())
