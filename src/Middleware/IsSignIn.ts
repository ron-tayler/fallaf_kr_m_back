import {inject, injectable} from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import {PrismaClient} from "@/../prisma/generated/client";
import express from "express";

@injectable()
export class IsSignIn extends BaseMiddleware {

    @inject<PrismaClient>("Prisma")
    private prisma!: PrismaClient

    public handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user_id = req.session?.user_id ?? 0
        if(user_id <= 0) return res.status(401).end("require auth")

        // статус и роль берём из базы, а не из сессии:
        // иначе заблокированный аккаунт продолжал бы работать по старой cookie
        return this.prisma.user.findUnique({
            where:{id: user_id}
        }).then(user=>user && user.status=="Active"?user:Promise.reject())
            .then(user=>{
                req.session.user_role = user.role
                next()
            })
            .catch(()=>{
                req.session.user_id = 0
                res.status(401).end("require auth")
            })
    }
}
