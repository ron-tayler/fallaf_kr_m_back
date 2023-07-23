import moduleAlias from 'module-alias';
moduleAlias.addAlias('@', __dirname);
moduleAlias();
import 'dotenv/config'
import "reflect-metadata";

import session from "express-session"
import bodyParser from 'body-parser';
import console from "console";
import * as process from "process";

import {Container} from "inversify"
import {InversifyExpressServer} from 'inversify-express-utils';
import {buildProviderModule} from "inversify-binding-decorators";
import {PrismaClient} from "@/prisma/generated/client"

import "@/Controller/API/Money";

const session_token = process.env?.SESSION_TOKEN ?? ""
const server_port = process.env?.SERVER_PORT ?? ""

const prisma = new PrismaClient();

declare module "express-session" {
    interface SessionData {
        user_id: number
    }
}

const container = new Container()
container.load(buildProviderModule());
const server = new InversifyExpressServer(container)

container.bind("Prisma").toConstantValue(prisma);

server.setConfig(app=>{
    app.use(session({
        cookie:{
            secure: false
        },
        resave: false,
        saveUninitialized: false,
        secret: session_token
    }))
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
})

let app = server.build();

app.listen(server_port,()=>{
    console.log("Start listening on port "+server_port)
})