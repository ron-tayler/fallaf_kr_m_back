
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 3.15.2
 * Query Engine version: 461d6a05159055555eb7dfb337c9fb271cbd4d7e
 */
Prisma.prismaVersion = {
  client: "3.15.2",
  engine: "461d6a05159055555eb7dfb337c9fb271cbd4d7e"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = 'DbNull'
Prisma.JsonNull = 'JsonNull'
Prisma.AnyNull = 'AnyNull'

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.InstructorScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  price: 'price'
});

exports.Prisma.FileScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  date: 'date',
  fallaf_price: 'fallaf_price',
  dev_price: 'dev_price',
  instructorId: 'instructorId'
});

exports.Prisma.InstructorHistoryScalarFieldEnum = makeEnum({
  id: 'id',
  date: 'date',
  sum: 'sum',
  instructorId: 'instructorId'
});

exports.Prisma.DevHistoryScalarFieldEnum = makeEnum({
  id: 'id',
  date: 'date',
  sum: 'sum'
});

exports.Prisma.DevScalarFieldEnum = makeEnum({
  id: 'id',
  price: 'price'
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  role: 'role',
  login: 'login',
  password: 'password',
  status: 'status',
  instructorId: 'instructorId'
});

exports.Prisma.UserInvateScalarFieldEnum = makeEnum({
  userId: 'userId',
  hash: 'hash',
  status: 'status'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});
exports.UserRole = makeEnum({
  Admin: 'Admin',
  Manager: 'Manager',
  Instructor: 'Instructor',
  User: 'User'
});

exports.UserStatus = makeEnum({
  New: 'New',
  Active: 'Active',
  Deactive: 'Deactive'
});

exports.Prisma.ModelName = makeEnum({
  Instructor: 'Instructor',
  File: 'File',
  InstructorHistory: 'InstructorHistory',
  DevHistory: 'DevHistory',
  Dev: 'Dev',
  User: 'User',
  UserInvate: 'UserInvate'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
