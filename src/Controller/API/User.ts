import {
    BaseHttpController,
    controller,
    httpGet,
    httpPost, request, response
} from "inversify-express-utils";
import {inject} from "inversify";
import { PrismaClient, UserStatus } from "@/../prisma/generated/client";
import {Request, Response} from "express";
import * as io_ts from "io-ts"
import {isLeft} from "fp-ts/lib/Either"
import {verify,generate} from "password-hash"
import {typeUserRole} from "@/io_ts/UserRole";
import * as crypto from "crypto";

@controller("/api/user")
export class Controller_API_User extends BaseHttpController {

    @inject<PrismaClient>("Prisma")
    private prisma!: PrismaClient

    @httpGet("/is_auth")
    checkAuth(@request() req: Request, @response() res: Response){
        return Promise.resolve()
            .then(()=>{
                let user_id = req.session?.user_id ?? 0
                return (user_id > 0) ? user_id : Promise.reject()
            })
            .then(user_id=>this.prisma.user.findUnique({
                where:{id: user_id}
            }))
            .then(u=>u?u:Promise.reject())
            .then(u=>u.status=="Active"?u:Promise.reject())
            .then(user=>{
                req.session.user_id = user.id
                req.session.user_role = user.role
            })
            .then(()=>this.json({
                status: true,
                user_id: req.session.user_id,
                user_role: req.session.user_role
            }))
            .catch(()=>this.json({
                status: false,
                user_id: 0,
                user_role: "User"
            }))
    }

    @httpPost("/auth")
    async authByLoginAndPassword(@request() req: Request, @response() res: Response){
        const data = io_ts.type({
            login: io_ts.string,
            password: io_ts.string
        }).decode(req.body)
        if(isLeft(data)) return res.status(400).json(data.left)

        const user = await this.prisma.user.findUnique({
            where:{
                login: data.right.login
            }
        })

        if(!user) return res.status(400).end("user_not_found")

        if(user.status != UserStatus.Active) return res.status(400).end("user_not_found")

        if(!verify(data.right.password,user.password))
            return res.status(400).end("password_invalid")

        req.session.user_id = user.id
        req.session.user_role = user.role

        return this.ok()
    }

    @httpPost("/logout")
    logout(@request() req: Request){
        req.session.user_id = 0
        return this.ok()
    }

    @httpPost("/check-invite")
    checkInvite(@request() req: Request, @response() res: Response){
        const data = io_ts.type({
            hash_link: io_ts.string
        }).decode(req.body)
        if(isLeft(data)) return res.status(400).json(data.left)

        return this.prisma.userInvate.findUnique({
            where: { hash: data.right.hash_link },
            select: {
                status: true,
                user:{
                    select:{
                        id: true,
                        login: true,
                        status: true
                    }
                }
            }
        }).then(u=>u?u:Promise.reject())
            .then(u=>u.status?u:Promise.reject())
            .then(u=>u.user.status=="New"?u:Promise.reject())
            .then(
                link=>this.json({
                    id: link.user.id,
                    login: link.user.login
                }),
                ()=>res.status(404).end("not_found")
            )
    }

    @httpPost("/reg")
    async registration(@request() req: Request, @response() res: Response){
        const data = io_ts.type({
            login: io_ts.string,
            password: io_ts.string,
            hash_link: io_ts.string
        }).decode(req.body)
        if(data._tag=="Left") return res.status(400).json(data.left)

        const user = await this.prisma.userInvate.findUnique({
            where:{
                hash: data.right.hash_link
            }
        }).then(link=>link?link:Promise.reject())
            .then(link=>link.status?link:Promise.reject())
            .then(invite=>invite.userId)
            .then(id=>this.prisma.user.findUnique({where:{id}}))
            .then(u=>u?u:Promise.reject())
            .then(u=>u.status=="New"?u:Promise.reject())
            .catch(()=>null)

        if(!user) return this.json("user_not_found",400)

        return this.prisma.user.update({
            where:{id: user.id},
            data:{
                status: UserStatus.Active,
                login: data.right.login,
                password: generate(data.right.password),
                invite:{
                    update:{
                        status: false
                    }
                }
            }
        }).then(()=>{
            req.session.user_id = user.id
            req.session.user_role = user.role
        }).then(
            ()=>this.ok(),
            ()=>this.internalServerError()
        )
    }

    @httpGet("/all","IsSignIn")
    getAllUsers(@request() req: Request, @response() res: Response){
        if(!["Admin","Manager"].includes(req.session?.user_role ?? ""))
            return this.json("Forbidden",403)
        return this.prisma.user.findMany({
            include:{
                invite: {
                    select: {
                        hash: true
                    }
                }
            }
        })
    }

    @httpPost("/add","IsSignIn")
    addUser(@request() req: Request, @response() res: Response){
        if(!["Admin","Manager"].includes(req.session?.user_role ?? ""))
            return this.json("Forbidden",403)
        const data = io_ts.type({
            login: io_ts.string,
            role: typeUserRole,
            instructor_id: io_ts.number
        }).decode(req.body)

        if(data._tag=="Left") return res.status(400).json(data.left)

        const inst_id = data.right.instructor_id == 0 ? null : data.right.instructor_id

        const link_hash = crypto.randomBytes(16).toString("hex")
        return this.prisma.user.create({
            data:{
                login: data.right.login,
                role: data.right.role,
                instructorId: inst_id,
                status: UserStatus.New,
                password: "",
                invite:{
                    create:{
                        status: true,
                        hash: link_hash
                    }
                }
            }
        }).then(
            ()=>this.json({
                hash: link_hash
            }),
            ()=>this.internalServerError()
        )
    }

    @httpPost("/enable","IsSignIn")
    async activateUser(@request() req: Request, @response() res: Response){
        if(!["Admin","Manager"].includes(req.session?.user_role ?? ""))
            return this.json("Forbidden",403)
        const data = io_ts.type({
            user_id: io_ts.number
        }).decode(req.body)
        if(data._tag=="Left") return res.status(400).json(data.left)

        const user = await this.prisma.user.findUnique({
            where:{id: data.right.user_id}
        })

        if(!user)
            return res.status(400).end("user_not_found")
        if(user.status!=UserStatus.Deactive)
            return res.status(400).end("user_not_found")

        return this.prisma.user.update({
            where:{id: user.id},
            data:{
                status: UserStatus.Active
            }
        }).then(
            ()=>this.ok(),
            ()=>this.internalServerError()
        )
    }

    @httpPost("/disable","IsSignIn")
    async deactivateUser(@request() req: Request, @response() res: Response){
        if(!["Admin","Manager"].includes(req.session?.user_role ?? ""))
            return this.json("Forbidden",403)
        const data = io_ts.type({
            user_id: io_ts.number
        }).decode(req.body)
        if(data._tag=="Left") return res.status(400).json(data.left)

        const user = await this.prisma.user.findUnique({
            where:{id: data.right.user_id}
        })

        if(!user)
            return res.status(400).end("user_not_found")
        if(user.status!=UserStatus.Active)
            return res.status(400).end("user_not_found")

        return this.prisma.user.update({
            where:{id: user.id},
            data:{
                status: UserStatus.Deactive
            }
        }).then(
            ()=>this.ok(),
            ()=>this.internalServerError()
        )
    }

    @httpPost("/delete","IsSignIn")
    removeUser(@request() req: Request, @response() res: Response){
        if(!["Admin","Manager"].includes(req.session?.user_role ?? ""))
            return this.json("Forbidden",403)
        return res.status(404).end("not_found")
    }
}
