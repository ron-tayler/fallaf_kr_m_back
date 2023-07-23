import {
    controller,
    httpDelete,
    httpGet,
    httpPut
} from "inversify-express-utils";

@controller("/api/money")
export class Controller_API_Money {

    @httpGet("/instructors")
    getInstructors(){

    }

    @httpPut("/instructor")
    addInstructor(){}

    @httpDelete("/instructor/:id")
    removeInstructor(){}

    @httpPut("/instructor/:id/addMoney")
    addMoneyByInstructor(){

    }

    @httpGet("/files")
    getFiles(){}

    @httpPut("/file")
    addFile(){}

    @httpDelete("/file/:id")
    removeFile(){}

    @httpGet("/instructors/history")
    getInstructorsMoneyHistory(){

    }

    @httpPut("/dev/money")
    addDevMoney(){

    }

    @httpGet("/dev/history")
    getDevMoneyHistory(){}
}
