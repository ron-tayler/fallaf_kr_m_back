# AGENTS.md - Руководство для AI-агентов

Инструкции для AI-агентов, работающих с кодовой базой FallaF KR M Backend.

## Обзор проекта

Backend на Node.js/TypeScript для управления финансовыми операциями.

**Стек:** Node.js 20.8.0, TypeScript 4.5.3, Express.js 4.18.2, Inversify (DI), Prisma 3.12.0, MySQL, io-ts + fp-ts

## Команды

```bash
# Разработка
npm run start:ts          # Запуск через ts-node

# Продакшн
npm run build             # Очистка + компиляция
npm run start:prod        # Запуск скомпилированного кода

# Проверка типов
npx tsc --noEmit

# База данных (Prisma)
npm run prisma:gen        # Генерация Prisma Client
npm run prisma:push       # Применение схемы к БД
npm run prisma:migrate    # Миграции (production)
npx prisma studio         # Визуальный редактор БД
```

> **ВНИМАНИЕ:** Нет автоматических тестов и lint команд.

## Структура проекта

```
src/
├── main.ts              # Точка входа
├── container.ts         # DI контейнер (Inversify)
├── Controller/
│   ├── API/             # Защищённые endpoints
│   └── PublicApi/       # Публичные endpoints
├── Middleware/          # Express middleware
├── lib/                 # Вспомогательные библиотеки
└── io_ts/               # Схемы валидации

prisma/
├── schema.prisma        # Схема БД
└── generated/           # Сгенерированный клиент (НЕ редактировать!)
```

## Стиль кода

### Импорты
```typescript
// 1. Внешние зависимости
import {controller, httpGet, httpPost, request, response} from "inversify-express-utils"
import {inject} from "inversify"
import * as io_ts from "io-ts"
import {isLeft} from "fp-ts/lib/Either"

// 2. Prisma
import {PrismaClient, UserStatus} from "@/../prisma/generated/client"

// 3. Внутренние модули через path alias @/*
import {typeUserRole} from "@/io_ts/UserRole"
```

**Path Aliases:** `@/*` -> `./src/*`, `@/../prisma/generated/client` - Prisma Client

### Форматирование
- **Отступы:** 4 пробела
- **Кавычки:** Двойные `"строка"`
- **Точка с запятой:** НЕ используется
- **Стрелочные функции:** `()=>{}` без пробелов вокруг `=>`
- **Скобки:** без пробела перед `(` в вызовах

```typescript
// Правильно
.then(()=>this.json({status: true}))
if(isLeft(data)) return res.status(400).json(data.left)

// Неправильно
.then(() => this.json({ status: true }));
```

### Именование
| Категория | Стиль | Пример |
|-----------|-------|--------|
| Классы контроллеров | `Controller_API_*` | `Controller_API_User` |
| Middleware/Библиотеки | PascalCase | `IsSignIn`, `FreeKassa` |
| Методы/переменные | camelCase | `checkAuth`, `userId` |
| Переменные сессии | snake_case | `user_id`, `user_role` |

## Паттерны кода

### Контроллер
```typescript
@controller("/api/example")
export class Controller_API_Example extends BaseHttpController {
    @inject<PrismaClient>("Prisma")
    private prisma!: PrismaClient

    @httpGet("/endpoint")
    methodName(@request() req: Request, @response() res: Response) {
        // Реализация
    }

    @httpGet("/protected", "IsSignIn")  // С middleware
    protectedMethod(@request() req: Request, @response() res: Response) {
        if(!["Admin", "Manager"].includes(req.session?.user_role ?? ""))
            return this.json("Forbidden", 403)
        // Логика
    }
}
```

**Регистрация:** добавить `import "@/Controller/API/Example"` в `src/container.ts`

### Валидация (io-ts)
```typescript
const data = io_ts.type({
    login: io_ts.string,
    password: io_ts.string
}).decode(req.body)

if(isLeft(data)) return res.status(400).json(data.left)
// или: if(data._tag == "Left") return res.status(400).json(data.left)

const validData = data.right
```

### Ответы
```typescript
return this.ok()                              // 200 OK
return this.json({status: true})              // 200 JSON
return res.status(400).end("error_message")   // 400 с текстом
return this.json("Forbidden", 403)            // 403
return this.internalServerError()             // 500

// Promise chains
return this.prisma.user.findUnique({...})
    .then(u=>u?u:Promise.reject())
    .then(()=>this.ok(), ()=>this.internalServerError())
```

### DI регистрация (container.ts)
```typescript
container.bind<PrismaClient>("Prisma").toConstantValue(prisma)
container.bind<BaseMiddleware>("IsSignIn").to(IsSignIn)
```

## Prisma

```typescript
const user = await this.prisma.user.findUnique({where: {id: userId}})
await this.prisma.user.create({data: {login, password, status: UserStatus.New}})
await this.prisma.user.update({where: {id}, data: {status: UserStatus.Active}})
```

После изменения `schema.prisma`:
```bash
npm run prisma:push && npm run prisma:gen
```

## Git-коммиты

Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`

## Важные замечания

1. **Нет ESLint/Prettier** - следуйте существующему стилю кода
2. **Нет тестов** - проверяйте изменения вручную
3. **Бизнес-логика в контроллерах** - нет Service/Repository слоёв
4. **TypeScript strict mode** включён
