import moduleAlias from 'module-alias';
moduleAlias.addAlias('@', __dirname);
moduleAlias();
import 'dotenv/config'
import "reflect-metadata";

import session from "express-session"
import bodyParser from 'body-parser';
import console from "console";
import * as process from "process";
import * as path from "path";
import express from "express";
import * as prettyjson from "prettyjson";
import {pipe} from "fp-ts/lib/function"
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

import {getRouteInfo, InversifyExpressServer} from 'inversify-express-utils';
import {UserRole} from "@/../prisma/generated/client";
import {container} from "@/container";

const session_token = process.env?.SESSION_TOKEN ?? ""
const server_port = process.env?.SERVER_PORT ?? ""

declare module "express-session" {
    interface SessionData {
        user_id: number
        user_role: UserRole
    }
}

const server = new InversifyExpressServer(container)

server.setConfig(app=>{
    app.use(session({
        cookie:{
            secure: false,
            maxAge: 1000*60*60*24*7
        },
        resave: false,
        saveUninitialized: false,
        secret: session_token,
        store: container.get<PrismaSessionStore>("SessionStore")
    }))
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, '../front')))
})

let app = server.build();

app.get("/api/*",(req,res)=>{
    res.status(404).end("not_found")
})
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, '../front/index.html'))
})

app.listen(server_port,()=>{
    console.log("Start listening on port "+server_port)
    // pipe(
    //     container,
    //     getRouteInfo,
    //     routes=>({routes}),
    //     prettyjson.render,
    //     console.log
    // )
})