import {Container} from "inversify";
import {buildProviderModule} from "inversify-binding-decorators";
import {PrismaClient} from "@/../prisma/generated/client";

import "@/Controller/API/Money";
import "@/Controller/API/User";
import {IsSignIn} from "@/Middleware/IsSignIn";
import {PrismaSessionStore} from "@quixo3/prisma-session-store";

const prisma = new PrismaClient();
const sessionStore = new PrismaSessionStore(prisma,{
    checkPeriod: 1000 * 60 * 2,
    dbRecordIdIsSessionId: true
})

export const container = new Container()
container.load(buildProviderModule());

container.bind("Prisma").toConstantValue(prisma);
container.bind("SessionStore").toConstantValue(sessionStore);
container.bind("IsSignIn").to(IsSignIn);