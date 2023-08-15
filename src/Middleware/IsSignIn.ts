import {inject, injectable} from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import express from "express";

@injectable()
export class IsSignIn extends BaseMiddleware {
    public handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if(req.session?.user_id ?? 0 >0) next()
        else res.status(401).end("require auth")
    }
}