import {
    BaseHttpController,
    controller, httpGet,
    httpPost, request
} from "inversify-express-utils";
import {inject} from "inversify";
import {PrismaClient} from "../../../prisma/generated/client";
import {FreeKassa} from "@/lib/FreeKassa";
import {Request} from "express";
import {
    type as io_type,
    string as io_string
} from "io-ts"

@controller("/public-api/free-kassa")
export class Controller_PublicAPI_FreeKassa extends BaseHttpController {

    @inject<PrismaClient>("Prisma")
    private prisma!: PrismaClient

    @inject<FreeKassa>("FreeKassa")
    private free_kassa!: FreeKassa

    @httpPost("/notify")
    getPayUrl(@request() req: Request){
        console.log(req.body)
        const data = io_type({
            MERCHANT_ID: io_string, // ID Магазина
            AMOUNT: io_string, // Сумма платежа
            intid: io_string, // ID в системе FK
            MERCHANT_ORDER_ID: io_string, // ID заказа в нашей системе
            P_EMAIL: io_string, // Email пользователя
            P_PHONE: io_string, // Телефон пользователя
            CUR_ID: io_string, // ID Валюты с помощью которой оплатили
            SIGN: io_string, // Подпись данных
            payer_account: io_string, // Номер карты/счёта
            commission: io_string, // Комиссия
            us_inst_id: io_string // ID Инструктора
        }).decode(req.body)
        console.log(data);
    }

}