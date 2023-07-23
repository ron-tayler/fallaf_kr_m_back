
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Instructor
 * 
 */
export type Instructor = {
  id: number
  name: string
  price: number
}

/**
 * Model File
 * 
 */
export type File = {
  id: number
  name: string
  date: Date
  fallaf_price: number
  dev_price: number
  instructorId: number
}

/**
 * Model InstructorHistory
 * 
 */
export type InstructorHistory = {
  id: number
  date: Date
  sum: number
  instructorId: number
}

/**
 * Model DevHistory
 * 
 */
export type DevHistory = {
  id: number
  date: Date
  sum: number
}

/**
 * Model Dev
 * 
 */
export type Dev = {
  id: number
  price: number
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Instructors
 * const instructors = await prisma.instructor.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Instructors
   * const instructors = await prisma.instructor.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.instructor`: Exposes CRUD operations for the **Instructor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Instructors
    * const instructors = await prisma.instructor.findMany()
    * ```
    */
  get instructor(): Prisma.InstructorDelegate<GlobalReject>;

  /**
   * `prisma.file`: Exposes CRUD operations for the **File** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Files
    * const files = await prisma.file.findMany()
    * ```
    */
  get file(): Prisma.FileDelegate<GlobalReject>;

  /**
   * `prisma.instructorHistory`: Exposes CRUD operations for the **InstructorHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InstructorHistories
    * const instructorHistories = await prisma.instructorHistory.findMany()
    * ```
    */
  get instructorHistory(): Prisma.InstructorHistoryDelegate<GlobalReject>;

  /**
   * `prisma.devHistory`: Exposes CRUD operations for the **DevHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DevHistories
    * const devHistories = await prisma.devHistory.findMany()
    * ```
    */
  get devHistory(): Prisma.DevHistoryDelegate<GlobalReject>;

  /**
   * `prisma.dev`: Exposes CRUD operations for the **Dev** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Devs
    * const devs = await prisma.dev.findMany()
    * ```
    */
  get dev(): Prisma.DevDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Prisma Client JS version: 3.15.2
   * Query Engine version: 461d6a05159055555eb7dfb337c9fb271cbd4d7e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: 'DbNull'

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: 'JsonNull'

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: 'AnyNull'

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Instructor: 'Instructor',
    File: 'File',
    InstructorHistory: 'InstructorHistory',
    DevHistory: 'DevHistory',
    Dev: 'Dev'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type InstructorCountOutputType
   */


  export type InstructorCountOutputType = {
    File: number
    InstructorHistory: number
  }

  export type InstructorCountOutputTypeSelect = {
    File?: boolean
    InstructorHistory?: boolean
  }

  export type InstructorCountOutputTypeGetPayload<
    S extends boolean | null | undefined | InstructorCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? InstructorCountOutputType
    : S extends undefined
    ? never
    : S extends InstructorCountOutputTypeArgs
    ?'include' extends U
    ? InstructorCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof InstructorCountOutputType ? InstructorCountOutputType[P] : never
  } 
    : InstructorCountOutputType
  : InstructorCountOutputType




  // Custom InputTypes

  /**
   * InstructorCountOutputType without action
   */
  export type InstructorCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the InstructorCountOutputType
     * 
    **/
    select?: InstructorCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Instructor
   */


  export type AggregateInstructor = {
    _count: InstructorCountAggregateOutputType | null
    _avg: InstructorAvgAggregateOutputType | null
    _sum: InstructorSumAggregateOutputType | null
    _min: InstructorMinAggregateOutputType | null
    _max: InstructorMaxAggregateOutputType | null
  }

  export type InstructorAvgAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type InstructorSumAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type InstructorMinAggregateOutputType = {
    id: number | null
    name: string | null
    price: number | null
  }

  export type InstructorMaxAggregateOutputType = {
    id: number | null
    name: string | null
    price: number | null
  }

  export type InstructorCountAggregateOutputType = {
    id: number
    name: number
    price: number
    _all: number
  }


  export type InstructorAvgAggregateInputType = {
    id?: true
    price?: true
  }

  export type InstructorSumAggregateInputType = {
    id?: true
    price?: true
  }

  export type InstructorMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
  }

  export type InstructorMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
  }

  export type InstructorCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    _all?: true
  }

  export type InstructorAggregateArgs = {
    /**
     * Filter which Instructor to aggregate.
     * 
    **/
    where?: InstructorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instructors to fetch.
     * 
    **/
    orderBy?: Enumerable<InstructorOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: InstructorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instructors from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instructors.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Instructors
    **/
    _count?: true | InstructorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InstructorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InstructorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstructorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstructorMaxAggregateInputType
  }

  export type GetInstructorAggregateType<T extends InstructorAggregateArgs> = {
        [P in keyof T & keyof AggregateInstructor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstructor[P]>
      : GetScalarType<T[P], AggregateInstructor[P]>
  }




  export type InstructorGroupByArgs = {
    where?: InstructorWhereInput
    orderBy?: Enumerable<InstructorOrderByWithAggregationInput>
    by: Array<InstructorScalarFieldEnum>
    having?: InstructorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstructorCountAggregateInputType | true
    _avg?: InstructorAvgAggregateInputType
    _sum?: InstructorSumAggregateInputType
    _min?: InstructorMinAggregateInputType
    _max?: InstructorMaxAggregateInputType
  }


  export type InstructorGroupByOutputType = {
    id: number
    name: string
    price: number
    _count: InstructorCountAggregateOutputType | null
    _avg: InstructorAvgAggregateOutputType | null
    _sum: InstructorSumAggregateOutputType | null
    _min: InstructorMinAggregateOutputType | null
    _max: InstructorMaxAggregateOutputType | null
  }

  type GetInstructorGroupByPayload<T extends InstructorGroupByArgs> = PrismaPromise<
    Array<
      PickArray<InstructorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstructorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstructorGroupByOutputType[P]>
            : GetScalarType<T[P], InstructorGroupByOutputType[P]>
        }
      >
    >


  export type InstructorSelect = {
    id?: boolean
    name?: boolean
    price?: boolean
    File?: boolean | FileFindManyArgs
    InstructorHistory?: boolean | InstructorHistoryFindManyArgs
    _count?: boolean | InstructorCountOutputTypeArgs
  }

  export type InstructorInclude = {
    File?: boolean | FileFindManyArgs
    InstructorHistory?: boolean | InstructorHistoryFindManyArgs
    _count?: boolean | InstructorCountOutputTypeArgs
  }

  export type InstructorGetPayload<
    S extends boolean | null | undefined | InstructorArgs,
    U = keyof S
      > = S extends true
        ? Instructor
    : S extends undefined
    ? never
    : S extends InstructorArgs | InstructorFindManyArgs
    ?'include' extends U
    ? Instructor  & {
    [P in TrueKeys<S['include']>]:
        P extends 'File' ? Array < FileGetPayload<S['include'][P]>>  :
        P extends 'InstructorHistory' ? Array < InstructorHistoryGetPayload<S['include'][P]>>  :
        P extends '_count' ? InstructorCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'File' ? Array < FileGetPayload<S['select'][P]>>  :
        P extends 'InstructorHistory' ? Array < InstructorHistoryGetPayload<S['select'][P]>>  :
        P extends '_count' ? InstructorCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Instructor ? Instructor[P] : never
  } 
    : Instructor
  : Instructor


  type InstructorCountArgs = Merge<
    Omit<InstructorFindManyArgs, 'select' | 'include'> & {
      select?: InstructorCountAggregateInputType | true
    }
  >

  export interface InstructorDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Instructor that matches the filter.
     * @param {InstructorFindUniqueArgs} args - Arguments to find a Instructor
     * @example
     * // Get one Instructor
     * const instructor = await prisma.instructor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends InstructorFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, InstructorFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Instructor'> extends True ? CheckSelect<T, Prisma__InstructorClient<Instructor>, Prisma__InstructorClient<InstructorGetPayload<T>>> : CheckSelect<T, Prisma__InstructorClient<Instructor | null >, Prisma__InstructorClient<InstructorGetPayload<T> | null >>

    /**
     * Find the first Instructor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorFindFirstArgs} args - Arguments to find a Instructor
     * @example
     * // Get one Instructor
     * const instructor = await prisma.instructor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends InstructorFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, InstructorFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Instructor'> extends True ? CheckSelect<T, Prisma__InstructorClient<Instructor>, Prisma__InstructorClient<InstructorGetPayload<T>>> : CheckSelect<T, Prisma__InstructorClient<Instructor | null >, Prisma__InstructorClient<InstructorGetPayload<T> | null >>

    /**
     * Find zero or more Instructors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Instructors
     * const instructors = await prisma.instructor.findMany()
     * 
     * // Get first 10 Instructors
     * const instructors = await prisma.instructor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const instructorWithIdOnly = await prisma.instructor.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends InstructorFindManyArgs>(
      args?: SelectSubset<T, InstructorFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Instructor>>, PrismaPromise<Array<InstructorGetPayload<T>>>>

    /**
     * Create a Instructor.
     * @param {InstructorCreateArgs} args - Arguments to create a Instructor.
     * @example
     * // Create one Instructor
     * const Instructor = await prisma.instructor.create({
     *   data: {
     *     // ... data to create a Instructor
     *   }
     * })
     * 
    **/
    create<T extends InstructorCreateArgs>(
      args: SelectSubset<T, InstructorCreateArgs>
    ): CheckSelect<T, Prisma__InstructorClient<Instructor>, Prisma__InstructorClient<InstructorGetPayload<T>>>

    /**
     * Create many Instructors.
     *     @param {InstructorCreateManyArgs} args - Arguments to create many Instructors.
     *     @example
     *     // Create many Instructors
     *     const instructor = await prisma.instructor.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends InstructorCreateManyArgs>(
      args?: SelectSubset<T, InstructorCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Instructor.
     * @param {InstructorDeleteArgs} args - Arguments to delete one Instructor.
     * @example
     * // Delete one Instructor
     * const Instructor = await prisma.instructor.delete({
     *   where: {
     *     // ... filter to delete one Instructor
     *   }
     * })
     * 
    **/
    delete<T extends InstructorDeleteArgs>(
      args: SelectSubset<T, InstructorDeleteArgs>
    ): CheckSelect<T, Prisma__InstructorClient<Instructor>, Prisma__InstructorClient<InstructorGetPayload<T>>>

    /**
     * Update one Instructor.
     * @param {InstructorUpdateArgs} args - Arguments to update one Instructor.
     * @example
     * // Update one Instructor
     * const instructor = await prisma.instructor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends InstructorUpdateArgs>(
      args: SelectSubset<T, InstructorUpdateArgs>
    ): CheckSelect<T, Prisma__InstructorClient<Instructor>, Prisma__InstructorClient<InstructorGetPayload<T>>>

    /**
     * Delete zero or more Instructors.
     * @param {InstructorDeleteManyArgs} args - Arguments to filter Instructors to delete.
     * @example
     * // Delete a few Instructors
     * const { count } = await prisma.instructor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends InstructorDeleteManyArgs>(
      args?: SelectSubset<T, InstructorDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Instructors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Instructors
     * const instructor = await prisma.instructor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends InstructorUpdateManyArgs>(
      args: SelectSubset<T, InstructorUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Instructor.
     * @param {InstructorUpsertArgs} args - Arguments to update or create a Instructor.
     * @example
     * // Update or create a Instructor
     * const instructor = await prisma.instructor.upsert({
     *   create: {
     *     // ... data to create a Instructor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Instructor we want to update
     *   }
     * })
    **/
    upsert<T extends InstructorUpsertArgs>(
      args: SelectSubset<T, InstructorUpsertArgs>
    ): CheckSelect<T, Prisma__InstructorClient<Instructor>, Prisma__InstructorClient<InstructorGetPayload<T>>>

    /**
     * Count the number of Instructors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorCountArgs} args - Arguments to filter Instructors to count.
     * @example
     * // Count the number of Instructors
     * const count = await prisma.instructor.count({
     *   where: {
     *     // ... the filter for the Instructors we want to count
     *   }
     * })
    **/
    count<T extends InstructorCountArgs>(
      args?: Subset<T, InstructorCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstructorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Instructor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InstructorAggregateArgs>(args: Subset<T, InstructorAggregateArgs>): PrismaPromise<GetInstructorAggregateType<T>>

    /**
     * Group by Instructor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InstructorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstructorGroupByArgs['orderBy'] }
        : { orderBy?: InstructorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InstructorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstructorGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Instructor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__InstructorClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    File<T extends FileFindManyArgs = {}>(args?: Subset<T, FileFindManyArgs>): CheckSelect<T, PrismaPromise<Array<File>>, PrismaPromise<Array<FileGetPayload<T>>>>;

    InstructorHistory<T extends InstructorHistoryFindManyArgs = {}>(args?: Subset<T, InstructorHistoryFindManyArgs>): CheckSelect<T, PrismaPromise<Array<InstructorHistory>>, PrismaPromise<Array<InstructorHistoryGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Instructor findUnique
   */
  export type InstructorFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Instructor
     * 
    **/
    select?: InstructorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstructorInclude | null
    /**
     * Throw an Error if a Instructor can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Instructor to fetch.
     * 
    **/
    where: InstructorWhereUniqueInput
  }


  /**
   * Instructor findFirst
   */
  export type InstructorFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Instructor
     * 
    **/
    select?: InstructorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstructorInclude | null
    /**
     * Throw an Error if a Instructor can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Instructor to fetch.
     * 
    **/
    where?: InstructorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instructors to fetch.
     * 
    **/
    orderBy?: Enumerable<InstructorOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Instructors.
     * 
    **/
    cursor?: InstructorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instructors from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instructors.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Instructors.
     * 
    **/
    distinct?: Enumerable<InstructorScalarFieldEnum>
  }


  /**
   * Instructor findMany
   */
  export type InstructorFindManyArgs = {
    /**
     * Select specific fields to fetch from the Instructor
     * 
    **/
    select?: InstructorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstructorInclude | null
    /**
     * Filter, which Instructors to fetch.
     * 
    **/
    where?: InstructorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instructors to fetch.
     * 
    **/
    orderBy?: Enumerable<InstructorOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Instructors.
     * 
    **/
    cursor?: InstructorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instructors from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instructors.
     * 
    **/
    skip?: number
    distinct?: Enumerable<InstructorScalarFieldEnum>
  }


  /**
   * Instructor create
   */
  export type InstructorCreateArgs = {
    /**
     * Select specific fields to fetch from the Instructor
     * 
    **/
    select?: InstructorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstructorInclude | null
    /**
     * The data needed to create a Instructor.
     * 
    **/
    data: XOR<InstructorCreateInput, InstructorUncheckedCreateInput>
  }


  /**
   * Instructor createMany
   */
  export type InstructorCreateManyArgs = {
    /**
     * The data used to create many Instructors.
     * 
    **/
    data: Enumerable<InstructorCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Instructor update
   */
  export type InstructorUpdateArgs = {
    /**
     * Select specific fields to fetch from the Instructor
     * 
    **/
    select?: InstructorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstructorInclude | null
    /**
     * The data needed to update a Instructor.
     * 
    **/
    data: XOR<InstructorUpdateInput, InstructorUncheckedUpdateInput>
    /**
     * Choose, which Instructor to update.
     * 
    **/
    where: InstructorWhereUniqueInput
  }


  /**
   * Instructor updateMany
   */
  export type InstructorUpdateManyArgs = {
    /**
     * The data used to update Instructors.
     * 
    **/
    data: XOR<InstructorUpdateManyMutationInput, InstructorUncheckedUpdateManyInput>
    /**
     * Filter which Instructors to update
     * 
    **/
    where?: InstructorWhereInput
  }


  /**
   * Instructor upsert
   */
  export type InstructorUpsertArgs = {
    /**
     * Select specific fields to fetch from the Instructor
     * 
    **/
    select?: InstructorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstructorInclude | null
    /**
     * The filter to search for the Instructor to update in case it exists.
     * 
    **/
    where: InstructorWhereUniqueInput
    /**
     * In case the Instructor found by the `where` argument doesn't exist, create a new Instructor with this data.
     * 
    **/
    create: XOR<InstructorCreateInput, InstructorUncheckedCreateInput>
    /**
     * In case the Instructor was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<InstructorUpdateInput, InstructorUncheckedUpdateInput>
  }


  /**
   * Instructor delete
   */
  export type InstructorDeleteArgs = {
    /**
     * Select specific fields to fetch from the Instructor
     * 
    **/
    select?: InstructorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstructorInclude | null
    /**
     * Filter which Instructor to delete.
     * 
    **/
    where: InstructorWhereUniqueInput
  }


  /**
   * Instructor deleteMany
   */
  export type InstructorDeleteManyArgs = {
    /**
     * Filter which Instructors to delete
     * 
    **/
    where?: InstructorWhereInput
  }


  /**
   * Instructor without action
   */
  export type InstructorArgs = {
    /**
     * Select specific fields to fetch from the Instructor
     * 
    **/
    select?: InstructorSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstructorInclude | null
  }



  /**
   * Model File
   */


  export type AggregateFile = {
    _count: FileCountAggregateOutputType | null
    _avg: FileAvgAggregateOutputType | null
    _sum: FileSumAggregateOutputType | null
    _min: FileMinAggregateOutputType | null
    _max: FileMaxAggregateOutputType | null
  }

  export type FileAvgAggregateOutputType = {
    id: number | null
    fallaf_price: number | null
    dev_price: number | null
    instructorId: number | null
  }

  export type FileSumAggregateOutputType = {
    id: number | null
    fallaf_price: number | null
    dev_price: number | null
    instructorId: number | null
  }

  export type FileMinAggregateOutputType = {
    id: number | null
    name: string | null
    date: Date | null
    fallaf_price: number | null
    dev_price: number | null
    instructorId: number | null
  }

  export type FileMaxAggregateOutputType = {
    id: number | null
    name: string | null
    date: Date | null
    fallaf_price: number | null
    dev_price: number | null
    instructorId: number | null
  }

  export type FileCountAggregateOutputType = {
    id: number
    name: number
    date: number
    fallaf_price: number
    dev_price: number
    instructorId: number
    _all: number
  }


  export type FileAvgAggregateInputType = {
    id?: true
    fallaf_price?: true
    dev_price?: true
    instructorId?: true
  }

  export type FileSumAggregateInputType = {
    id?: true
    fallaf_price?: true
    dev_price?: true
    instructorId?: true
  }

  export type FileMinAggregateInputType = {
    id?: true
    name?: true
    date?: true
    fallaf_price?: true
    dev_price?: true
    instructorId?: true
  }

  export type FileMaxAggregateInputType = {
    id?: true
    name?: true
    date?: true
    fallaf_price?: true
    dev_price?: true
    instructorId?: true
  }

  export type FileCountAggregateInputType = {
    id?: true
    name?: true
    date?: true
    fallaf_price?: true
    dev_price?: true
    instructorId?: true
    _all?: true
  }

  export type FileAggregateArgs = {
    /**
     * Filter which File to aggregate.
     * 
    **/
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     * 
    **/
    orderBy?: Enumerable<FileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Files
    **/
    _count?: true | FileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FileMaxAggregateInputType
  }

  export type GetFileAggregateType<T extends FileAggregateArgs> = {
        [P in keyof T & keyof AggregateFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFile[P]>
      : GetScalarType<T[P], AggregateFile[P]>
  }




  export type FileGroupByArgs = {
    where?: FileWhereInput
    orderBy?: Enumerable<FileOrderByWithAggregationInput>
    by: Array<FileScalarFieldEnum>
    having?: FileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FileCountAggregateInputType | true
    _avg?: FileAvgAggregateInputType
    _sum?: FileSumAggregateInputType
    _min?: FileMinAggregateInputType
    _max?: FileMaxAggregateInputType
  }


  export type FileGroupByOutputType = {
    id: number
    name: string
    date: Date
    fallaf_price: number
    dev_price: number
    instructorId: number
    _count: FileCountAggregateOutputType | null
    _avg: FileAvgAggregateOutputType | null
    _sum: FileSumAggregateOutputType | null
    _min: FileMinAggregateOutputType | null
    _max: FileMaxAggregateOutputType | null
  }

  type GetFileGroupByPayload<T extends FileGroupByArgs> = PrismaPromise<
    Array<
      PickArray<FileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FileGroupByOutputType[P]>
            : GetScalarType<T[P], FileGroupByOutputType[P]>
        }
      >
    >


  export type FileSelect = {
    id?: boolean
    name?: boolean
    instructor?: boolean | InstructorArgs
    date?: boolean
    fallaf_price?: boolean
    dev_price?: boolean
    instructorId?: boolean
  }

  export type FileInclude = {
    instructor?: boolean | InstructorArgs
  }

  export type FileGetPayload<
    S extends boolean | null | undefined | FileArgs,
    U = keyof S
      > = S extends true
        ? File
    : S extends undefined
    ? never
    : S extends FileArgs | FileFindManyArgs
    ?'include' extends U
    ? File  & {
    [P in TrueKeys<S['include']>]:
        P extends 'instructor' ? InstructorGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'instructor' ? InstructorGetPayload<S['select'][P]> :  P extends keyof File ? File[P] : never
  } 
    : File
  : File


  type FileCountArgs = Merge<
    Omit<FileFindManyArgs, 'select' | 'include'> & {
      select?: FileCountAggregateInputType | true
    }
  >

  export interface FileDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one File that matches the filter.
     * @param {FileFindUniqueArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FileFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, FileFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'File'> extends True ? CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>> : CheckSelect<T, Prisma__FileClient<File | null >, Prisma__FileClient<FileGetPayload<T> | null >>

    /**
     * Find the first File that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindFirstArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FileFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, FileFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'File'> extends True ? CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>> : CheckSelect<T, Prisma__FileClient<File | null >, Prisma__FileClient<FileGetPayload<T> | null >>

    /**
     * Find zero or more Files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Files
     * const files = await prisma.file.findMany()
     * 
     * // Get first 10 Files
     * const files = await prisma.file.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fileWithIdOnly = await prisma.file.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FileFindManyArgs>(
      args?: SelectSubset<T, FileFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<File>>, PrismaPromise<Array<FileGetPayload<T>>>>

    /**
     * Create a File.
     * @param {FileCreateArgs} args - Arguments to create a File.
     * @example
     * // Create one File
     * const File = await prisma.file.create({
     *   data: {
     *     // ... data to create a File
     *   }
     * })
     * 
    **/
    create<T extends FileCreateArgs>(
      args: SelectSubset<T, FileCreateArgs>
    ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>

    /**
     * Create many Files.
     *     @param {FileCreateManyArgs} args - Arguments to create many Files.
     *     @example
     *     // Create many Files
     *     const file = await prisma.file.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends FileCreateManyArgs>(
      args?: SelectSubset<T, FileCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a File.
     * @param {FileDeleteArgs} args - Arguments to delete one File.
     * @example
     * // Delete one File
     * const File = await prisma.file.delete({
     *   where: {
     *     // ... filter to delete one File
     *   }
     * })
     * 
    **/
    delete<T extends FileDeleteArgs>(
      args: SelectSubset<T, FileDeleteArgs>
    ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>

    /**
     * Update one File.
     * @param {FileUpdateArgs} args - Arguments to update one File.
     * @example
     * // Update one File
     * const file = await prisma.file.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FileUpdateArgs>(
      args: SelectSubset<T, FileUpdateArgs>
    ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>

    /**
     * Delete zero or more Files.
     * @param {FileDeleteManyArgs} args - Arguments to filter Files to delete.
     * @example
     * // Delete a few Files
     * const { count } = await prisma.file.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FileDeleteManyArgs>(
      args?: SelectSubset<T, FileDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Files
     * const file = await prisma.file.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FileUpdateManyArgs>(
      args: SelectSubset<T, FileUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one File.
     * @param {FileUpsertArgs} args - Arguments to update or create a File.
     * @example
     * // Update or create a File
     * const file = await prisma.file.upsert({
     *   create: {
     *     // ... data to create a File
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the File we want to update
     *   }
     * })
    **/
    upsert<T extends FileUpsertArgs>(
      args: SelectSubset<T, FileUpsertArgs>
    ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>

    /**
     * Count the number of Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileCountArgs} args - Arguments to filter Files to count.
     * @example
     * // Count the number of Files
     * const count = await prisma.file.count({
     *   where: {
     *     // ... the filter for the Files we want to count
     *   }
     * })
    **/
    count<T extends FileCountArgs>(
      args?: Subset<T, FileCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a File.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FileAggregateArgs>(args: Subset<T, FileAggregateArgs>): PrismaPromise<GetFileAggregateType<T>>

    /**
     * Group by File.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FileGroupByArgs['orderBy'] }
        : { orderBy?: FileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for File.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__FileClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    instructor<T extends InstructorArgs = {}>(args?: Subset<T, InstructorArgs>): CheckSelect<T, Prisma__InstructorClient<Instructor | null >, Prisma__InstructorClient<InstructorGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * File findUnique
   */
  export type FileFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the File
     * 
    **/
    select?: FileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FileInclude | null
    /**
     * Throw an Error if a File can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which File to fetch.
     * 
    **/
    where: FileWhereUniqueInput
  }


  /**
   * File findFirst
   */
  export type FileFindFirstArgs = {
    /**
     * Select specific fields to fetch from the File
     * 
    **/
    select?: FileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FileInclude | null
    /**
     * Throw an Error if a File can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which File to fetch.
     * 
    **/
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     * 
    **/
    orderBy?: Enumerable<FileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Files.
     * 
    **/
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Files.
     * 
    **/
    distinct?: Enumerable<FileScalarFieldEnum>
  }


  /**
   * File findMany
   */
  export type FileFindManyArgs = {
    /**
     * Select specific fields to fetch from the File
     * 
    **/
    select?: FileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FileInclude | null
    /**
     * Filter, which Files to fetch.
     * 
    **/
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     * 
    **/
    orderBy?: Enumerable<FileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Files.
     * 
    **/
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     * 
    **/
    skip?: number
    distinct?: Enumerable<FileScalarFieldEnum>
  }


  /**
   * File create
   */
  export type FileCreateArgs = {
    /**
     * Select specific fields to fetch from the File
     * 
    **/
    select?: FileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FileInclude | null
    /**
     * The data needed to create a File.
     * 
    **/
    data: XOR<FileCreateInput, FileUncheckedCreateInput>
  }


  /**
   * File createMany
   */
  export type FileCreateManyArgs = {
    /**
     * The data used to create many Files.
     * 
    **/
    data: Enumerable<FileCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * File update
   */
  export type FileUpdateArgs = {
    /**
     * Select specific fields to fetch from the File
     * 
    **/
    select?: FileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FileInclude | null
    /**
     * The data needed to update a File.
     * 
    **/
    data: XOR<FileUpdateInput, FileUncheckedUpdateInput>
    /**
     * Choose, which File to update.
     * 
    **/
    where: FileWhereUniqueInput
  }


  /**
   * File updateMany
   */
  export type FileUpdateManyArgs = {
    /**
     * The data used to update Files.
     * 
    **/
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyInput>
    /**
     * Filter which Files to update
     * 
    **/
    where?: FileWhereInput
  }


  /**
   * File upsert
   */
  export type FileUpsertArgs = {
    /**
     * Select specific fields to fetch from the File
     * 
    **/
    select?: FileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FileInclude | null
    /**
     * The filter to search for the File to update in case it exists.
     * 
    **/
    where: FileWhereUniqueInput
    /**
     * In case the File found by the `where` argument doesn't exist, create a new File with this data.
     * 
    **/
    create: XOR<FileCreateInput, FileUncheckedCreateInput>
    /**
     * In case the File was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<FileUpdateInput, FileUncheckedUpdateInput>
  }


  /**
   * File delete
   */
  export type FileDeleteArgs = {
    /**
     * Select specific fields to fetch from the File
     * 
    **/
    select?: FileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FileInclude | null
    /**
     * Filter which File to delete.
     * 
    **/
    where: FileWhereUniqueInput
  }


  /**
   * File deleteMany
   */
  export type FileDeleteManyArgs = {
    /**
     * Filter which Files to delete
     * 
    **/
    where?: FileWhereInput
  }


  /**
   * File without action
   */
  export type FileArgs = {
    /**
     * Select specific fields to fetch from the File
     * 
    **/
    select?: FileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FileInclude | null
  }



  /**
   * Model InstructorHistory
   */


  export type AggregateInstructorHistory = {
    _count: InstructorHistoryCountAggregateOutputType | null
    _avg: InstructorHistoryAvgAggregateOutputType | null
    _sum: InstructorHistorySumAggregateOutputType | null
    _min: InstructorHistoryMinAggregateOutputType | null
    _max: InstructorHistoryMaxAggregateOutputType | null
  }

  export type InstructorHistoryAvgAggregateOutputType = {
    id: number | null
    sum: number | null
    instructorId: number | null
  }

  export type InstructorHistorySumAggregateOutputType = {
    id: number | null
    sum: number | null
    instructorId: number | null
  }

  export type InstructorHistoryMinAggregateOutputType = {
    id: number | null
    date: Date | null
    sum: number | null
    instructorId: number | null
  }

  export type InstructorHistoryMaxAggregateOutputType = {
    id: number | null
    date: Date | null
    sum: number | null
    instructorId: number | null
  }

  export type InstructorHistoryCountAggregateOutputType = {
    id: number
    date: number
    sum: number
    instructorId: number
    _all: number
  }


  export type InstructorHistoryAvgAggregateInputType = {
    id?: true
    sum?: true
    instructorId?: true
  }

  export type InstructorHistorySumAggregateInputType = {
    id?: true
    sum?: true
    instructorId?: true
  }

  export type InstructorHistoryMinAggregateInputType = {
    id?: true
    date?: true
    sum?: true
    instructorId?: true
  }

  export type InstructorHistoryMaxAggregateInputType = {
    id?: true
    date?: true
    sum?: true
    instructorId?: true
  }

  export type InstructorHistoryCountAggregateInputType = {
    id?: true
    date?: true
    sum?: true
    instructorId?: true
    _all?: true
  }

  export type InstructorHistoryAggregateArgs = {
    /**
     * Filter which InstructorHistory to aggregate.
     * 
    **/
    where?: InstructorHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstructorHistories to fetch.
     * 
    **/
    orderBy?: Enumerable<InstructorHistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: InstructorHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstructorHistories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstructorHistories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InstructorHistories
    **/
    _count?: true | InstructorHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InstructorHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InstructorHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstructorHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstructorHistoryMaxAggregateInputType
  }

  export type GetInstructorHistoryAggregateType<T extends InstructorHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateInstructorHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstructorHistory[P]>
      : GetScalarType<T[P], AggregateInstructorHistory[P]>
  }




  export type InstructorHistoryGroupByArgs = {
    where?: InstructorHistoryWhereInput
    orderBy?: Enumerable<InstructorHistoryOrderByWithAggregationInput>
    by: Array<InstructorHistoryScalarFieldEnum>
    having?: InstructorHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstructorHistoryCountAggregateInputType | true
    _avg?: InstructorHistoryAvgAggregateInputType
    _sum?: InstructorHistorySumAggregateInputType
    _min?: InstructorHistoryMinAggregateInputType
    _max?: InstructorHistoryMaxAggregateInputType
  }


  export type InstructorHistoryGroupByOutputType = {
    id: number
    date: Date
    sum: number
    instructorId: number
    _count: InstructorHistoryCountAggregateOutputType | null
    _avg: InstructorHistoryAvgAggregateOutputType | null
    _sum: InstructorHistorySumAggregateOutputType | null
    _min: InstructorHistoryMinAggregateOutputType | null
    _max: InstructorHistoryMaxAggregateOutputType | null
  }

  type GetInstructorHistoryGroupByPayload<T extends InstructorHistoryGroupByArgs> = PrismaPromise<
    Array<
      PickArray<InstructorHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstructorHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstructorHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], InstructorHistoryGroupByOutputType[P]>
        }
      >
    >


  export type InstructorHistorySelect = {
    id?: boolean
    instructor?: boolean | InstructorArgs
    date?: boolean
    sum?: boolean
    instructorId?: boolean
  }

  export type InstructorHistoryInclude = {
    instructor?: boolean | InstructorArgs
  }

  export type InstructorHistoryGetPayload<
    S extends boolean | null | undefined | InstructorHistoryArgs,
    U = keyof S
      > = S extends true
        ? InstructorHistory
    : S extends undefined
    ? never
    : S extends InstructorHistoryArgs | InstructorHistoryFindManyArgs
    ?'include' extends U
    ? InstructorHistory  & {
    [P in TrueKeys<S['include']>]:
        P extends 'instructor' ? InstructorGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'instructor' ? InstructorGetPayload<S['select'][P]> :  P extends keyof InstructorHistory ? InstructorHistory[P] : never
  } 
    : InstructorHistory
  : InstructorHistory


  type InstructorHistoryCountArgs = Merge<
    Omit<InstructorHistoryFindManyArgs, 'select' | 'include'> & {
      select?: InstructorHistoryCountAggregateInputType | true
    }
  >

  export interface InstructorHistoryDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one InstructorHistory that matches the filter.
     * @param {InstructorHistoryFindUniqueArgs} args - Arguments to find a InstructorHistory
     * @example
     * // Get one InstructorHistory
     * const instructorHistory = await prisma.instructorHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends InstructorHistoryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, InstructorHistoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'InstructorHistory'> extends True ? CheckSelect<T, Prisma__InstructorHistoryClient<InstructorHistory>, Prisma__InstructorHistoryClient<InstructorHistoryGetPayload<T>>> : CheckSelect<T, Prisma__InstructorHistoryClient<InstructorHistory | null >, Prisma__InstructorHistoryClient<InstructorHistoryGetPayload<T> | null >>

    /**
     * Find the first InstructorHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorHistoryFindFirstArgs} args - Arguments to find a InstructorHistory
     * @example
     * // Get one InstructorHistory
     * const instructorHistory = await prisma.instructorHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends InstructorHistoryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, InstructorHistoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'InstructorHistory'> extends True ? CheckSelect<T, Prisma__InstructorHistoryClient<InstructorHistory>, Prisma__InstructorHistoryClient<InstructorHistoryGetPayload<T>>> : CheckSelect<T, Prisma__InstructorHistoryClient<InstructorHistory | null >, Prisma__InstructorHistoryClient<InstructorHistoryGetPayload<T> | null >>

    /**
     * Find zero or more InstructorHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorHistoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InstructorHistories
     * const instructorHistories = await prisma.instructorHistory.findMany()
     * 
     * // Get first 10 InstructorHistories
     * const instructorHistories = await prisma.instructorHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const instructorHistoryWithIdOnly = await prisma.instructorHistory.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends InstructorHistoryFindManyArgs>(
      args?: SelectSubset<T, InstructorHistoryFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<InstructorHistory>>, PrismaPromise<Array<InstructorHistoryGetPayload<T>>>>

    /**
     * Create a InstructorHistory.
     * @param {InstructorHistoryCreateArgs} args - Arguments to create a InstructorHistory.
     * @example
     * // Create one InstructorHistory
     * const InstructorHistory = await prisma.instructorHistory.create({
     *   data: {
     *     // ... data to create a InstructorHistory
     *   }
     * })
     * 
    **/
    create<T extends InstructorHistoryCreateArgs>(
      args: SelectSubset<T, InstructorHistoryCreateArgs>
    ): CheckSelect<T, Prisma__InstructorHistoryClient<InstructorHistory>, Prisma__InstructorHistoryClient<InstructorHistoryGetPayload<T>>>

    /**
     * Create many InstructorHistories.
     *     @param {InstructorHistoryCreateManyArgs} args - Arguments to create many InstructorHistories.
     *     @example
     *     // Create many InstructorHistories
     *     const instructorHistory = await prisma.instructorHistory.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends InstructorHistoryCreateManyArgs>(
      args?: SelectSubset<T, InstructorHistoryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a InstructorHistory.
     * @param {InstructorHistoryDeleteArgs} args - Arguments to delete one InstructorHistory.
     * @example
     * // Delete one InstructorHistory
     * const InstructorHistory = await prisma.instructorHistory.delete({
     *   where: {
     *     // ... filter to delete one InstructorHistory
     *   }
     * })
     * 
    **/
    delete<T extends InstructorHistoryDeleteArgs>(
      args: SelectSubset<T, InstructorHistoryDeleteArgs>
    ): CheckSelect<T, Prisma__InstructorHistoryClient<InstructorHistory>, Prisma__InstructorHistoryClient<InstructorHistoryGetPayload<T>>>

    /**
     * Update one InstructorHistory.
     * @param {InstructorHistoryUpdateArgs} args - Arguments to update one InstructorHistory.
     * @example
     * // Update one InstructorHistory
     * const instructorHistory = await prisma.instructorHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends InstructorHistoryUpdateArgs>(
      args: SelectSubset<T, InstructorHistoryUpdateArgs>
    ): CheckSelect<T, Prisma__InstructorHistoryClient<InstructorHistory>, Prisma__InstructorHistoryClient<InstructorHistoryGetPayload<T>>>

    /**
     * Delete zero or more InstructorHistories.
     * @param {InstructorHistoryDeleteManyArgs} args - Arguments to filter InstructorHistories to delete.
     * @example
     * // Delete a few InstructorHistories
     * const { count } = await prisma.instructorHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends InstructorHistoryDeleteManyArgs>(
      args?: SelectSubset<T, InstructorHistoryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more InstructorHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InstructorHistories
     * const instructorHistory = await prisma.instructorHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends InstructorHistoryUpdateManyArgs>(
      args: SelectSubset<T, InstructorHistoryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one InstructorHistory.
     * @param {InstructorHistoryUpsertArgs} args - Arguments to update or create a InstructorHistory.
     * @example
     * // Update or create a InstructorHistory
     * const instructorHistory = await prisma.instructorHistory.upsert({
     *   create: {
     *     // ... data to create a InstructorHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InstructorHistory we want to update
     *   }
     * })
    **/
    upsert<T extends InstructorHistoryUpsertArgs>(
      args: SelectSubset<T, InstructorHistoryUpsertArgs>
    ): CheckSelect<T, Prisma__InstructorHistoryClient<InstructorHistory>, Prisma__InstructorHistoryClient<InstructorHistoryGetPayload<T>>>

    /**
     * Count the number of InstructorHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorHistoryCountArgs} args - Arguments to filter InstructorHistories to count.
     * @example
     * // Count the number of InstructorHistories
     * const count = await prisma.instructorHistory.count({
     *   where: {
     *     // ... the filter for the InstructorHistories we want to count
     *   }
     * })
    **/
    count<T extends InstructorHistoryCountArgs>(
      args?: Subset<T, InstructorHistoryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstructorHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InstructorHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InstructorHistoryAggregateArgs>(args: Subset<T, InstructorHistoryAggregateArgs>): PrismaPromise<GetInstructorHistoryAggregateType<T>>

    /**
     * Group by InstructorHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InstructorHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstructorHistoryGroupByArgs['orderBy'] }
        : { orderBy?: InstructorHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InstructorHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstructorHistoryGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for InstructorHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__InstructorHistoryClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    instructor<T extends InstructorArgs = {}>(args?: Subset<T, InstructorArgs>): CheckSelect<T, Prisma__InstructorClient<Instructor | null >, Prisma__InstructorClient<InstructorGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * InstructorHistory findUnique
   */
  export type InstructorHistoryFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the InstructorHistory
     * 
    **/
    select?: InstructorHistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstructorHistoryInclude | null
    /**
     * Throw an Error if a InstructorHistory can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which InstructorHistory to fetch.
     * 
    **/
    where: InstructorHistoryWhereUniqueInput
  }


  /**
   * InstructorHistory findFirst
   */
  export type InstructorHistoryFindFirstArgs = {
    /**
     * Select specific fields to fetch from the InstructorHistory
     * 
    **/
    select?: InstructorHistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstructorHistoryInclude | null
    /**
     * Throw an Error if a InstructorHistory can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which InstructorHistory to fetch.
     * 
    **/
    where?: InstructorHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstructorHistories to fetch.
     * 
    **/
    orderBy?: Enumerable<InstructorHistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InstructorHistories.
     * 
    **/
    cursor?: InstructorHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstructorHistories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstructorHistories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InstructorHistories.
     * 
    **/
    distinct?: Enumerable<InstructorHistoryScalarFieldEnum>
  }


  /**
   * InstructorHistory findMany
   */
  export type InstructorHistoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the InstructorHistory
     * 
    **/
    select?: InstructorHistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstructorHistoryInclude | null
    /**
     * Filter, which InstructorHistories to fetch.
     * 
    **/
    where?: InstructorHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstructorHistories to fetch.
     * 
    **/
    orderBy?: Enumerable<InstructorHistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InstructorHistories.
     * 
    **/
    cursor?: InstructorHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstructorHistories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstructorHistories.
     * 
    **/
    skip?: number
    distinct?: Enumerable<InstructorHistoryScalarFieldEnum>
  }


  /**
   * InstructorHistory create
   */
  export type InstructorHistoryCreateArgs = {
    /**
     * Select specific fields to fetch from the InstructorHistory
     * 
    **/
    select?: InstructorHistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstructorHistoryInclude | null
    /**
     * The data needed to create a InstructorHistory.
     * 
    **/
    data: XOR<InstructorHistoryCreateInput, InstructorHistoryUncheckedCreateInput>
  }


  /**
   * InstructorHistory createMany
   */
  export type InstructorHistoryCreateManyArgs = {
    /**
     * The data used to create many InstructorHistories.
     * 
    **/
    data: Enumerable<InstructorHistoryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * InstructorHistory update
   */
  export type InstructorHistoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the InstructorHistory
     * 
    **/
    select?: InstructorHistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstructorHistoryInclude | null
    /**
     * The data needed to update a InstructorHistory.
     * 
    **/
    data: XOR<InstructorHistoryUpdateInput, InstructorHistoryUncheckedUpdateInput>
    /**
     * Choose, which InstructorHistory to update.
     * 
    **/
    where: InstructorHistoryWhereUniqueInput
  }


  /**
   * InstructorHistory updateMany
   */
  export type InstructorHistoryUpdateManyArgs = {
    /**
     * The data used to update InstructorHistories.
     * 
    **/
    data: XOR<InstructorHistoryUpdateManyMutationInput, InstructorHistoryUncheckedUpdateManyInput>
    /**
     * Filter which InstructorHistories to update
     * 
    **/
    where?: InstructorHistoryWhereInput
  }


  /**
   * InstructorHistory upsert
   */
  export type InstructorHistoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the InstructorHistory
     * 
    **/
    select?: InstructorHistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstructorHistoryInclude | null
    /**
     * The filter to search for the InstructorHistory to update in case it exists.
     * 
    **/
    where: InstructorHistoryWhereUniqueInput
    /**
     * In case the InstructorHistory found by the `where` argument doesn't exist, create a new InstructorHistory with this data.
     * 
    **/
    create: XOR<InstructorHistoryCreateInput, InstructorHistoryUncheckedCreateInput>
    /**
     * In case the InstructorHistory was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<InstructorHistoryUpdateInput, InstructorHistoryUncheckedUpdateInput>
  }


  /**
   * InstructorHistory delete
   */
  export type InstructorHistoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the InstructorHistory
     * 
    **/
    select?: InstructorHistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstructorHistoryInclude | null
    /**
     * Filter which InstructorHistory to delete.
     * 
    **/
    where: InstructorHistoryWhereUniqueInput
  }


  /**
   * InstructorHistory deleteMany
   */
  export type InstructorHistoryDeleteManyArgs = {
    /**
     * Filter which InstructorHistories to delete
     * 
    **/
    where?: InstructorHistoryWhereInput
  }


  /**
   * InstructorHistory without action
   */
  export type InstructorHistoryArgs = {
    /**
     * Select specific fields to fetch from the InstructorHistory
     * 
    **/
    select?: InstructorHistorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstructorHistoryInclude | null
  }



  /**
   * Model DevHistory
   */


  export type AggregateDevHistory = {
    _count: DevHistoryCountAggregateOutputType | null
    _avg: DevHistoryAvgAggregateOutputType | null
    _sum: DevHistorySumAggregateOutputType | null
    _min: DevHistoryMinAggregateOutputType | null
    _max: DevHistoryMaxAggregateOutputType | null
  }

  export type DevHistoryAvgAggregateOutputType = {
    id: number | null
    sum: number | null
  }

  export type DevHistorySumAggregateOutputType = {
    id: number | null
    sum: number | null
  }

  export type DevHistoryMinAggregateOutputType = {
    id: number | null
    date: Date | null
    sum: number | null
  }

  export type DevHistoryMaxAggregateOutputType = {
    id: number | null
    date: Date | null
    sum: number | null
  }

  export type DevHistoryCountAggregateOutputType = {
    id: number
    date: number
    sum: number
    _all: number
  }


  export type DevHistoryAvgAggregateInputType = {
    id?: true
    sum?: true
  }

  export type DevHistorySumAggregateInputType = {
    id?: true
    sum?: true
  }

  export type DevHistoryMinAggregateInputType = {
    id?: true
    date?: true
    sum?: true
  }

  export type DevHistoryMaxAggregateInputType = {
    id?: true
    date?: true
    sum?: true
  }

  export type DevHistoryCountAggregateInputType = {
    id?: true
    date?: true
    sum?: true
    _all?: true
  }

  export type DevHistoryAggregateArgs = {
    /**
     * Filter which DevHistory to aggregate.
     * 
    **/
    where?: DevHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DevHistories to fetch.
     * 
    **/
    orderBy?: Enumerable<DevHistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DevHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DevHistories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DevHistories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DevHistories
    **/
    _count?: true | DevHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DevHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DevHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DevHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DevHistoryMaxAggregateInputType
  }

  export type GetDevHistoryAggregateType<T extends DevHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateDevHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDevHistory[P]>
      : GetScalarType<T[P], AggregateDevHistory[P]>
  }




  export type DevHistoryGroupByArgs = {
    where?: DevHistoryWhereInput
    orderBy?: Enumerable<DevHistoryOrderByWithAggregationInput>
    by: Array<DevHistoryScalarFieldEnum>
    having?: DevHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DevHistoryCountAggregateInputType | true
    _avg?: DevHistoryAvgAggregateInputType
    _sum?: DevHistorySumAggregateInputType
    _min?: DevHistoryMinAggregateInputType
    _max?: DevHistoryMaxAggregateInputType
  }


  export type DevHistoryGroupByOutputType = {
    id: number
    date: Date
    sum: number
    _count: DevHistoryCountAggregateOutputType | null
    _avg: DevHistoryAvgAggregateOutputType | null
    _sum: DevHistorySumAggregateOutputType | null
    _min: DevHistoryMinAggregateOutputType | null
    _max: DevHistoryMaxAggregateOutputType | null
  }

  type GetDevHistoryGroupByPayload<T extends DevHistoryGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DevHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DevHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DevHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], DevHistoryGroupByOutputType[P]>
        }
      >
    >


  export type DevHistorySelect = {
    id?: boolean
    date?: boolean
    sum?: boolean
  }

  export type DevHistoryGetPayload<
    S extends boolean | null | undefined | DevHistoryArgs,
    U = keyof S
      > = S extends true
        ? DevHistory
    : S extends undefined
    ? never
    : S extends DevHistoryArgs | DevHistoryFindManyArgs
    ?'include' extends U
    ? DevHistory 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof DevHistory ? DevHistory[P] : never
  } 
    : DevHistory
  : DevHistory


  type DevHistoryCountArgs = Merge<
    Omit<DevHistoryFindManyArgs, 'select' | 'include'> & {
      select?: DevHistoryCountAggregateInputType | true
    }
  >

  export interface DevHistoryDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one DevHistory that matches the filter.
     * @param {DevHistoryFindUniqueArgs} args - Arguments to find a DevHistory
     * @example
     * // Get one DevHistory
     * const devHistory = await prisma.devHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DevHistoryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DevHistoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'DevHistory'> extends True ? CheckSelect<T, Prisma__DevHistoryClient<DevHistory>, Prisma__DevHistoryClient<DevHistoryGetPayload<T>>> : CheckSelect<T, Prisma__DevHistoryClient<DevHistory | null >, Prisma__DevHistoryClient<DevHistoryGetPayload<T> | null >>

    /**
     * Find the first DevHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevHistoryFindFirstArgs} args - Arguments to find a DevHistory
     * @example
     * // Get one DevHistory
     * const devHistory = await prisma.devHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DevHistoryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DevHistoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'DevHistory'> extends True ? CheckSelect<T, Prisma__DevHistoryClient<DevHistory>, Prisma__DevHistoryClient<DevHistoryGetPayload<T>>> : CheckSelect<T, Prisma__DevHistoryClient<DevHistory | null >, Prisma__DevHistoryClient<DevHistoryGetPayload<T> | null >>

    /**
     * Find zero or more DevHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevHistoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DevHistories
     * const devHistories = await prisma.devHistory.findMany()
     * 
     * // Get first 10 DevHistories
     * const devHistories = await prisma.devHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const devHistoryWithIdOnly = await prisma.devHistory.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DevHistoryFindManyArgs>(
      args?: SelectSubset<T, DevHistoryFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<DevHistory>>, PrismaPromise<Array<DevHistoryGetPayload<T>>>>

    /**
     * Create a DevHistory.
     * @param {DevHistoryCreateArgs} args - Arguments to create a DevHistory.
     * @example
     * // Create one DevHistory
     * const DevHistory = await prisma.devHistory.create({
     *   data: {
     *     // ... data to create a DevHistory
     *   }
     * })
     * 
    **/
    create<T extends DevHistoryCreateArgs>(
      args: SelectSubset<T, DevHistoryCreateArgs>
    ): CheckSelect<T, Prisma__DevHistoryClient<DevHistory>, Prisma__DevHistoryClient<DevHistoryGetPayload<T>>>

    /**
     * Create many DevHistories.
     *     @param {DevHistoryCreateManyArgs} args - Arguments to create many DevHistories.
     *     @example
     *     // Create many DevHistories
     *     const devHistory = await prisma.devHistory.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DevHistoryCreateManyArgs>(
      args?: SelectSubset<T, DevHistoryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a DevHistory.
     * @param {DevHistoryDeleteArgs} args - Arguments to delete one DevHistory.
     * @example
     * // Delete one DevHistory
     * const DevHistory = await prisma.devHistory.delete({
     *   where: {
     *     // ... filter to delete one DevHistory
     *   }
     * })
     * 
    **/
    delete<T extends DevHistoryDeleteArgs>(
      args: SelectSubset<T, DevHistoryDeleteArgs>
    ): CheckSelect<T, Prisma__DevHistoryClient<DevHistory>, Prisma__DevHistoryClient<DevHistoryGetPayload<T>>>

    /**
     * Update one DevHistory.
     * @param {DevHistoryUpdateArgs} args - Arguments to update one DevHistory.
     * @example
     * // Update one DevHistory
     * const devHistory = await prisma.devHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DevHistoryUpdateArgs>(
      args: SelectSubset<T, DevHistoryUpdateArgs>
    ): CheckSelect<T, Prisma__DevHistoryClient<DevHistory>, Prisma__DevHistoryClient<DevHistoryGetPayload<T>>>

    /**
     * Delete zero or more DevHistories.
     * @param {DevHistoryDeleteManyArgs} args - Arguments to filter DevHistories to delete.
     * @example
     * // Delete a few DevHistories
     * const { count } = await prisma.devHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DevHistoryDeleteManyArgs>(
      args?: SelectSubset<T, DevHistoryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more DevHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DevHistories
     * const devHistory = await prisma.devHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DevHistoryUpdateManyArgs>(
      args: SelectSubset<T, DevHistoryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one DevHistory.
     * @param {DevHistoryUpsertArgs} args - Arguments to update or create a DevHistory.
     * @example
     * // Update or create a DevHistory
     * const devHistory = await prisma.devHistory.upsert({
     *   create: {
     *     // ... data to create a DevHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DevHistory we want to update
     *   }
     * })
    **/
    upsert<T extends DevHistoryUpsertArgs>(
      args: SelectSubset<T, DevHistoryUpsertArgs>
    ): CheckSelect<T, Prisma__DevHistoryClient<DevHistory>, Prisma__DevHistoryClient<DevHistoryGetPayload<T>>>

    /**
     * Count the number of DevHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevHistoryCountArgs} args - Arguments to filter DevHistories to count.
     * @example
     * // Count the number of DevHistories
     * const count = await prisma.devHistory.count({
     *   where: {
     *     // ... the filter for the DevHistories we want to count
     *   }
     * })
    **/
    count<T extends DevHistoryCountArgs>(
      args?: Subset<T, DevHistoryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DevHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DevHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DevHistoryAggregateArgs>(args: Subset<T, DevHistoryAggregateArgs>): PrismaPromise<GetDevHistoryAggregateType<T>>

    /**
     * Group by DevHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DevHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DevHistoryGroupByArgs['orderBy'] }
        : { orderBy?: DevHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DevHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDevHistoryGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for DevHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DevHistoryClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * DevHistory findUnique
   */
  export type DevHistoryFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the DevHistory
     * 
    **/
    select?: DevHistorySelect | null
    /**
     * Throw an Error if a DevHistory can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which DevHistory to fetch.
     * 
    **/
    where: DevHistoryWhereUniqueInput
  }


  /**
   * DevHistory findFirst
   */
  export type DevHistoryFindFirstArgs = {
    /**
     * Select specific fields to fetch from the DevHistory
     * 
    **/
    select?: DevHistorySelect | null
    /**
     * Throw an Error if a DevHistory can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which DevHistory to fetch.
     * 
    **/
    where?: DevHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DevHistories to fetch.
     * 
    **/
    orderBy?: Enumerable<DevHistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DevHistories.
     * 
    **/
    cursor?: DevHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DevHistories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DevHistories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DevHistories.
     * 
    **/
    distinct?: Enumerable<DevHistoryScalarFieldEnum>
  }


  /**
   * DevHistory findMany
   */
  export type DevHistoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the DevHistory
     * 
    **/
    select?: DevHistorySelect | null
    /**
     * Filter, which DevHistories to fetch.
     * 
    **/
    where?: DevHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DevHistories to fetch.
     * 
    **/
    orderBy?: Enumerable<DevHistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DevHistories.
     * 
    **/
    cursor?: DevHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DevHistories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DevHistories.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DevHistoryScalarFieldEnum>
  }


  /**
   * DevHistory create
   */
  export type DevHistoryCreateArgs = {
    /**
     * Select specific fields to fetch from the DevHistory
     * 
    **/
    select?: DevHistorySelect | null
    /**
     * The data needed to create a DevHistory.
     * 
    **/
    data: XOR<DevHistoryCreateInput, DevHistoryUncheckedCreateInput>
  }


  /**
   * DevHistory createMany
   */
  export type DevHistoryCreateManyArgs = {
    /**
     * The data used to create many DevHistories.
     * 
    **/
    data: Enumerable<DevHistoryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * DevHistory update
   */
  export type DevHistoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the DevHistory
     * 
    **/
    select?: DevHistorySelect | null
    /**
     * The data needed to update a DevHistory.
     * 
    **/
    data: XOR<DevHistoryUpdateInput, DevHistoryUncheckedUpdateInput>
    /**
     * Choose, which DevHistory to update.
     * 
    **/
    where: DevHistoryWhereUniqueInput
  }


  /**
   * DevHistory updateMany
   */
  export type DevHistoryUpdateManyArgs = {
    /**
     * The data used to update DevHistories.
     * 
    **/
    data: XOR<DevHistoryUpdateManyMutationInput, DevHistoryUncheckedUpdateManyInput>
    /**
     * Filter which DevHistories to update
     * 
    **/
    where?: DevHistoryWhereInput
  }


  /**
   * DevHistory upsert
   */
  export type DevHistoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the DevHistory
     * 
    **/
    select?: DevHistorySelect | null
    /**
     * The filter to search for the DevHistory to update in case it exists.
     * 
    **/
    where: DevHistoryWhereUniqueInput
    /**
     * In case the DevHistory found by the `where` argument doesn't exist, create a new DevHistory with this data.
     * 
    **/
    create: XOR<DevHistoryCreateInput, DevHistoryUncheckedCreateInput>
    /**
     * In case the DevHistory was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DevHistoryUpdateInput, DevHistoryUncheckedUpdateInput>
  }


  /**
   * DevHistory delete
   */
  export type DevHistoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the DevHistory
     * 
    **/
    select?: DevHistorySelect | null
    /**
     * Filter which DevHistory to delete.
     * 
    **/
    where: DevHistoryWhereUniqueInput
  }


  /**
   * DevHistory deleteMany
   */
  export type DevHistoryDeleteManyArgs = {
    /**
     * Filter which DevHistories to delete
     * 
    **/
    where?: DevHistoryWhereInput
  }


  /**
   * DevHistory without action
   */
  export type DevHistoryArgs = {
    /**
     * Select specific fields to fetch from the DevHistory
     * 
    **/
    select?: DevHistorySelect | null
  }



  /**
   * Model Dev
   */


  export type AggregateDev = {
    _count: DevCountAggregateOutputType | null
    _avg: DevAvgAggregateOutputType | null
    _sum: DevSumAggregateOutputType | null
    _min: DevMinAggregateOutputType | null
    _max: DevMaxAggregateOutputType | null
  }

  export type DevAvgAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type DevSumAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type DevMinAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type DevMaxAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type DevCountAggregateOutputType = {
    id: number
    price: number
    _all: number
  }


  export type DevAvgAggregateInputType = {
    id?: true
    price?: true
  }

  export type DevSumAggregateInputType = {
    id?: true
    price?: true
  }

  export type DevMinAggregateInputType = {
    id?: true
    price?: true
  }

  export type DevMaxAggregateInputType = {
    id?: true
    price?: true
  }

  export type DevCountAggregateInputType = {
    id?: true
    price?: true
    _all?: true
  }

  export type DevAggregateArgs = {
    /**
     * Filter which Dev to aggregate.
     * 
    **/
    where?: DevWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devs to fetch.
     * 
    **/
    orderBy?: Enumerable<DevOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DevWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Devs
    **/
    _count?: true | DevCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DevAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DevSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DevMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DevMaxAggregateInputType
  }

  export type GetDevAggregateType<T extends DevAggregateArgs> = {
        [P in keyof T & keyof AggregateDev]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDev[P]>
      : GetScalarType<T[P], AggregateDev[P]>
  }




  export type DevGroupByArgs = {
    where?: DevWhereInput
    orderBy?: Enumerable<DevOrderByWithAggregationInput>
    by: Array<DevScalarFieldEnum>
    having?: DevScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DevCountAggregateInputType | true
    _avg?: DevAvgAggregateInputType
    _sum?: DevSumAggregateInputType
    _min?: DevMinAggregateInputType
    _max?: DevMaxAggregateInputType
  }


  export type DevGroupByOutputType = {
    id: number
    price: number
    _count: DevCountAggregateOutputType | null
    _avg: DevAvgAggregateOutputType | null
    _sum: DevSumAggregateOutputType | null
    _min: DevMinAggregateOutputType | null
    _max: DevMaxAggregateOutputType | null
  }

  type GetDevGroupByPayload<T extends DevGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DevGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DevGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DevGroupByOutputType[P]>
            : GetScalarType<T[P], DevGroupByOutputType[P]>
        }
      >
    >


  export type DevSelect = {
    id?: boolean
    price?: boolean
  }

  export type DevGetPayload<
    S extends boolean | null | undefined | DevArgs,
    U = keyof S
      > = S extends true
        ? Dev
    : S extends undefined
    ? never
    : S extends DevArgs | DevFindManyArgs
    ?'include' extends U
    ? Dev 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof Dev ? Dev[P] : never
  } 
    : Dev
  : Dev


  type DevCountArgs = Merge<
    Omit<DevFindManyArgs, 'select' | 'include'> & {
      select?: DevCountAggregateInputType | true
    }
  >

  export interface DevDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Dev that matches the filter.
     * @param {DevFindUniqueArgs} args - Arguments to find a Dev
     * @example
     * // Get one Dev
     * const dev = await prisma.dev.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DevFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DevFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Dev'> extends True ? CheckSelect<T, Prisma__DevClient<Dev>, Prisma__DevClient<DevGetPayload<T>>> : CheckSelect<T, Prisma__DevClient<Dev | null >, Prisma__DevClient<DevGetPayload<T> | null >>

    /**
     * Find the first Dev that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevFindFirstArgs} args - Arguments to find a Dev
     * @example
     * // Get one Dev
     * const dev = await prisma.dev.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DevFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DevFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Dev'> extends True ? CheckSelect<T, Prisma__DevClient<Dev>, Prisma__DevClient<DevGetPayload<T>>> : CheckSelect<T, Prisma__DevClient<Dev | null >, Prisma__DevClient<DevGetPayload<T> | null >>

    /**
     * Find zero or more Devs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Devs
     * const devs = await prisma.dev.findMany()
     * 
     * // Get first 10 Devs
     * const devs = await prisma.dev.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const devWithIdOnly = await prisma.dev.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DevFindManyArgs>(
      args?: SelectSubset<T, DevFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Dev>>, PrismaPromise<Array<DevGetPayload<T>>>>

    /**
     * Create a Dev.
     * @param {DevCreateArgs} args - Arguments to create a Dev.
     * @example
     * // Create one Dev
     * const Dev = await prisma.dev.create({
     *   data: {
     *     // ... data to create a Dev
     *   }
     * })
     * 
    **/
    create<T extends DevCreateArgs>(
      args: SelectSubset<T, DevCreateArgs>
    ): CheckSelect<T, Prisma__DevClient<Dev>, Prisma__DevClient<DevGetPayload<T>>>

    /**
     * Create many Devs.
     *     @param {DevCreateManyArgs} args - Arguments to create many Devs.
     *     @example
     *     // Create many Devs
     *     const dev = await prisma.dev.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DevCreateManyArgs>(
      args?: SelectSubset<T, DevCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Dev.
     * @param {DevDeleteArgs} args - Arguments to delete one Dev.
     * @example
     * // Delete one Dev
     * const Dev = await prisma.dev.delete({
     *   where: {
     *     // ... filter to delete one Dev
     *   }
     * })
     * 
    **/
    delete<T extends DevDeleteArgs>(
      args: SelectSubset<T, DevDeleteArgs>
    ): CheckSelect<T, Prisma__DevClient<Dev>, Prisma__DevClient<DevGetPayload<T>>>

    /**
     * Update one Dev.
     * @param {DevUpdateArgs} args - Arguments to update one Dev.
     * @example
     * // Update one Dev
     * const dev = await prisma.dev.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DevUpdateArgs>(
      args: SelectSubset<T, DevUpdateArgs>
    ): CheckSelect<T, Prisma__DevClient<Dev>, Prisma__DevClient<DevGetPayload<T>>>

    /**
     * Delete zero or more Devs.
     * @param {DevDeleteManyArgs} args - Arguments to filter Devs to delete.
     * @example
     * // Delete a few Devs
     * const { count } = await prisma.dev.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DevDeleteManyArgs>(
      args?: SelectSubset<T, DevDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Devs
     * const dev = await prisma.dev.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DevUpdateManyArgs>(
      args: SelectSubset<T, DevUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Dev.
     * @param {DevUpsertArgs} args - Arguments to update or create a Dev.
     * @example
     * // Update or create a Dev
     * const dev = await prisma.dev.upsert({
     *   create: {
     *     // ... data to create a Dev
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dev we want to update
     *   }
     * })
    **/
    upsert<T extends DevUpsertArgs>(
      args: SelectSubset<T, DevUpsertArgs>
    ): CheckSelect<T, Prisma__DevClient<Dev>, Prisma__DevClient<DevGetPayload<T>>>

    /**
     * Count the number of Devs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevCountArgs} args - Arguments to filter Devs to count.
     * @example
     * // Count the number of Devs
     * const count = await prisma.dev.count({
     *   where: {
     *     // ... the filter for the Devs we want to count
     *   }
     * })
    **/
    count<T extends DevCountArgs>(
      args?: Subset<T, DevCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DevCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dev.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DevAggregateArgs>(args: Subset<T, DevAggregateArgs>): PrismaPromise<GetDevAggregateType<T>>

    /**
     * Group by Dev.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DevGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DevGroupByArgs['orderBy'] }
        : { orderBy?: DevGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DevGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDevGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Dev.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DevClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Dev findUnique
   */
  export type DevFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Dev
     * 
    **/
    select?: DevSelect | null
    /**
     * Throw an Error if a Dev can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Dev to fetch.
     * 
    **/
    where: DevWhereUniqueInput
  }


  /**
   * Dev findFirst
   */
  export type DevFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Dev
     * 
    **/
    select?: DevSelect | null
    /**
     * Throw an Error if a Dev can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Dev to fetch.
     * 
    **/
    where?: DevWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devs to fetch.
     * 
    **/
    orderBy?: Enumerable<DevOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devs.
     * 
    **/
    cursor?: DevWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devs.
     * 
    **/
    distinct?: Enumerable<DevScalarFieldEnum>
  }


  /**
   * Dev findMany
   */
  export type DevFindManyArgs = {
    /**
     * Select specific fields to fetch from the Dev
     * 
    **/
    select?: DevSelect | null
    /**
     * Filter, which Devs to fetch.
     * 
    **/
    where?: DevWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devs to fetch.
     * 
    **/
    orderBy?: Enumerable<DevOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Devs.
     * 
    **/
    cursor?: DevWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devs.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DevScalarFieldEnum>
  }


  /**
   * Dev create
   */
  export type DevCreateArgs = {
    /**
     * Select specific fields to fetch from the Dev
     * 
    **/
    select?: DevSelect | null
    /**
     * The data needed to create a Dev.
     * 
    **/
    data: XOR<DevCreateInput, DevUncheckedCreateInput>
  }


  /**
   * Dev createMany
   */
  export type DevCreateManyArgs = {
    /**
     * The data used to create many Devs.
     * 
    **/
    data: Enumerable<DevCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Dev update
   */
  export type DevUpdateArgs = {
    /**
     * Select specific fields to fetch from the Dev
     * 
    **/
    select?: DevSelect | null
    /**
     * The data needed to update a Dev.
     * 
    **/
    data: XOR<DevUpdateInput, DevUncheckedUpdateInput>
    /**
     * Choose, which Dev to update.
     * 
    **/
    where: DevWhereUniqueInput
  }


  /**
   * Dev updateMany
   */
  export type DevUpdateManyArgs = {
    /**
     * The data used to update Devs.
     * 
    **/
    data: XOR<DevUpdateManyMutationInput, DevUncheckedUpdateManyInput>
    /**
     * Filter which Devs to update
     * 
    **/
    where?: DevWhereInput
  }


  /**
   * Dev upsert
   */
  export type DevUpsertArgs = {
    /**
     * Select specific fields to fetch from the Dev
     * 
    **/
    select?: DevSelect | null
    /**
     * The filter to search for the Dev to update in case it exists.
     * 
    **/
    where: DevWhereUniqueInput
    /**
     * In case the Dev found by the `where` argument doesn't exist, create a new Dev with this data.
     * 
    **/
    create: XOR<DevCreateInput, DevUncheckedCreateInput>
    /**
     * In case the Dev was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DevUpdateInput, DevUncheckedUpdateInput>
  }


  /**
   * Dev delete
   */
  export type DevDeleteArgs = {
    /**
     * Select specific fields to fetch from the Dev
     * 
    **/
    select?: DevSelect | null
    /**
     * Filter which Dev to delete.
     * 
    **/
    where: DevWhereUniqueInput
  }


  /**
   * Dev deleteMany
   */
  export type DevDeleteManyArgs = {
    /**
     * Filter which Devs to delete
     * 
    **/
    where?: DevWhereInput
  }


  /**
   * Dev without action
   */
  export type DevArgs = {
    /**
     * Select specific fields to fetch from the Dev
     * 
    **/
    select?: DevSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const InstructorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price'
  };

  export type InstructorScalarFieldEnum = (typeof InstructorScalarFieldEnum)[keyof typeof InstructorScalarFieldEnum]


  export const FileScalarFieldEnum: {
    id: 'id',
    name: 'name',
    date: 'date',
    fallaf_price: 'fallaf_price',
    dev_price: 'dev_price',
    instructorId: 'instructorId'
  };

  export type FileScalarFieldEnum = (typeof FileScalarFieldEnum)[keyof typeof FileScalarFieldEnum]


  export const InstructorHistoryScalarFieldEnum: {
    id: 'id',
    date: 'date',
    sum: 'sum',
    instructorId: 'instructorId'
  };

  export type InstructorHistoryScalarFieldEnum = (typeof InstructorHistoryScalarFieldEnum)[keyof typeof InstructorHistoryScalarFieldEnum]


  export const DevHistoryScalarFieldEnum: {
    id: 'id',
    date: 'date',
    sum: 'sum'
  };

  export type DevHistoryScalarFieldEnum = (typeof DevHistoryScalarFieldEnum)[keyof typeof DevHistoryScalarFieldEnum]


  export const DevScalarFieldEnum: {
    id: 'id',
    price: 'price'
  };

  export type DevScalarFieldEnum = (typeof DevScalarFieldEnum)[keyof typeof DevScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Deep Input Types
   */


  export type InstructorWhereInput = {
    AND?: Enumerable<InstructorWhereInput>
    OR?: Enumerable<InstructorWhereInput>
    NOT?: Enumerable<InstructorWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    price?: FloatFilter | number
    File?: FileListRelationFilter
    InstructorHistory?: InstructorHistoryListRelationFilter
  }

  export type InstructorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    File?: FileOrderByRelationAggregateInput
    InstructorHistory?: InstructorHistoryOrderByRelationAggregateInput
  }

  export type InstructorWhereUniqueInput = {
    id?: number
  }

  export type InstructorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    _count?: InstructorCountOrderByAggregateInput
    _avg?: InstructorAvgOrderByAggregateInput
    _max?: InstructorMaxOrderByAggregateInput
    _min?: InstructorMinOrderByAggregateInput
    _sum?: InstructorSumOrderByAggregateInput
  }

  export type InstructorScalarWhereWithAggregatesInput = {
    AND?: Enumerable<InstructorScalarWhereWithAggregatesInput>
    OR?: Enumerable<InstructorScalarWhereWithAggregatesInput>
    NOT?: Enumerable<InstructorScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    price?: FloatWithAggregatesFilter | number
  }

  export type FileWhereInput = {
    AND?: Enumerable<FileWhereInput>
    OR?: Enumerable<FileWhereInput>
    NOT?: Enumerable<FileWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    instructor?: XOR<InstructorRelationFilter, InstructorWhereInput>
    date?: DateTimeFilter | Date | string
    fallaf_price?: FloatFilter | number
    dev_price?: FloatFilter | number
    instructorId?: IntFilter | number
  }

  export type FileOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    instructor?: InstructorOrderByWithRelationInput
    date?: SortOrder
    fallaf_price?: SortOrder
    dev_price?: SortOrder
    instructorId?: SortOrder
  }

  export type FileWhereUniqueInput = {
    id?: number
  }

  export type FileOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    fallaf_price?: SortOrder
    dev_price?: SortOrder
    instructorId?: SortOrder
    _count?: FileCountOrderByAggregateInput
    _avg?: FileAvgOrderByAggregateInput
    _max?: FileMaxOrderByAggregateInput
    _min?: FileMinOrderByAggregateInput
    _sum?: FileSumOrderByAggregateInput
  }

  export type FileScalarWhereWithAggregatesInput = {
    AND?: Enumerable<FileScalarWhereWithAggregatesInput>
    OR?: Enumerable<FileScalarWhereWithAggregatesInput>
    NOT?: Enumerable<FileScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    date?: DateTimeWithAggregatesFilter | Date | string
    fallaf_price?: FloatWithAggregatesFilter | number
    dev_price?: FloatWithAggregatesFilter | number
    instructorId?: IntWithAggregatesFilter | number
  }

  export type InstructorHistoryWhereInput = {
    AND?: Enumerable<InstructorHistoryWhereInput>
    OR?: Enumerable<InstructorHistoryWhereInput>
    NOT?: Enumerable<InstructorHistoryWhereInput>
    id?: IntFilter | number
    instructor?: XOR<InstructorRelationFilter, InstructorWhereInput>
    date?: DateTimeFilter | Date | string
    sum?: FloatFilter | number
    instructorId?: IntFilter | number
  }

  export type InstructorHistoryOrderByWithRelationInput = {
    id?: SortOrder
    instructor?: InstructorOrderByWithRelationInput
    date?: SortOrder
    sum?: SortOrder
    instructorId?: SortOrder
  }

  export type InstructorHistoryWhereUniqueInput = {
    id?: number
  }

  export type InstructorHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    sum?: SortOrder
    instructorId?: SortOrder
    _count?: InstructorHistoryCountOrderByAggregateInput
    _avg?: InstructorHistoryAvgOrderByAggregateInput
    _max?: InstructorHistoryMaxOrderByAggregateInput
    _min?: InstructorHistoryMinOrderByAggregateInput
    _sum?: InstructorHistorySumOrderByAggregateInput
  }

  export type InstructorHistoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<InstructorHistoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<InstructorHistoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<InstructorHistoryScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    date?: DateTimeWithAggregatesFilter | Date | string
    sum?: FloatWithAggregatesFilter | number
    instructorId?: IntWithAggregatesFilter | number
  }

  export type DevHistoryWhereInput = {
    AND?: Enumerable<DevHistoryWhereInput>
    OR?: Enumerable<DevHistoryWhereInput>
    NOT?: Enumerable<DevHistoryWhereInput>
    id?: IntFilter | number
    date?: DateTimeFilter | Date | string
    sum?: FloatFilter | number
  }

  export type DevHistoryOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    sum?: SortOrder
  }

  export type DevHistoryWhereUniqueInput = {
    id?: number
  }

  export type DevHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    sum?: SortOrder
    _count?: DevHistoryCountOrderByAggregateInput
    _avg?: DevHistoryAvgOrderByAggregateInput
    _max?: DevHistoryMaxOrderByAggregateInput
    _min?: DevHistoryMinOrderByAggregateInput
    _sum?: DevHistorySumOrderByAggregateInput
  }

  export type DevHistoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DevHistoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<DevHistoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DevHistoryScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    date?: DateTimeWithAggregatesFilter | Date | string
    sum?: FloatWithAggregatesFilter | number
  }

  export type DevWhereInput = {
    AND?: Enumerable<DevWhereInput>
    OR?: Enumerable<DevWhereInput>
    NOT?: Enumerable<DevWhereInput>
    id?: IntFilter | number
    price?: FloatFilter | number
  }

  export type DevOrderByWithRelationInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type DevWhereUniqueInput = {
    id?: number
  }

  export type DevOrderByWithAggregationInput = {
    id?: SortOrder
    price?: SortOrder
    _count?: DevCountOrderByAggregateInput
    _avg?: DevAvgOrderByAggregateInput
    _max?: DevMaxOrderByAggregateInput
    _min?: DevMinOrderByAggregateInput
    _sum?: DevSumOrderByAggregateInput
  }

  export type DevScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DevScalarWhereWithAggregatesInput>
    OR?: Enumerable<DevScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DevScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    price?: FloatWithAggregatesFilter | number
  }

  export type InstructorCreateInput = {
    name: string
    price: number
    File?: FileCreateNestedManyWithoutInstructorInput
    InstructorHistory?: InstructorHistoryCreateNestedManyWithoutInstructorInput
  }

  export type InstructorUncheckedCreateInput = {
    id?: number
    name: string
    price: number
    File?: FileUncheckedCreateNestedManyWithoutInstructorInput
    InstructorHistory?: InstructorHistoryUncheckedCreateNestedManyWithoutInstructorInput
  }

  export type InstructorUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    File?: FileUpdateManyWithoutInstructorInput
    InstructorHistory?: InstructorHistoryUpdateManyWithoutInstructorInput
  }

  export type InstructorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    File?: FileUncheckedUpdateManyWithoutInstructorInput
    InstructorHistory?: InstructorHistoryUncheckedUpdateManyWithoutInstructorInput
  }

  export type InstructorCreateManyInput = {
    id?: number
    name: string
    price: number
  }

  export type InstructorUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type InstructorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type FileCreateInput = {
    name: string
    instructor: InstructorCreateNestedOneWithoutFileInput
    date: Date | string
    fallaf_price: number
    dev_price: number
  }

  export type FileUncheckedCreateInput = {
    id?: number
    name: string
    date: Date | string
    fallaf_price: number
    dev_price: number
    instructorId: number
  }

  export type FileUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    instructor?: InstructorUpdateOneRequiredWithoutFileInput
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fallaf_price?: FloatFieldUpdateOperationsInput | number
    dev_price?: FloatFieldUpdateOperationsInput | number
  }

  export type FileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fallaf_price?: FloatFieldUpdateOperationsInput | number
    dev_price?: FloatFieldUpdateOperationsInput | number
    instructorId?: IntFieldUpdateOperationsInput | number
  }

  export type FileCreateManyInput = {
    id?: number
    name: string
    date: Date | string
    fallaf_price: number
    dev_price: number
    instructorId: number
  }

  export type FileUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fallaf_price?: FloatFieldUpdateOperationsInput | number
    dev_price?: FloatFieldUpdateOperationsInput | number
  }

  export type FileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fallaf_price?: FloatFieldUpdateOperationsInput | number
    dev_price?: FloatFieldUpdateOperationsInput | number
    instructorId?: IntFieldUpdateOperationsInput | number
  }

  export type InstructorHistoryCreateInput = {
    instructor: InstructorCreateNestedOneWithoutInstructorHistoryInput
    date: Date | string
    sum: number
  }

  export type InstructorHistoryUncheckedCreateInput = {
    id?: number
    date: Date | string
    sum: number
    instructorId: number
  }

  export type InstructorHistoryUpdateInput = {
    instructor?: InstructorUpdateOneRequiredWithoutInstructorHistoryInput
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sum?: FloatFieldUpdateOperationsInput | number
  }

  export type InstructorHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sum?: FloatFieldUpdateOperationsInput | number
    instructorId?: IntFieldUpdateOperationsInput | number
  }

  export type InstructorHistoryCreateManyInput = {
    id?: number
    date: Date | string
    sum: number
    instructorId: number
  }

  export type InstructorHistoryUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sum?: FloatFieldUpdateOperationsInput | number
  }

  export type InstructorHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sum?: FloatFieldUpdateOperationsInput | number
    instructorId?: IntFieldUpdateOperationsInput | number
  }

  export type DevHistoryCreateInput = {
    date: Date | string
    sum: number
  }

  export type DevHistoryUncheckedCreateInput = {
    id?: number
    date: Date | string
    sum: number
  }

  export type DevHistoryUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sum?: FloatFieldUpdateOperationsInput | number
  }

  export type DevHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sum?: FloatFieldUpdateOperationsInput | number
  }

  export type DevHistoryCreateManyInput = {
    id?: number
    date: Date | string
    sum: number
  }

  export type DevHistoryUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sum?: FloatFieldUpdateOperationsInput | number
  }

  export type DevHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sum?: FloatFieldUpdateOperationsInput | number
  }

  export type DevCreateInput = {
    price: number
  }

  export type DevUncheckedCreateInput = {
    id?: number
    price: number
  }

  export type DevUpdateInput = {
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type DevUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type DevCreateManyInput = {
    id?: number
    price: number
  }

  export type DevUpdateManyMutationInput = {
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type DevUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type FloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type FileListRelationFilter = {
    every?: FileWhereInput
    some?: FileWhereInput
    none?: FileWhereInput
  }

  export type InstructorHistoryListRelationFilter = {
    every?: InstructorHistoryWhereInput
    some?: InstructorHistoryWhereInput
    none?: InstructorHistoryWhereInput
  }

  export type FileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InstructorHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InstructorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
  }

  export type InstructorAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type InstructorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
  }

  export type InstructorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
  }

  export type InstructorSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type FloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type InstructorRelationFilter = {
    is?: InstructorWhereInput
    isNot?: InstructorWhereInput
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type FileCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    fallaf_price?: SortOrder
    dev_price?: SortOrder
    instructorId?: SortOrder
  }

  export type FileAvgOrderByAggregateInput = {
    id?: SortOrder
    fallaf_price?: SortOrder
    dev_price?: SortOrder
    instructorId?: SortOrder
  }

  export type FileMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    fallaf_price?: SortOrder
    dev_price?: SortOrder
    instructorId?: SortOrder
  }

  export type FileMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    fallaf_price?: SortOrder
    dev_price?: SortOrder
    instructorId?: SortOrder
  }

  export type FileSumOrderByAggregateInput = {
    id?: SortOrder
    fallaf_price?: SortOrder
    dev_price?: SortOrder
    instructorId?: SortOrder
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type InstructorHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    sum?: SortOrder
    instructorId?: SortOrder
  }

  export type InstructorHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    sum?: SortOrder
    instructorId?: SortOrder
  }

  export type InstructorHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    sum?: SortOrder
    instructorId?: SortOrder
  }

  export type InstructorHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    sum?: SortOrder
    instructorId?: SortOrder
  }

  export type InstructorHistorySumOrderByAggregateInput = {
    id?: SortOrder
    sum?: SortOrder
    instructorId?: SortOrder
  }

  export type DevHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    sum?: SortOrder
  }

  export type DevHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    sum?: SortOrder
  }

  export type DevHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    sum?: SortOrder
  }

  export type DevHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    sum?: SortOrder
  }

  export type DevHistorySumOrderByAggregateInput = {
    id?: SortOrder
    sum?: SortOrder
  }

  export type DevCountOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type DevAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type DevMaxOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type DevMinOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type DevSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type FileCreateNestedManyWithoutInstructorInput = {
    create?: XOR<Enumerable<FileCreateWithoutInstructorInput>, Enumerable<FileUncheckedCreateWithoutInstructorInput>>
    connectOrCreate?: Enumerable<FileCreateOrConnectWithoutInstructorInput>
    createMany?: FileCreateManyInstructorInputEnvelope
    connect?: Enumerable<FileWhereUniqueInput>
  }

  export type InstructorHistoryCreateNestedManyWithoutInstructorInput = {
    create?: XOR<Enumerable<InstructorHistoryCreateWithoutInstructorInput>, Enumerable<InstructorHistoryUncheckedCreateWithoutInstructorInput>>
    connectOrCreate?: Enumerable<InstructorHistoryCreateOrConnectWithoutInstructorInput>
    createMany?: InstructorHistoryCreateManyInstructorInputEnvelope
    connect?: Enumerable<InstructorHistoryWhereUniqueInput>
  }

  export type FileUncheckedCreateNestedManyWithoutInstructorInput = {
    create?: XOR<Enumerable<FileCreateWithoutInstructorInput>, Enumerable<FileUncheckedCreateWithoutInstructorInput>>
    connectOrCreate?: Enumerable<FileCreateOrConnectWithoutInstructorInput>
    createMany?: FileCreateManyInstructorInputEnvelope
    connect?: Enumerable<FileWhereUniqueInput>
  }

  export type InstructorHistoryUncheckedCreateNestedManyWithoutInstructorInput = {
    create?: XOR<Enumerable<InstructorHistoryCreateWithoutInstructorInput>, Enumerable<InstructorHistoryUncheckedCreateWithoutInstructorInput>>
    connectOrCreate?: Enumerable<InstructorHistoryCreateOrConnectWithoutInstructorInput>
    createMany?: InstructorHistoryCreateManyInstructorInputEnvelope
    connect?: Enumerable<InstructorHistoryWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FileUpdateManyWithoutInstructorInput = {
    create?: XOR<Enumerable<FileCreateWithoutInstructorInput>, Enumerable<FileUncheckedCreateWithoutInstructorInput>>
    connectOrCreate?: Enumerable<FileCreateOrConnectWithoutInstructorInput>
    upsert?: Enumerable<FileUpsertWithWhereUniqueWithoutInstructorInput>
    createMany?: FileCreateManyInstructorInputEnvelope
    set?: Enumerable<FileWhereUniqueInput>
    disconnect?: Enumerable<FileWhereUniqueInput>
    delete?: Enumerable<FileWhereUniqueInput>
    connect?: Enumerable<FileWhereUniqueInput>
    update?: Enumerable<FileUpdateWithWhereUniqueWithoutInstructorInput>
    updateMany?: Enumerable<FileUpdateManyWithWhereWithoutInstructorInput>
    deleteMany?: Enumerable<FileScalarWhereInput>
  }

  export type InstructorHistoryUpdateManyWithoutInstructorInput = {
    create?: XOR<Enumerable<InstructorHistoryCreateWithoutInstructorInput>, Enumerable<InstructorHistoryUncheckedCreateWithoutInstructorInput>>
    connectOrCreate?: Enumerable<InstructorHistoryCreateOrConnectWithoutInstructorInput>
    upsert?: Enumerable<InstructorHistoryUpsertWithWhereUniqueWithoutInstructorInput>
    createMany?: InstructorHistoryCreateManyInstructorInputEnvelope
    set?: Enumerable<InstructorHistoryWhereUniqueInput>
    disconnect?: Enumerable<InstructorHistoryWhereUniqueInput>
    delete?: Enumerable<InstructorHistoryWhereUniqueInput>
    connect?: Enumerable<InstructorHistoryWhereUniqueInput>
    update?: Enumerable<InstructorHistoryUpdateWithWhereUniqueWithoutInstructorInput>
    updateMany?: Enumerable<InstructorHistoryUpdateManyWithWhereWithoutInstructorInput>
    deleteMany?: Enumerable<InstructorHistoryScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FileUncheckedUpdateManyWithoutInstructorInput = {
    create?: XOR<Enumerable<FileCreateWithoutInstructorInput>, Enumerable<FileUncheckedCreateWithoutInstructorInput>>
    connectOrCreate?: Enumerable<FileCreateOrConnectWithoutInstructorInput>
    upsert?: Enumerable<FileUpsertWithWhereUniqueWithoutInstructorInput>
    createMany?: FileCreateManyInstructorInputEnvelope
    set?: Enumerable<FileWhereUniqueInput>
    disconnect?: Enumerable<FileWhereUniqueInput>
    delete?: Enumerable<FileWhereUniqueInput>
    connect?: Enumerable<FileWhereUniqueInput>
    update?: Enumerable<FileUpdateWithWhereUniqueWithoutInstructorInput>
    updateMany?: Enumerable<FileUpdateManyWithWhereWithoutInstructorInput>
    deleteMany?: Enumerable<FileScalarWhereInput>
  }

  export type InstructorHistoryUncheckedUpdateManyWithoutInstructorInput = {
    create?: XOR<Enumerable<InstructorHistoryCreateWithoutInstructorInput>, Enumerable<InstructorHistoryUncheckedCreateWithoutInstructorInput>>
    connectOrCreate?: Enumerable<InstructorHistoryCreateOrConnectWithoutInstructorInput>
    upsert?: Enumerable<InstructorHistoryUpsertWithWhereUniqueWithoutInstructorInput>
    createMany?: InstructorHistoryCreateManyInstructorInputEnvelope
    set?: Enumerable<InstructorHistoryWhereUniqueInput>
    disconnect?: Enumerable<InstructorHistoryWhereUniqueInput>
    delete?: Enumerable<InstructorHistoryWhereUniqueInput>
    connect?: Enumerable<InstructorHistoryWhereUniqueInput>
    update?: Enumerable<InstructorHistoryUpdateWithWhereUniqueWithoutInstructorInput>
    updateMany?: Enumerable<InstructorHistoryUpdateManyWithWhereWithoutInstructorInput>
    deleteMany?: Enumerable<InstructorHistoryScalarWhereInput>
  }

  export type InstructorCreateNestedOneWithoutFileInput = {
    create?: XOR<InstructorCreateWithoutFileInput, InstructorUncheckedCreateWithoutFileInput>
    connectOrCreate?: InstructorCreateOrConnectWithoutFileInput
    connect?: InstructorWhereUniqueInput
  }

  export type InstructorUpdateOneRequiredWithoutFileInput = {
    create?: XOR<InstructorCreateWithoutFileInput, InstructorUncheckedCreateWithoutFileInput>
    connectOrCreate?: InstructorCreateOrConnectWithoutFileInput
    upsert?: InstructorUpsertWithoutFileInput
    connect?: InstructorWhereUniqueInput
    update?: XOR<InstructorUpdateWithoutFileInput, InstructorUncheckedUpdateWithoutFileInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type InstructorCreateNestedOneWithoutInstructorHistoryInput = {
    create?: XOR<InstructorCreateWithoutInstructorHistoryInput, InstructorUncheckedCreateWithoutInstructorHistoryInput>
    connectOrCreate?: InstructorCreateOrConnectWithoutInstructorHistoryInput
    connect?: InstructorWhereUniqueInput
  }

  export type InstructorUpdateOneRequiredWithoutInstructorHistoryInput = {
    create?: XOR<InstructorCreateWithoutInstructorHistoryInput, InstructorUncheckedCreateWithoutInstructorHistoryInput>
    connectOrCreate?: InstructorCreateOrConnectWithoutInstructorHistoryInput
    upsert?: InstructorUpsertWithoutInstructorHistoryInput
    connect?: InstructorWhereUniqueInput
    update?: XOR<InstructorUpdateWithoutInstructorHistoryInput, InstructorUncheckedUpdateWithoutInstructorHistoryInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedFloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type FileCreateWithoutInstructorInput = {
    name: string
    date: Date | string
    fallaf_price: number
    dev_price: number
  }

  export type FileUncheckedCreateWithoutInstructorInput = {
    id?: number
    name: string
    date: Date | string
    fallaf_price: number
    dev_price: number
  }

  export type FileCreateOrConnectWithoutInstructorInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutInstructorInput, FileUncheckedCreateWithoutInstructorInput>
  }

  export type FileCreateManyInstructorInputEnvelope = {
    data: Enumerable<FileCreateManyInstructorInput>
    skipDuplicates?: boolean
  }

  export type InstructorHistoryCreateWithoutInstructorInput = {
    date: Date | string
    sum: number
  }

  export type InstructorHistoryUncheckedCreateWithoutInstructorInput = {
    id?: number
    date: Date | string
    sum: number
  }

  export type InstructorHistoryCreateOrConnectWithoutInstructorInput = {
    where: InstructorHistoryWhereUniqueInput
    create: XOR<InstructorHistoryCreateWithoutInstructorInput, InstructorHistoryUncheckedCreateWithoutInstructorInput>
  }

  export type InstructorHistoryCreateManyInstructorInputEnvelope = {
    data: Enumerable<InstructorHistoryCreateManyInstructorInput>
    skipDuplicates?: boolean
  }

  export type FileUpsertWithWhereUniqueWithoutInstructorInput = {
    where: FileWhereUniqueInput
    update: XOR<FileUpdateWithoutInstructorInput, FileUncheckedUpdateWithoutInstructorInput>
    create: XOR<FileCreateWithoutInstructorInput, FileUncheckedCreateWithoutInstructorInput>
  }

  export type FileUpdateWithWhereUniqueWithoutInstructorInput = {
    where: FileWhereUniqueInput
    data: XOR<FileUpdateWithoutInstructorInput, FileUncheckedUpdateWithoutInstructorInput>
  }

  export type FileUpdateManyWithWhereWithoutInstructorInput = {
    where: FileScalarWhereInput
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyWithoutFileInput>
  }

  export type FileScalarWhereInput = {
    AND?: Enumerable<FileScalarWhereInput>
    OR?: Enumerable<FileScalarWhereInput>
    NOT?: Enumerable<FileScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    date?: DateTimeFilter | Date | string
    fallaf_price?: FloatFilter | number
    dev_price?: FloatFilter | number
    instructorId?: IntFilter | number
  }

  export type InstructorHistoryUpsertWithWhereUniqueWithoutInstructorInput = {
    where: InstructorHistoryWhereUniqueInput
    update: XOR<InstructorHistoryUpdateWithoutInstructorInput, InstructorHistoryUncheckedUpdateWithoutInstructorInput>
    create: XOR<InstructorHistoryCreateWithoutInstructorInput, InstructorHistoryUncheckedCreateWithoutInstructorInput>
  }

  export type InstructorHistoryUpdateWithWhereUniqueWithoutInstructorInput = {
    where: InstructorHistoryWhereUniqueInput
    data: XOR<InstructorHistoryUpdateWithoutInstructorInput, InstructorHistoryUncheckedUpdateWithoutInstructorInput>
  }

  export type InstructorHistoryUpdateManyWithWhereWithoutInstructorInput = {
    where: InstructorHistoryScalarWhereInput
    data: XOR<InstructorHistoryUpdateManyMutationInput, InstructorHistoryUncheckedUpdateManyWithoutInstructorHistoryInput>
  }

  export type InstructorHistoryScalarWhereInput = {
    AND?: Enumerable<InstructorHistoryScalarWhereInput>
    OR?: Enumerable<InstructorHistoryScalarWhereInput>
    NOT?: Enumerable<InstructorHistoryScalarWhereInput>
    id?: IntFilter | number
    date?: DateTimeFilter | Date | string
    sum?: FloatFilter | number
    instructorId?: IntFilter | number
  }

  export type InstructorCreateWithoutFileInput = {
    name: string
    price: number
    InstructorHistory?: InstructorHistoryCreateNestedManyWithoutInstructorInput
  }

  export type InstructorUncheckedCreateWithoutFileInput = {
    id?: number
    name: string
    price: number
    InstructorHistory?: InstructorHistoryUncheckedCreateNestedManyWithoutInstructorInput
  }

  export type InstructorCreateOrConnectWithoutFileInput = {
    where: InstructorWhereUniqueInput
    create: XOR<InstructorCreateWithoutFileInput, InstructorUncheckedCreateWithoutFileInput>
  }

  export type InstructorUpsertWithoutFileInput = {
    update: XOR<InstructorUpdateWithoutFileInput, InstructorUncheckedUpdateWithoutFileInput>
    create: XOR<InstructorCreateWithoutFileInput, InstructorUncheckedCreateWithoutFileInput>
  }

  export type InstructorUpdateWithoutFileInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    InstructorHistory?: InstructorHistoryUpdateManyWithoutInstructorInput
  }

  export type InstructorUncheckedUpdateWithoutFileInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    InstructorHistory?: InstructorHistoryUncheckedUpdateManyWithoutInstructorInput
  }

  export type InstructorCreateWithoutInstructorHistoryInput = {
    name: string
    price: number
    File?: FileCreateNestedManyWithoutInstructorInput
  }

  export type InstructorUncheckedCreateWithoutInstructorHistoryInput = {
    id?: number
    name: string
    price: number
    File?: FileUncheckedCreateNestedManyWithoutInstructorInput
  }

  export type InstructorCreateOrConnectWithoutInstructorHistoryInput = {
    where: InstructorWhereUniqueInput
    create: XOR<InstructorCreateWithoutInstructorHistoryInput, InstructorUncheckedCreateWithoutInstructorHistoryInput>
  }

  export type InstructorUpsertWithoutInstructorHistoryInput = {
    update: XOR<InstructorUpdateWithoutInstructorHistoryInput, InstructorUncheckedUpdateWithoutInstructorHistoryInput>
    create: XOR<InstructorCreateWithoutInstructorHistoryInput, InstructorUncheckedCreateWithoutInstructorHistoryInput>
  }

  export type InstructorUpdateWithoutInstructorHistoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    File?: FileUpdateManyWithoutInstructorInput
  }

  export type InstructorUncheckedUpdateWithoutInstructorHistoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    File?: FileUncheckedUpdateManyWithoutInstructorInput
  }

  export type FileCreateManyInstructorInput = {
    id?: number
    name: string
    date: Date | string
    fallaf_price: number
    dev_price: number
  }

  export type InstructorHistoryCreateManyInstructorInput = {
    id?: number
    date: Date | string
    sum: number
  }

  export type FileUpdateWithoutInstructorInput = {
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fallaf_price?: FloatFieldUpdateOperationsInput | number
    dev_price?: FloatFieldUpdateOperationsInput | number
  }

  export type FileUncheckedUpdateWithoutInstructorInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fallaf_price?: FloatFieldUpdateOperationsInput | number
    dev_price?: FloatFieldUpdateOperationsInput | number
  }

  export type FileUncheckedUpdateManyWithoutFileInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fallaf_price?: FloatFieldUpdateOperationsInput | number
    dev_price?: FloatFieldUpdateOperationsInput | number
  }

  export type InstructorHistoryUpdateWithoutInstructorInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sum?: FloatFieldUpdateOperationsInput | number
  }

  export type InstructorHistoryUncheckedUpdateWithoutInstructorInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sum?: FloatFieldUpdateOperationsInput | number
  }

  export type InstructorHistoryUncheckedUpdateManyWithoutInstructorHistoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sum?: FloatFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}