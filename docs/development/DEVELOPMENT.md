# Руководство для разработчиков

Руководство по разработке, настройке окружения разработки и работе с кодом проекта FallaF KR M Backend.

## Содержание

1. [Настройка окружения разработки](#настройка-окружения-разработки)
2. [Запуск проекта в режиме разработки](#запуск-проекта-в-режиме-разработки)
3. [Работа с кодом](#работа-с-кодом)
4. [Работа с базой данных](#работа-с-базой-данных)
5. [Добавление новых функций](#добавление-новых-функций)
6. [Тестирование](#тестирование)
7. [Отладка](#отладка)
8. [Стиль кода](#стиль-кода)
9. [Git workflow](#git-workflow)
10. [Полезные команды](#полезные-команды)

---

## Настройка окружения разработки

### Требования

- **Node.js**: 20.8.0 или выше
- **npm**: Совместимая версия
- **MySQL**: 5.7 или выше
- **Git**: Для работы с репозиторием
- **IDE**: Рекомендуется VS Code с расширениями:
  - TypeScript
  - ESLint (если настроен)
  - Prisma

### Первоначальная настройка

1. **Клонирование репозитория**:
   ```bash
   git clone <repository-url>
   cd fallaf_kr_m_back
   ```

2. **Установка зависимостей**:
   ```bash
   npm install
   ```

3. **Настройка переменных окружения**:
   Создайте файл `.env` в корне проекта:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/fallaf_kr_m"
   SHADOW_DATABASE_URL="mysql://user:password@localhost:3306/fallaf_kr_m_shadow"
   SERVER_PORT="3000"
   SESSION_TOKEN="your-secret-session-token-min-32-chars"
   FREE_KASSA_MERCHANT_ID="your-merchant-id"
   FREE_KASSA_SECRET_1="your-secret-key-1"
   FREE_KASSA_SECRET_2="your-secret-key-2"
   ```

4. **Генерация Prisma Client**:
   ```bash
   npm run prisma:gen
   ```

5. **Применение схемы базы данных**:
   ```bash
   npm run prisma:push
   ```

6. **Заполнение тестовыми данными (опционально)**:
   ```bash
   npm run prisma:seed
   ```

Подробнее см. [Документацию по развёртыванию](./deployment/DEPLOYMENT.md).

---

## Запуск проекта в режиме разработки

### Запуск с hot-reload

```bash
npm run start:ts
```

Эта команда:
- Использует `ts-node` для прямого выполнения TypeScript
- Не требует предварительной компиляции
- Автоматически перезагружается при изменении файлов (если настроен nodemon)

### Запуск скомпилированной версии

```bash
npm run build
npm run start:js
```

### Проверка работоспособности

После запуска откройте в браузере:
- `http://localhost:3000` - Фронтенд
- `http://localhost:3000/api/user/is_auth` - Проверка API

---

## Работа с кодом

### Структура проекта

```
src/
├── Controller/      # REST API контроллеры
├── Middleware/      # Express middleware
├── lib/            # Вспомогательные библиотеки
├── io_ts/          # Схемы валидации
├── container.ts     # DI контейнер
└── main.ts         # Точка входа
```

Подробнее см. [Структуру проекта](./structure/PROJECT_STRUCTURE.md).

### Path Aliases

Проект использует path aliases через `module-alias`:
```typescript
import {Something} from "@/lib/Something"
// Эквивалентно: import {Something} from "./lib/Something"
```

Алиас `@/*` указывает на `./src/*` (настроено в `tsconfig.json`).

### Dependency Injection

Все зависимости регистрируются в `src/container.ts`:
```typescript
container.bind<PrismaClient>("Prisma").toConstantValue(prisma);
```

Использование в контроллерах:
```typescript
@inject("Prisma") private prisma: PrismaClient
```

### Создание контроллера

Пример создания нового контроллера:

```typescript
import {controller, httpGet, httpPost, request, response} from "inversify-express-utils";
import {Request, Response} from "express";
import {inject} from "inversify";
import {PrismaClient} from "@/../prisma/generated/client";

@controller("/api/example")
export class Controller_API_Example {
  constructor(
    @inject("Prisma") private prisma: PrismaClient
  ) {}

  @httpGet("/")
  public async getExample(@request() req: Request, @response() res: Response) {
    // Ваша логика
    res.json({message: "Example"});
  }
}
```

Не забудьте импортировать контроллер в `src/container.ts`:
```typescript
import "@/Controller/API/Example";
```

### Создание middleware

Пример создания middleware:

```typescript
import {BaseMiddleware} from "inversify-express-utils";
import {Request, Response, NextFunction} from "express";

export class ExampleMiddleware extends BaseMiddleware {
  public handler(req: Request, res: Response, next: NextFunction) {
    // Ваша логика
    next();
  }
}
```

Регистрация в `src/container.ts`:
```typescript
container.bind<BaseMiddleware>("ExampleMiddleware").to(ExampleMiddleware);
```

Использование в контроллере:
```typescript
@httpGet("/", "ExampleMiddleware")
```

### Валидация данных

Использование io-ts для валидации:

```typescript
import * as t from "io-ts";
import {isLeft} from "fp-ts/lib/Either";

const CreateUserSchema = t.type({
  login: t.string,
  password: t.string,
  role: t.string
});

@httpPost("/")
public async createUser(@request() req: Request, @response() res: Response) {
  const validation = CreateUserSchema.decode(req.body);
  
  if (isLeft(validation)) {
    return res.status(400).json(validation.left);
  }
  
  const data = validation.right;
  // Использование валидированных данных
}
```

---

## Работа с базой данных

### Prisma Schema

Схема базы данных находится в `prisma/schema.prisma`.

### Изменение схемы

1. Отредактируйте `prisma/schema.prisma`
2. Примените изменения:
   ```bash
   npm run prisma:push
   ```
3. Регенерируйте Prisma Client:
   ```bash
   npm run prisma:gen
   ```

### Использование Prisma Client

```typescript
import {PrismaClient} from "@/../prisma/generated/client";

// В контроллере через DI
@inject("Prisma") private prisma: PrismaClient

// Использование
const users = await this.prisma.user.findMany();
const user = await this.prisma.user.create({
  data: {
    login: "newuser",
    password: "hashed_password",
    status: "New"
  }
});
```

### Prisma Studio

Визуальный редактор базы данных:
```bash
npx prisma studio
```

Откроется веб-интерфейс на `http://localhost:5555`.

### Миграции

Для production используйте миграции:
```bash
npx prisma migrate dev --name migration_name
```

---

## Добавление новых функций

### Процесс разработки

1. **Создайте ветку**:
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Реализуйте функциональность**:
   - Создайте контроллеры/сервисы
   - Добавьте валидацию
   - Обновите схему БД (если нужно)

3. **Протестируйте**:
   - Проверьте работу вручную
   - Убедитесь, что нет ошибок компиляции

4. **Закоммитьте изменения**:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Создайте Pull Request**

### Добавление нового API endpoint

1. Создайте или обновите контроллер
2. Добавьте валидацию входных данных
3. Реализуйте бизнес-логику
4. Обновите документацию API

### Добавление новой модели БД

1. Обновите `prisma/schema.prisma`
2. Примените изменения: `npm run prisma:push`
3. Регенерируйте клиент: `npm run prisma:gen`
4. Обновите контроллеры для работы с новой моделью

---

## Тестирование

### Текущее состояние

⚠️ **В проекте отсутствуют автоматические тесты.**

### Рекомендации

1. **Unit тесты** для сервисов и библиотек
2. **Integration тесты** для API endpoints
3. **E2E тесты** для критических сценариев

### Настройка тестов (рекомендация)

```bash
npm install --save-dev jest @types/jest ts-jest
```

Создайте `jest.config.js`:
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
};
```

---

## Отладка

### VS Code Launch Configuration

Создайте `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug TypeScript",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "start:ts"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### Логирование

Текущее логирование минимальное (только `console.log`).

**Рекомендация**: Использовать структурированное логирование (Winston, Pino).

### Отладка Prisma

Включите логирование Prisma:
```typescript
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

---

## Стиль кода

### TypeScript

- Используйте строгий режим (`strict: true`)
- Всегда указывайте типы
- Используйте интерфейсы для объектов

### Именование

- **Классы**: `PascalCase` (например, `Controller_API_User`)
- **Функции/методы**: `camelCase` (например, `getUser`)
- **Константы**: `UPPER_SNAKE_CASE` (например, `MAX_RETRIES`)
- **Переменные**: `camelCase` (например, `userName`)

### Форматирование

Рекомендуется использовать:
- Prettier для форматирования
- ESLint для линтинга

### Комментарии

- Используйте JSDoc для документирования функций
- Комментируйте сложную бизнес-логику
- Избегайте очевидных комментариев

---

## Git workflow

### Ветки

- `main` / `master` - Production код
- `develop` - Разработка (если используется)
- `feature/*` - Новые функции
- `bugfix/*` - Исправления багов
- `hotfix/*` - Критические исправления

### Commit messages

Используйте conventional commits:
- `feat:` - Новая функция
- `fix:` - Исправление бага
- `docs:` - Изменения в документации
- `style:` - Форматирование кода
- `refactor:` - Рефакторинг
- `test:` - Тесты
- `chore:` - Обновление зависимостей, конфигурации

Пример:
```bash
git commit -m "feat: add user registration endpoint"
git commit -m "fix: correct password validation"
```

---

## Полезные команды

### Разработка

```bash
# Запуск в режиме разработки
npm run start:ts

# Сборка проекта
npm run build

# Запуск production версии
npm run start:prod
```

### База данных

```bash
# Генерация Prisma Client
npm run prisma:gen

# Применение схемы
npm run prisma:push

# Миграции
npm run prisma:migrate

# Заполнение тестовыми данными
npm run prisma:seed

# Prisma Studio
npx prisma studio
```

### Отладка

```bash
# Проверка TypeScript
npx tsc --noEmit

# Просмотр зависимостей
npm list --depth=0

# Очистка и переустановка
rm -rf node_modules package-lock.json
npm install
```

### Git

```bash
# Просмотр изменений
git status
git diff

# Создание ветки
git checkout -b feature/new-feature

# Коммит
git add .
git commit -m "feat: description"

# Push
git push origin feature/new-feature
```

---

## Полезные ссылки

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Inversify Documentation](https://inversify.io/)
- [io-ts Documentation](https://github.com/gcanti/io-ts)

---

## Поддержка

При возникновении вопросов:
1. Проверьте документацию проекта
2. Изучите существующий код
3. Создайте issue в репозитории

---

**Последнее обновление**: 2024  
**Версия документации**: 1.0.0
