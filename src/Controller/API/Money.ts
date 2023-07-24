import {
    controller,
    httpDelete,
    httpGet,
    httpPut,
    request,
    response,
    BaseHttpController, requestParam,
    requestBody
} from "inversify-express-utils";
import {PrismaClient} from "@/prisma/generated/client"
import {inject} from "inversify";
import {Request, Response} from "express";
import * as io_ts from "io-ts";
import * as io_ts_types from "io-ts-types";

@controller("/api/money")
export class Controller_API_Money extends BaseHttpController {

    @inject<PrismaClient>("Prisma")
    private prisma!: PrismaClient

    @httpGet("/instructors")
    getInstructors(){
        return this.prisma.instructor.findMany()
    }

    @httpPut("/instructor")
    addInstructor(@request() req: Request, @response() res: Response){
        const name_raw = io_ts.string.decode(req.body.name)
        if(name_raw._tag!="Right"){
            res.status(400).end("error name")
            return;
        }
        const name = name_raw.right

        return this.prisma.instructor.create({
            data:{ name, price: 0 }
        })
    }

    @httpDelete("/instructor/:id")
    removeInstructor(@requestParam("id") id: number){
        id = Number(id)
        return this.prisma.instructor.delete({
            where: {id}
        }).then(()=>{
            return this.ok()
        }).catch(()=>{
            return this.internalServerError()
        })
    }

    @httpPut("/instructor/:id/addMoney")
    addMoneyByInstructor(@requestParam("id") id: number, @request() req: Request, @response() res: Response){
        id = Number(id)
        const money_raw = io_ts.number.decode(req.body.money)
        if(money_raw._tag=="Left"){
            res.status(400).end("error money")
            return;
        }

        const p1 = this.prisma.instructor.update({
            where:{id},
            data:{price:{
                decrement: money_raw.right
            }}
        })
        const p2 = this.prisma.instructorHistory.create({
            data: {
                sum: money_raw.right,
                date: new Date(),
                instructor: {
                    connect: {id}
                }
            }
        })
        return Promise.all([p1,p2])
    }

    @httpGet("/files")
    getFiles(){
        return this.prisma.file.findMany()
    }

    @httpPut("/file")
    addFile(@requestBody() body: any, @response() res: Response){
        const body_io = io_ts.type({
            name: io_ts.string,
            instructor_id: io_ts.number,
            fallaf_price: io_ts.number,
            dev_price: io_ts.number,
            date: io_ts_types.date
        }).decode(body)
        if(body_io._tag=="Left"){
            res.status(400).end(body_io.left[0].message)
            return;
        }
        const file_data = body_io.right

        const p1 = this.prisma.file.create({
            data:{
                name: file_data.name,
                date: file_data.date,
                fallaf_price: file_data.fallaf_price,
                dev_price: file_data.dev_price,
                instructor: {
                    connect:{
                        id: file_data.instructor_id
                    }
                }
            }
        })

        const p2 = this.prisma.instructor.update({
            where:{id: file_data.instructor_id},
            data:{price:{
                increment: file_data.fallaf_price
            }}
        })

        const p3 = this.prisma.dev.update({
            where:{id:1},
            data:{
                price:{
                    increment: file_data.dev_price
                }
            }
        })

        return Promise.all([p1,p2,p3])
    }

    @httpDelete("/file/:id")
    removeFile(@requestParam("id") id: number){
        return this.prisma.file.delete({
            where:{id: Number(id)}
        }).then(()=>{
            return this.ok()
        }).catch(()=>{
            return this.internalServerError()
        })
    }

    @httpGet("/instructors/history")
    getInstructorsMoneyHistory(){
        return this.prisma.instructorHistory.findMany()
    }

    @httpPut("/dev/money")
    addDevMoney(@requestBody() body: any, @response() res: Response){
        const body_io = io_ts.type({
            money: io_ts.number
        }).decode(body)
        if(body_io._tag=="Left"){
            res.status(400).end(body_io.left[0].message)
            return;
        }
        const body_data = body_io.right

        this.prisma.dev.update({
            where:{id:1},
            data:{
                price:{ decrement: body_data.money }
            }
        })
    }

    @httpGet("/dev/history")
    getDevMoneyHistory(){
        const p1 = this.prisma.devHistory.findMany()
        const p2 = this.prisma.dev.findUnique({
            where:{id:1},
            select:{price:true}
        })

        return Promise.all([p1,p2])
            .then(([p1,p2])=>{
                return {
                    history: p1,
                    price: p2?.price ?? 0
                }
            })
    }
}
