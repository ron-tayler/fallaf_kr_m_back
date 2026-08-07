# Структура проекта FallaF KR M Backend

Подробное описание структуры проекта, организации файлов и директорий.

## Общая структура

```
fallaf_kr_m_back/
├── docs/                    # Документация проекта
│   ├── api/                 # API документация
│   ├── architecture/        # Архитектурные документы
│   ├── deployment/          # Документация по развёртыванию
│   ├── structure/           # Описание структуры проекта
│   └── README.md            # Главная страница документации
├── src/                     # Исходный код приложения
│   ├── Controller/          # REST API контроллеры
│   │   ├── API/            # Защищённые endpoints
│   │   └── PublicApi/      # Публичные endpoints
│   ├── Middleware/          # Express middleware
│   ├── lib/                 # Вспомогательные библиотеки
│   ├── io_ts/               # Схемы валидации (io-ts)
│   ├── container.ts         # DI контейнер (Inversify)
│   └── main.ts              # Точка входа приложения
├── prisma/                  # Prisma ORM
│   ├── schema.prisma        # Схема базы данных
│   ├── seed.ts              # Сидеры для БД
│   └── generated/           # Сгенерированный Prisma Client
├── front/                   # Статические файлы фронтенда
│   ├── assets/              # Ресурсы (CSS, JS, шрифты, изображения)
│   └── index.html           # Главная HTML страница
├── dist/                    # Скомпилированный JavaScript (генерируется)
├── .github/                 # GitHub Actions workflows
├── .dockerignore            # Исключения для Docker
├── .gitignore               # Исключения для Git
├── .gitlab-ci.yml           # GitLab CI/CD конфигурация
├── Dockerfile               # Docker образ
├── package.json             # Зависимости и скрипты
├── tsconfig.json            # TypeScript конфигурация
└── README.md                # Основной README проекта
```

---

## Детальное описание директорий

### `/docs` - Документация

Структурированная документация проекта:

- **`api/`** - Документация всех API endpoints
- **`architecture/`** - Архитектурные отчёты и диаграммы
- **`deployment/`** - Руководства по установке и развёртыванию
- **`structure/`** - Описание структуры проекта (этот документ)
- **`README.md`** - Главная страница с навигацией

### `/src` - Исходный код

Основной код приложения на TypeScript.

#### `/src/Controller` - Контроллеры

REST API контроллеры, организованные по уровням доступа:

**`/API`** - Защищённые endpoints (требуют авторизации):
- `User.ts` - Управление пользователями
- `Money.ts` - Финансовые операции
- `FreeKassa.ts` - Платежи через FreeKassa (защищённые)

**`/PublicApi`** - Публичные endpoints:
- `FreeKassa.ts` - Webhook для FreeKassa (публичный)

**Паттерн**: Использование декораторов Inversify для регистрации маршрутов:
```typescript
@controller("/api/user")
export class Controller_API_User {
  @httpGet("/is_auth")
  // ...
}
```

#### `/src/Middleware` - Middleware

Express middleware для обработки запросов:

- `IsSignIn.ts` - Проверка аутентификации пользователя

**Паттерн**: Наследование от `BaseMiddleware` из Inversify.

#### `/src/lib` - Библиотеки

Вспомогательные библиотеки и утилиты:

- `FreeKassa.ts` - Интеграция с платёжной системой FreeKassa
  - Генерация подписей
  - Создание URL для оплаты
  - Валидация платежей

#### `/src/io_ts` - Валидация

Схемы валидации входных данных через io-ts:

- `UserRole.ts` - Валидация ролей пользователей

**Паттерн**: Runtime type validation с использованием io-ts и fp-ts.

#### `/src/container.ts` - DI Container

Конфигурация Dependency Injection контейнера (Inversify):

- Регистрация зависимостей (Prisma, SessionStore, FreeKassa)
- Биндинг middleware
- Автоматическая загрузка контроллеров

#### `/src/main.ts` - Точка входа

Инициализация приложения:

- Настройка Express сервера
- Конфигурация middleware (сессии, body parser)
- Статическая раздача фронтенда
- Обработка маршрутов

---

### `/prisma` - База данных

Prisma ORM конфигурация и схемы:

#### `/prisma/schema.prisma`

Схема базы данных с определением всех моделей:
- User, UserInvate, Session
- Instructor, InstructorHistory
- File, Dev, DevHistory

#### `/prisma/seed.ts`

Скрипт для заполнения базы данных начальными данными.

#### `/prisma/generated/`

Автоматически сгенерированный Prisma Client (не редактируется вручную).

---

### `/front` - Фронтенд

Статические файлы фронтенда:

- `index.html` - Главная HTML страница
- `assets/` - Ресурсы:
  - `css/` - Стили
  - `js/` - JavaScript
  - `img/` - Изображения
  - `ttf/`, `woff/`, `woff2/`, `eot/` - Шрифты

**Примечание**: Express раздаёт эти файлы статически через `express.static()`.

---

### `/dist` - Скомпилированный код

