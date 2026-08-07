# FallaF KR M Backend

Backend приложение для управления финансовыми операциями инструкторов и разработчиков.

## Описание

Система управления балансами, файлами и платежами для платформы FallaF. Приложение предоставляет REST API для работы с пользователями, инструкторами, файлами и интеграцией с платежной системой FreeKassa.

## Технологический стек

- **Runtime**: Node.js 20.8.0
- **Язык**: TypeScript 4.5.3
- **Framework**: Express.js 4.18.2
- **ORM**: Prisma 3.12.0
- **База данных**: MySQL
- **Dependency Injection**: Inversify 6.0.1
- **Валидация**: io-ts 2.2.20
- **Функциональное программирование**: fp-ts 2.16.1

## Основной функционал

### Управление пользователями
- Аутентификация и авторизация через сессии
- Роли пользователей: Admin, Manager, Instructor, User
- Регистрация по пригласительным ссылкам
- Управление статусами пользователей (New, Active, Deactive)

### Управление инструкторами
- CRUD операции с инструкторами
- Управление балансами инструкторов
- История финансовых операций инструкторов

### Управление файлами
- Создание и удаление файлов
- Привязка файлов к инструкторам
- Управление ценами (fallaf_price, dev_price)
- Расчет балансов по файлам

### Финансовые операции
- Управление балансом разработчиков
- История операций разработчиков
- Интеграция с платежной системой FreeKassa

## Структура проекта

```
├── src/
│   ├── main.ts              # Точка входа приложения
│   ├── container.ts         # Конфигурация DI контейнера
│   ├── Controller/          # REST API контроллеры
│   │   ├── API/             # Защищенные эндпоинты
│   │   └── PublicApi/       # Публичные эндпоинты
│   ├── Middleware/          # Express middleware
│   ├── lib/                 # Вспомогательные библиотеки
│   └── io_ts/               # Схемы валидации
├── prisma/
│   ├── schema.prisma        # Схема базы данных
│   └── seed.ts              # Сидеры для БД
├── front/                   # Статические файлы фронтенда
└── dist/                    # Скомпилированный код
```

## Установка и запуск

### Требования
- Node.js 20.8.0+
- MySQL база данных
- npm или yarn

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
DATABASE_URL="mysql://user:password@localhost:3306/database_name"
SHADOW_DATABASE_URL="mysql://user:password@localhost:3306/shadow_database"
SESSION_TOKEN="your-secret-session-token"
SERVER_PORT="3000"
FREE_KASSA_MERCHANT_ID="your-merchant-id"
FREE_KASSA_SECRET_1="your-secret-1"
FREE_KASSA_SECRET_2="your-secret-2"
```

### Установка зависимостей

```bash
npm install
```

### Настройка базы данных

```bash
# Генерация Prisma клиента
npm run prisma:gen

# Применение миграций
npm run prisma:push

