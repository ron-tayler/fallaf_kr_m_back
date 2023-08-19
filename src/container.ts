import {Container} from "inversify";
import {buildProviderModule} from "inversify-binding-decorators";
import {PrismaClient} from "@/../prisma/generated/client";
import {IsSignIn} from "@/Middleware/IsSignIn";
import {PrismaSessionStore} from "@quixo3/prisma-session-store";
import {FreeKassa} from "@/lib/FreeKassa";
import {type Store} from "express-session";
import {type BaseMiddleware} from "inversify-express-utils";

import process from "process";

import "@/Controller/API/Money";
import "@/Controller/API/User";

const merchant_id = process.env?.FREE_KASSA_MERCHANT_ID ?? "0"
const secret_1 = process.env?.FREE_KASSA_SECRET_1 ?? "0"
const secret_2 = process.env?.FREE_KASSA_SECRET_2 ?? "0"

const prisma = new PrismaClient();
const sessionStore = new PrismaSessionStore(prisma,{
    checkPeriod: 1000 * 60 * 2,
    dbRecordIdIsSessionId: true
})
const freeKassa = new FreeKassa(merchant_id, secret_1, secret_2, "RUB")

export const container = new Container()
container.load(buildProviderModule());

container.bind<PrismaClient>("Prisma").toConstantValue(prisma);
container.bind<Store>("SessionStore").toConstantValue(sessionStore);
container.bind<FreeKassa>("FreeKassa").toConstantValue(freeKassa);
container.bind<BaseMiddleware>("IsSignIn").to(IsSignIn);
