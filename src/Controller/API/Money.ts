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
import {PrismaClient, type File} from "@/../prisma/generated/client"
import {inject} from "inversify";
import {Request, Response} from "express";
import * as io_ts from "io-ts";
import * as io_ts_types from "io-ts-types";

function round2(value: number){
    return Math.round(value * 100) / 100
}

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
    async addMoneyByInstructor(@requestParam("id") id: number, @request() req: Request, @response() res: Response){
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
        const money = round2(money_raw)

        const files_io = io_ts.union([
            io_ts.undefined,
            io_ts.null,
            io_ts.array(io_ts.type({
                id: io_ts.number,
                sum: io_ts.number
            }))
        ]).decode(req.body.files)
        if(files_io._tag=="Left"){
            res.status(400).end("error files")
            return;
        }

        const instructor = await this.prisma.instructor.findUnique({
            where:{id}
        })
        if(!instructor){
            res.status(400).end("not found instructor")
            return;
        }

        // от самого старого файла к самому новому - в таком порядке оплата разносится по умолчанию
        const files = await this.prisma.file.findMany({
            where:{instructorId: id},
            orderBy:[{date: "asc"},{id: "asc"}]
        })

        const allocations: {id: number, sum: number}[] = []

        if(files_io.right && files_io.right.length > 0){
            // ручное распределение: менеджер сам указал, за какие файлы пришли деньги
            const by_file = new Map<number, number>()
            files_io.right.forEach(alloc=>{
                by_file.set(alloc.id, round2((by_file.get(alloc.id) ?? 0) + alloc.sum))
            })

            for(const [file_id, sum] of by_file){
                const file = files.find(f=>f.id==file_id)
                if(!file){
                    res.status(400).end("error file "+file_id)
                    return;
                }
                const rest = round2(file.fallaf_price - file.paid)
                if(sum <= 0 || sum > rest){
                    res.status(400).end("error sum for file "+file_id)
                    return;
                }
                allocations.push({id: file_id, sum})
            }
        } else {
            // автоматическое распределение: гасим самые старые неоплаченные файлы
            let rest_money = money
            for(const file of files){
                if(rest_money <= 0) break
                const rest = round2(file.fallaf_price - file.paid)
                if(rest <= 0) continue
                const sum = Math.min(rest, rest_money)
                allocations.push({id: file.id, sum: round2(sum)})
                rest_money = round2(rest_money - sum)
            }
        }

        const allocated = round2(allocations.reduce((sum,alloc)=>sum + alloc.sum, 0))
        if(allocated > money){
            res.status(400).end("allocations more than money")
            return;
        }

        const queries: any[] = [
            this.prisma.instructor.update({
                where:{id},
                data:{price:{
                    decrement: money
                }}
            }),
            this.prisma.instructorHistory.create({
                data: {
                    sum: money,
                    date: new Date(),
                    instructor: {
                        connect: {id}
                    },
                    FilePayment: {
                        create: allocations.map(alloc=>({
                            sum: alloc.sum,
                            file: {connect: {id: alloc.id}}
                        }))
                    }
                }
            }),
            ...allocations.map(alloc=>this.prisma.file.update({
                where:{id: alloc.id},
                data:{paid:{
                    increment: alloc.sum
                }}
            }))
        ]

        return this.prisma.$transaction(queries)
            .then(()=>this.ok(), ()=>this.internalServerError())
    }

    @httpGet("/files")
    async getFiles(@request() req: Request){

        const instructors = await this.prisma.instructor.findMany({
            select:{
                id: true,
                price: true,
                name: true,
                File: true
            }
        })

        let files: any[] = []

        instructors.forEach(inst=>{
            const inst_files = inst.File.sort((a,b)=>b.id-a.id)
                .map(file=>{
                    return {
                        id: file.id,
                        name: file.name,
                        instructor_id: file.instructorId,
                        fallaf_price: file.fallaf_price,
                        dev_price: file.dev_price,
                        date: file.date,
                        balance: round2(file.paid)
                    }
                })
            files.push(...inst_files)
        })

        if(req.session.user_role=="Instructor"){
            const user = await this.prisma.user.findUnique({
                where:{id: req.session.user_id ?? 0},
                select:{
                    instructor: true
                }
            })

            if(user){
                const inst_id = user.instructor?.id ?? 0
                files = files.filter(file=>file.instructor_id==inst_id)
            }
        }

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

    @httpPost("/file/:id/edit")
    async editFile(
        @requestParam("id") id: number,
        @requestBody() body: any,
        @response() res: Response
    ){
        body.date = new Date(body.date ?? "");
        const body_io = io_ts.type({
            name: io_ts.string,
            instructor_id: io_ts.number,
            date: io_ts_types.date
        }).decode(body)
        if(body_io._tag=="Left"){
            res.status(400).end(body_io.left[0].message)
            return;
        }
        const file_data = body_io.right

        const file = await this.prisma.file.findUnique({
            where:{id: Number(id)}
        })
        if(!file){
            res.status(400).end("not found file")
            return
        }

        const instructor = await this.prisma.instructor.findUnique({
            where:{id: file_data.instructor_id}
        })
        if(!instructor){
            res.status(400).end("not found instructor")
            return
        }

        const queries: any[] = [
            this.prisma.file.update({
                where:{id: file.id},
                data:{
                    name: file_data.name,
                    date: file_data.date,
                    instructor:{
                        connect:{id: file_data.instructor_id}
                    }
                }
            })
        ]

        if(file.instructorId != file_data.instructor_id){
            queries.push(this.prisma.instructor.update({
                where:{id: file.instructorId},
                data:{price:{
                    decrement: file.fallaf_price
                }}
            }))
            queries.push(this.prisma.instructor.update({
                where:{id: file_data.instructor_id},
                data:{price:{
                    increment: file.fallaf_price
                }}
            }))
            // деньги платил старый инструктор, поэтому оплата с файлом не переезжает:
            // у старого она превращается в переплату (уменьшает его долг), новый файл не оплачивал
            queries.push(this.prisma.filePayment.deleteMany({
                where:{fileId: file.id}
            }))
            queries.push(this.prisma.file.update({
                where:{id: file.id},
                data:{paid: 0}
            }))
        }

        return this.prisma.$transaction(queries)
            .then(()=>this.ok(), ()=>this.internalServerError())
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
                        data:{
                            fallaf_price,
                            // если цену опустили ниже уже оплаченной суммы - обрезаем оплату по новой цене
                            paid: file.paid > fallaf_price ? fallaf_price : file.paid
                        }
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
        return this.prisma.instructorHistory.findMany({
            include:{
                FilePayment:{
                    include:{
                        file:{select:{id: true, name: true}}
                    }
                }
            }
        }).then(arr=>{
            return arr.map(el=>{
                return {
                    id: el.id,
                    date: el.date,
                    sum: el.sum,
                    inst_id: el.instructorId,
                    files: el.FilePayment.map(payment=>({
                        id: payment.fileId,
                        name: payment.file.name,
                        sum: payment.sum
                    }))
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