Директория для скомпилированного JavaScript (генерируется при `npm run build`).

**В `.gitignore`**: Не коммитится в репозиторий.

---

## Конфигурационные файлы

### `package.json`

- Зависимости проекта
- NPM скрипты для сборки, запуска, работы с Prisma
- Метаданные проекта

**Основные скрипты**:
- `start:ts` - Запуск в режиме разработки (ts-node)
- `start:js` - Запуск скомпилированного кода
- `build` - Сборка проекта
- `prisma:gen` - Генерация Prisma Client
- `prisma:push` - Применение схемы к БД

### `tsconfig.json`

TypeScript конфигурация:
- Target: ESNext
- Module: CommonJS
- Experimental Decorators: включены (для Inversify)
- Path aliases: `@/*` → `./src/*`

### `Dockerfile`

Docker образ для контейнеризации:
- Базовый образ: Node.js 20.8.0
- Установка зависимостей
- Генерация Prisma Client
- Компиляция TypeScript
- Запуск приложения

### `.gitlab-ci.yml`

GitLab CI/CD конфигурация:
- **Stage: build** - Сборка Docker образа при создании тега
- **Stage: deploy-prod** - Ручное развёртывание через Portainer webhook

### `.dockerignore`

Файлы и директории, исключаемые из Docker образа:
- `node_modules`
- `.git`
- `dist` (пересобирается в контейнере)

---

## Организация кода

### Модульность

Проект использует модульную структуру:
- Каждый контроллер в отдельном файле
- Middleware выделены в отдельную директорию
- Библиотеки изолированы

### Dependency Injection

Все зависимости регистрируются в `container.ts`:
- Singleton для Prisma Client
- Singleton для Session Store
- Singleton для FreeKassa
- Middleware через строковые идентификаторы

### Импорты

Использование path aliases через `module-alias`:
```typescript
import {Something} from "@/lib/Something"
// Эквивалентно: import {Something} from "./lib/Something"
```

---

## Соглашения об именовании

### Файлы
- **Контроллеры**: `PascalCase.ts` (например, `User.ts`)
- **Middleware**: `PascalCase.ts` (например, `IsSignIn.ts`)
- **Библиотеки**: `PascalCase.ts` (например, `FreeKassa.ts`)
- **Конфигурация**: `camelCase.json` или `kebab-case.yml`

### Классы
- **Контроллеры**: `Controller_API_*` или `Controller_PublicAPI_*`
- **Middleware**: `PascalCase` (например, `IsSignIn`)
- **Библиотеки**: `PascalCase` (например, `FreeKassa`)

### Директории
- **PascalCase** для директорий с кодом (`Controller`, `Middleware`)
- **lowercase** для конфигурации и документации (`docs`, `prisma`)

---

## Расширение структуры

### Добавление нового контроллера

1. Создайте файл в `src/Controller/API/` или `src/Controller/PublicApi/`
2. Используйте декораторы Inversify:
   ```typescript
   @controller("/api/path")
   export class Controller_API_New {
     // ...
   }
   ```
3. Импортируйте файл в `src/container.ts`:
   ```typescript
   import "@/Controller/API/New";
   ```

### Добавление нового middleware

1. Создайте файл в `src/Middleware/`
2. Наследуйтесь от `BaseMiddleware`:
   ```typescript
   export class NewMiddleware extends BaseMiddleware {
     // ...
   }
   ```
3. Зарегистрируйте в `container.ts`:
   ```typescript
   container.bind<BaseMiddleware>("NewMiddleware").to(NewMiddleware);
   ```

### Добавление новой библиотеки

1. Создайте файл в `src/lib/`
2. Экспортируйте класс или функции
3. Зарегистрируйте в `container.ts` при необходимости

---

## Зависимости между компонентами

```
main.ts
  └─► container.ts
        ├─► PrismaClient
        ├─► SessionStore
        ├─► FreeKassa
        └─► Controllers (автоматическая загрузка)
              ├─► Controller_API_User
              │     └─► PrismaClient, IsSignIn
              ├─► Controller_API_Money
              │     └─► PrismaClient
              └─► Controller_API_FreeKassa
                    └─► PrismaClient, FreeKassa
```

---

## Рекомендации по организации

### ✅ Хорошие практики

1. **Разделение по уровням доступа**: API и PublicApi
2. **Использование DI**: Все зависимости через контейнер
3. **Валидация данных**: io-ts для всех входных данных
4. **Типизация**: TypeScript для типобезопасности
5. **Модульность**: Каждый компонент в отдельном файле

### ⚠️ Области для улучшения

1. **Слой Service**: Бизнес-логика сейчас в контроллерах
2. **Слой Repository**: Прямой доступ к Prisma из контроллеров
3. **Обработка ошибок**: Нет централизованного error handler
4. **Логирование**: Минимальное логирование (только console.log)
5. **Тестирование**: Отсутствуют тесты

Подробнее см. [Архитектурный отчёт](./architecture/ARCHITECTURE_REPORT.md).

---

**Последнее обновление**: 2024  
**Версия документации**: 1.0.0
