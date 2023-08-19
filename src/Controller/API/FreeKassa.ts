import {
    BaseHttpController,
    controller, httpGet,
    httpPost
} from "inversify-express-utils";
import {inject} from "inversify";
import {PrismaClient} from "../../../prisma/generated/client";
import {FreeKassa} from "@/lib/FreeKassa";

@controller("/api/free-kassa")
export class Controller_API_User extends BaseHttpController {

    @inject<PrismaClient>("Prisma")
    private prisma!: PrismaClient

    @inject<FreeKassa>("FreeKassa")
    private free_kassa!: FreeKassa

    @httpGet("/get-pay-url")
    getPayUrl(){

        // Создаём Ордер
        const order_id = 1
        // Получаем ID инструктора по привязанному аккаунту
        const inst_id = 1
        // Получаем сумму оплаты из запроса
        const amount = 500

        this.free_kassa.getPayUrl(order_id,amount,{
            us_inst_id: inst_id.toString()
        })
    }

}