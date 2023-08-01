import {
    controller,
    httpDelete,
    httpGet,
    httpPut,
    request,
    response,
    BaseHttpController, requestParam,
    requestBody, httpPost
} from "inversify-express-utils";
import {PrismaClient} from "@/../prisma/generated/client"
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
        const money_raw = parseFloat(req.body.money)
        if(isNaN(money_raw) || money_raw <=0){
            res.status(400).end("error money")
            return;
        }
        if(isNaN(id) || id <=0){
            res.status(400).end("error id")
            return;
        }

        const p1 = this.prisma.instructor.update({
            where:{id},
            data:{price:{
                decrement: money_raw
            }}
        })
        const p2 = this.prisma.instructorHistory.create({
            data: {
                sum: money_raw,
                date: new Date(),
                instructor: {
                    connect: {id}
                }
            }
        })
        return Promise.all([p1,p2])
    }

    @httpGet("/files")
    async getFiles(){

        const instructors = await this.prisma.instructor.findMany({
            select:{
                id: true,
                price: true,
                name: true,
                File: true
            }
        })

        const files: any[] = []

        instructors.forEach(inst=>{
            let inst_balance = inst.price
            const inst_files = inst.File.sort((a,b)=>b.id-a.id)
                .map(file=>{
                    let c = inst_balance - file.fallaf_price
                    let file_balance = 0
                    if(inst_balance < 0){
                        file_balance = file.fallaf_price
                    } else if(c < 0){
                        file_balance = c * -1
                    }
                    inst_balance = c
                    return {
                        id: file.id,
                        name: file.name,
                        instructor_id: file.instructorId,
                        fallaf_price: file.fallaf_price,
                        dev_price: file.dev_price,
                        date: file.date,
                        balance: file_balance
                    }
                })
            files.push(...inst_files)
        })

        return files
    }

    @httpPut("/file")
    async addFile(@requestBody() body: any, @response() res: Response){
        body.date = new Date(body.date ?? "");
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

        const instructor = await this.prisma.instructor.findUnique({
            where:{id: file_data.instructor_id}
        })

        if(!instructor){
            res.status(400).end("not found instructor")
            return
        }

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

        return this.prisma.$transaction([p1,p2,p3])
    }

    @httpDelete("/file/:id")
    removeFile(@requestParam("id") id: number){
        return this.prisma.file.findUnique({
            where:{id: Number(id)}
        }).then(file=>file?file:Promise.reject("not_found"))
            .then(file=> {
                return this.prisma.$transaction([
                    this.prisma.instructor.update({
                        where: {id: file.instructorId},
                        data: {
                            price: {
                                decrement: file.fallaf_price
                            }
                        }
                    }),
                    this.prisma.dev.update({
                        where:{id: 1},
                        data:{
                            price:{
                                decrement: file.dev_price
                            }
                        }
                    })
                ])

            })
            .then(()=>this.prisma.file.delete({
                where:{id: Number(id)}
            }))
            .then(()=>{
                return this.ok()
            }).catch(()=>{
                return this.internalServerError()
            })
    }

    @httpPost("/file/:id/edit_fallaf_price")
    editFileFallafPrice(
        @requestParam("id") id: number,
        @request() req: Request,
        @response() res: Response
    ){
        const price_raw = io_ts.number.decode(Number(req.body.price))
        if(price_raw._tag == "Left"){
            return res.status(400).end("error price")
        }
        const fallaf_price = price_raw.right
        return this.prisma.file.findUnique({
            where:{id: Number(id)}
        }).then(file=>file?file:Promise.reject("not_found"))
            .then(file=>{
                return this.prisma.$transaction([
                    this.prisma.instructor.update({
                        where:{id:file.instructorId},
                        data:{price:{
                                decrement: file.fallaf_price - fallaf_price
                            }}
                    }),
                    this.prisma.file.update({
                        where:{id:  file.id},
                        data:{fallaf_price}
                    })
                ])
            })
    }

    @httpPost("/file/:id/edit_dev_price")
    editFileDevPrice(
        @requestParam("id") id: number,
        @request() req: Request,
        @response() res: Response
    ){
        const price_raw = io_ts.number.decode(Number(req.body.price))
        if(price_raw._tag == "Left"){
            return res.status(400).end("error price")
        }
        const dev_price = price_raw.right
        return this.prisma.file.findUnique({
            where:{id: Number(id)}
        }).then(file=>file?file:Promise.reject("not_found"))
            .then(file=>{
                return this.prisma.$transaction([
                    this.prisma.dev.update({
                        where:{id:1},
                        data:{price:{
                            decrement: file.dev_price - dev_price
                        }}
                    }),
                    this.prisma.file.update({
                        where:{id:  file.id},
                        data:{dev_price}
                    })
                ])
            })
    }

    @httpGet("/instructors/history")
    getInstructorsMoneyHistory(){
        return this.prisma.instructorHistory.findMany().then(arr=>{
            return arr.map(el=>{
                return {
                    id: el.id,
                    date: el.date,
                    sum: el.sum,
                    inst_id: el.instructorId
                }
            })
        })
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

        const p1 = this.prisma.dev.update({
            where:{id:1},
            data:{
                price:{ decrement: body_data.money }
            }
        })
        const p2 = this.prisma.devHistory.create({
            data:{
                sum: body_data.money,
                date: new Date()
            }
        })

        return Promise.all([p1,p2]).then(()=>this.ok())
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
