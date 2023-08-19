import md5 from "md5"
import {append} from "fp-ts-std/String"
import {pipe} from "fp-ts/lib/function";
import {Eq} from "fp-ts/lib/string";

export class FreeKassa {
    constructor(
        private merchant_id: string,
        private secret_1: string,
        private secret_2: string,
        private currency: string
    ) {

    }

    createFirstSign(amount: number, order_id: number){
        return pipe(
            this.merchant_id,
            append(":"+amount.toString()),
            append(":"+this.secret_1),
            append(":"+this.currency),
            append(":"+order_id.toString()),
            md5 as (a:string)=>string
        )
    }

    createSecondSign(amount: number, order_id: number): string{
        return pipe(
            this.merchant_id,
            append(":"+amount.toString()),
            append(":"+this.secret_2),
            append(":"+order_id.toString()),
            md5 as (a:string) => string
        )
    }

    getPayUrl(
        order_id: number,
        order_amount: number,
        us_params: {
            [key: string]: string
        }
    ): URL{
        const sign = this.createFirstSign(order_amount,order_id)

        const url = new URL("https://pay.freekassa.ru/")
        url.searchParams.set("m",this.merchant_id)
        url.searchParams.set("oa",order_amount.toString())
        url.searchParams.set("currency",this.currency)
        url.searchParams.set("o",order_id.toString())
        url.searchParams.set("s",sign)
        url.searchParams.set("lang","ru")
        url.searchParams.set("i","42")

        Object.entries(us_params).forEach(([key,value])=>{
            url.searchParams.set(key,value)
        })

        return url
    }
}