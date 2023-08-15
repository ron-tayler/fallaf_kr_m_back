import * as io_ts from "io-ts"
import {UserRole} from "@/../prisma/generated/client";

const userRoles:{
    [key in UserRole]: UserRole
} = {
    User: "User",
    Admin: "Admin",
    Instructor: "Instructor",
    Manager: "Manager"
}

function isUserRole<A extends UserRole>(u: unknown): u is A{
    return typeof u == "string" && !!Object.keys(userRoles).findIndex(v=>v==u)
}

function validateUserRole(i :unknown, ctx: io_ts.Context): io_ts.Validation<UserRole>{
    if(isUserRole(i)){
        return io_ts.success(UserRole[i])
    } else return io_ts.failure(i,ctx)
}

function encodeUserRole(o: UserRole): string{
    return o.toString()
}

export const typeUserRole = new io_ts.Type<UserRole,string>(
    "UserRole",
    isUserRole,
    validateUserRole,
    encodeUserRole
)