# Заполнение тестовыми данными (опционально)
npm run prisma:seed
```

### Запуск

**Разработка:**
```bash
npm run start:ts
```

**Продакшн:**
```bash
npm run build
npm run start:prod
```

## Docker

Проект включает Dockerfile для контейнеризации:

```bash
docker build -t fallaf-kr-m-back .
docker run -p 3000:3000 fallaf-kr-m-back
```

## API Endpoints

### Пользователи (`/api/user`)
- `GET /api/user/is_auth` - Проверка аутентификации
- `POST /api/user/auth` - Авторизация
- `POST /api/user/logout` - Выход
- `POST /api/user/check-invite` - Проверка пригласительной ссылки
- `POST /api/user/reg` - Регистрация
- `GET /api/user/all` - Список всех пользователей (требует авторизации)
- `POST /api/user/add` - Добавление пользователя (требует авторизации)
- `POST /api/user/enable` - Активация пользователя (требует авторизации)
- `POST /api/user/disable` - Деактивация пользователя (требует авторизации)

### Финансы (`/api/money`)
- `GET /api/money/instructors` - Список инструкторов
- `PUT /api/money/instructor` - Создание инструктора
- `DELETE /api/money/instructor/:id` - Удаление инструктора
- `PUT /api/money/instructor/:id/addMoney` - Пополнение баланса инструктора
- `GET /api/money/files` - Список файлов
- `PUT /api/money/file` - Создание файла
- `DELETE /api/money/file/:id` - Удаление файла
- `POST /api/money/file/:id/edit_fallaf_price` - Редактирование fallaf_price
- `POST /api/money/file/:id/edit_dev_price` - Редактирование dev_price
- `GET /api/money/instructors/history` - История операций инструкторов
- `PUT /api/money/dev/money` - Пополнение баланса разработчика
- `GET /api/money/dev/history` - История операций разработчика

### FreeKassa (`/api/free-kassa`)
- `GET /api/free-kassa/get-pay-url` - Получение URL для оплаты

## База данных

Схема базы данных определена в `prisma/schema.prisma`. Основные сущности:

- **User** - Пользователи системы
- **Instructor** - Инструкторы
- **File** - Файлы с финансовой информацией
- **InstructorHistory** - История операций инструкторов
- **DevHistory** - История операций разработчиков
- **Dev** - Баланс разработчиков
- **Session** - Сессии пользователей
- **UserInvate** - Пригласительные ссылки

## Безопасность

- Аутентификация через express-session
- Хеширование паролей с использованием библиотеки password-hash
- Middleware для проверки авторизации (`IsSignIn`)
- Валидация входных данных через io-ts
- Ролевая модель доступа (Admin, Manager, Instructor, User)

⚠️ **Важно**: Большинство финансовых endpoints не требуют авторизации. Рекомендуется добавить авторизацию на все финансовые операции.

## Документация

Вся документация проекта структурирована и размещена в директории [`docs/`](./docs/):

- **[📚 Документация проекта](./docs/README.md)** - Главная страница документации с навигацией
- **[🚀 Развёртывание](./docs/deployment/DEPLOYMENT.md)** - Полная документация по установке, настройке, развертыванию и конфигурации проекта
- **[📖 API Документация](./docs/api/API_DOCUMENTATION.md)** - Подробная документация всех API endpoints с описанием параметров, ответов и примеров использования
- **[🏗️ Архитектура](./docs/architecture/ARCHITECTURE_REPORT.md)** - Анализ архитектуры и паттернов проектирования
- **[📁 Структура проекта](./docs/structure/PROJECT_STRUCTURE.md)** - Подробное описание структуры проекта, организации файлов и директорий
- **[👨‍💻 Руководство для разработчиков](./docs/development/DEVELOPMENT.md)** - Руководство по разработке, настройке окружения и работе с кодом

**Рекомендуется начать с** [главной страницы документации](./docs/README.md) для навигации по всем разделам.

## Разработка

### Скрипты

- `npm run start:ts` - Запуск в режиме разработки (ts-node)
- `npm run start:js` - Запуск скомпилированного кода
- `npm run build` - Сборка проекта (очистка + компиляция TypeScript)
- `npm run build:ts` - Компиляция TypeScript
- `npm run build:clean` - Очистка директории dist
- `npm run prisma:gen` - Генерация Prisma Client
- `npm run prisma:push` - Применение изменений схемы к БД
- `npm run prisma:migrate` - Применение миграций
- `npm run prisma:seed` - Заполнение БД тестовыми данными

## Известные проблемы

- Некоторые финансовые endpoints не требуют авторизации
- FreeKassa webhook не обрабатывает платежи (только логирование)
- Hardcoded значения в FreeKassa контроллере (order_id, inst_id, amount)
- Отсутствие слоя Service (бизнес-логика в контроллерах)
- Отсутствие слоя Repository (прямой доступ к Prisma)

Подробнее см. [STRUCTURAL_ANALYSIS.md](./STRUCTURAL_ANALYSIS.md).

## Лицензия

ISC
