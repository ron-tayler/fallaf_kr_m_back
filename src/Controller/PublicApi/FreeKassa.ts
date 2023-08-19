import {
    BaseHttpController,
    controller, httpGet,
    httpPost, request
} from "inversify-express-utils";
import {inject} from "inversify";
import {PrismaClient} from "../../../prisma/generated/client";
import {FreeKassa} from "@/lib/FreeKassa";
import {Request} from "express";
import io_ts from "io-ts"

@controller("/public-api/free-kassa")
export class Controller_API_User extends BaseHttpController {

    @inject<PrismaClient>("Prisma")
    private prisma!: PrismaClient

    @inject<FreeKassa>("FreeKassa")
    private free_kassa!: FreeKassa

    @httpPost("/notify")
    getPayUrl(@request() req: Request){
        console.log(req.body)
        const data = io_ts.type({
            MERCHANT_ID: io_ts.string, // ID Магазина
            AMOUNT: io_ts.string, // Сумма платежа
            intid: io_ts.string, // ID в системе FK
            MERCHANT_ORDER_ID: io_ts.string, // ID заказа в нашей системе
            P_EMAIL: io_ts.string, // Email пользователя
            P_PHONE: io_ts.string, // Телефон пользователя
            CUR_ID: io_ts.string, // ID Валюты с помощью которой оплатили
            SIGN: io_ts.string, // Подпись данных
            payer_account: io_ts.string, // Номер карты/счёта
            commission: io_ts.string, // Комиссия
            us_inst_id: io_ts.string // ID Инструктора
        }).decode(req.body)
        console.log(data);
    }

}