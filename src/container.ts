import {Container} from "inversify";
import {buildProviderModule} from "inversify-binding-decorators";
import {PrismaClient} from "@/../prisma/generated/client";

import "@/Controller/API/Money";
import "@/Controller/API/User";
import {IsSignIn} from "@/Middleware/IsSignIn";

const prisma = new PrismaClient();

export const container = new Container()
container.load(buildProviderModule());

container.bind("Prisma").toConstantValue(prisma);
container.bind("IsSignIn").to(IsSignIn);