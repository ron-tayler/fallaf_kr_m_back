# Документация по установке, настройке и развертыванию

## Содержание

1. [Требования](#требования)
2. [Установка](#установка)
3. [Настройка](#настройка)
4. [Конфигурация](#конфигурация)
5. [Развертывание](#развертывание)
6. [Docker](#docker)
7. [CI/CD](#cicd)
8. [Проверка работоспособности](#проверка-работоспособности)
9. [Устранение неполадок](#устранение-неполадок)

---

## Требования

### Системные требования

- **Операционная система**: Linux, macOS, Windows (или WSL2 для Windows)
- **Node.js**: версия 20.8.0 или выше
- **npm**: версия, совместимая с Node.js 20.8.0
- **MySQL**: версия 5.7 или выше (рекомендуется 8.0+)
- **Git**: для клонирования репозитория

### Проверка версий

```bash
node --version  # Должно быть v20.8.0 или выше
npm --version   # Должно быть совместимо с Node.js 20.8.0
mysql --version # Должна быть версия 5.7 или выше
git --version   # Любая актуальная версия
```

### Дополнительные требования для Docker

- **Docker**: версия 20.10 или выше
- **Docker Compose**: версия 2.0 или выше (опционально)

---

## Установка

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd fallaf_kr_m_back
```

### 2. Установка зависимостей

```bash
npm install
```

Этот процесс установит все необходимые зависимости, указанные в `package.json`:
- Production зависимости (Express, Prisma, Inversify и др.)
- Development зависимости (TypeScript, ts-node и др.)

**Время установки**: обычно 2-5 минут в зависимости от скорости интернета.

### 3. Генерация Prisma Client

После установки зависимостей необходимо сгенерировать Prisma Client:

```bash
npm run prisma:gen
```

Эта команда:
- Читает схему базы данных из `prisma/schema.prisma`
- Генерирует TypeScript клиент в `prisma/generated/client/`
- Создает типы для всех моделей базы данных

---

## Настройка

### 1. Создание файла переменных окружения

Создайте файл `.env` в корне проекта:

```bash
touch .env
```

### 2. Настройка базы данных

#### Создание базы данных MySQL

```sql
CREATE DATABASE fallaf_kr_m CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE fallaf_kr_m_shadow CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Примечание**: Shadow database используется Prisma для миграций в режиме разработки.

#### Создание пользователя базы данных (опционально)

```sql
CREATE USER 'fallaf_kr_m'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON fallaf_kr_m.* TO 'fallaf_kr_m'@'localhost';
GRANT ALL PRIVILEGES ON fallaf_kr_m_shadow.* TO 'fallaf_kr_m'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Конфигурация переменных окружения

Откройте файл `.env` и заполните следующие переменные:

```env
# База данных
DATABASE_URL="mysql://username:password@localhost:3306/fallaf_kr_m"
SHADOW_DATABASE_URL="mysql://username:password@localhost:3306/fallaf_kr_m_shadow"

# Сервер
SERVER_PORT="3000"

# Сессии
SESSION_TOKEN="your-secret-session-token-min-32-chars"

# FreeKassa (платежная система)
FREE_KASSA_MERCHANT_ID="your-merchant-id"
FREE_KASSA_SECRET_1="your-secret-key-1"
FREE_KASSA_SECRET_2="your-secret-key-2"
```

#### Описание переменных окружения

| Переменная | Описание | Обязательная | Пример |
|------------|----------|--------------|--------|
| `DATABASE_URL` | URL подключения к основной базе данных MySQL | Да | `mysql://user:pass@localhost:3306/dbname` |
| `SHADOW_DATABASE_URL` | URL подключения к shadow базе данных для миграций | Да | `mysql://user:pass@localhost:3306/shadow_db` |
| `SERVER_PORT` | Порт, на котором будет запущен сервер | Нет (по умолчанию: пустая строка) | `3000` |
| `SESSION_TOKEN` | Секретный ключ для подписи сессий | Да | Случайная строка минимум 32 символа |
| `FREE_KASSA_MERCHANT_ID` | ID мерчанта в системе FreeKassa | Да | `12345` |
| `FREE_KASSA_SECRET_1` | Первый секретный ключ FreeKassa | Да | `secret1` |
| `FREE_KASSA_SECRET_2` | Второй секретный ключ FreeKassa | Да | `secret2` |

#### Генерация безопасного SESSION_TOKEN

```bash
# Linux/macOS
openssl rand -base64 32

# Или через Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4. Применение схемы базы данных

После настройки переменных окружения примените схему базы данных:

```bash
npm run prisma:push
```

Эта команда:
- Создаст все таблицы в базе данных согласно схеме `prisma/schema.prisma`
- Применит все связи между таблицами
- Создаст индексы и ограничения

**Примечание**: В production рекомендуется использовать миграции:

```bash
npm run prisma:migrate
```

### 5. Заполнение начальными данными (опционально)

Для заполнения базы данных тестовыми данными:

```bash
npm run prisma:seed
```

**Внимание**: Команда seed может перезаписать существующие данные. Используйте только в development окружении.

---

## Конфигурация

### Конфигурация TypeScript

Файл `tsconfig.json` уже настроен для проекта. Основные параметры:

- **Target**: ESNext
- **Module**: CommonJS
- **Strict mode**: включен
- **Experimental Decorators**: включены (для Inversify)
- **Source Maps**: включены для отладки

### Конфигурация Prisma

Схема базы данных находится в `prisma/schema.prisma`. Основные настройки:

- **Provider**: MySQL
- **Output**: `./generated/client`
- **Shadow Database**: используется для безопасных миграций

### Конфигурация Express

Настройки Express находятся в `src/main.ts`:

- **Session**: хранятся в базе данных через PrismaSessionStore
- **Cookie**: maxAge 7 дней, secure: false (для HTTP)
- **Body Parser**: JSON и URL-encoded
- **Static Files**: раздача из директории `front/`

### Конфигурация сессий

Сессии настраиваются в `src/main.ts`:

```typescript
app.use(session({
    cookie: {
        secure: false,        // true для HTTPS
        maxAge: 1000*60*60*24*7  // 7 дней
    },
    resave: false,
    saveUninitialized: false,
    secret: session_token,
    store: container.get<PrismaSessionStore>("SessionStore")
}))
```

**Для production (HTTPS)**:
- Установите `secure: true` в настройках cookie
- Используйте надежный `SESSION_TOKEN`

### Конфигурация FreeKassa

Настройки FreeKassa находятся в `src/container.ts`:

```typescript
const freeKassa = new FreeKassa(
    merchant_id,    // FREE_KASSA_MERCHANT_ID
    secret_1,       // FREE_KASSA_SECRET_1
    secret_2,       // FREE_KASSA_SECRET_2
    "RUB"           // Валюта (hardcoded)
)
```

**Примечание**: Валюта захардкожена как "RUB". Для изменения валюты необходимо отредактировать код.

---

## Развертывание

### Режим разработки

Для запуска в режиме разработки с hot-reload:

```bash
npm run start:ts
```

Эта команда:
- Использует `ts-node` для прямого выполнения TypeScript
- Не требует предварительной компиляции
- Подходит для разработки

### Production сборка

#### 1. Компиляция TypeScript

```bash
npm run build
```

Эта команда:
- Очищает директорию `dist/`
- Компилирует TypeScript в JavaScript
- Сохраняет source maps для отладки

#### 2. Запуск production версии

```bash
npm run start:prod
```

Или напрямую:

```bash
node dist/main.js
```

### Проверка сборки

Перед развертыванием убедитесь, что:

1. ✅ Все зависимости установлены
2. ✅ Prisma Client сгенерирован
3. ✅ База данных настроена и миграции применены
4. ✅ Файл `.env` заполнен корректными значениями
5. ✅ Проект успешно компилируется (`npm run build`)
6. ✅ Приложение запускается без ошибок

---

## Docker

### Сборка Docker образа

```bash
docker build -t fallaf-kr-m-back .
```

### Запуск контейнера

#### Базовый запуск

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="mysql://user:pass@host:3306/db" \
  -e SHADOW_DATABASE_URL="mysql://user:pass@host:3306/shadow_db" \
  -e SERVER_PORT="3000" \
  -e SESSION_TOKEN="your-secret-token" \
  -e FREE_KASSA_MERCHANT_ID="your-id" \
  -e FREE_KASSA_SECRET_1="secret1" \
  -e FREE_KASSA_SECRET_2="secret2" \
  fallaf-kr-m-back
```

#### Использование .env файла

```bash
docker run -p 3000:3000 --env-file .env fallaf-kr-m-back
```

### Docker Compose (пример)

Создайте файл `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: "mysql://fallaf_kr_m:password@mysql:3306/fallaf_kr_m"
      SHADOW_DATABASE_URL: "mysql://fallaf_kr_m:password@mysql:3306/fallaf_kr_m_shadow"
      SERVER_PORT: "3000"
      SESSION_TOKEN: "${SESSION_TOKEN}"
      FREE_KASSA_MERCHANT_ID: "${FREE_KASSA_MERCHANT_ID}"
      FREE_KASSA_SECRET_1: "${FREE_KASSA_SECRET_1}"
      FREE_KASSA_SECRET_2: "${FREE_KASSA_SECRET_2}"
    depends_on:
      - mysql
    restart: unless-stopped

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: fallaf_kr_m
      MYSQL_USER: fallaf_kr_m
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  mysql_data:
```

Запуск:

```bash
docker-compose up -d
```

### Особенности Dockerfile

Текущий Dockerfile:

1. Использует Node.js 20.8.0
2. Устанавливает зависимости в production режиме
3. Генерирует Prisma Client
4. Компилирует TypeScript
5. Экспонирует порт 3000
6. Запускает приложение через `npm run start:js`

**Важно**: В Dockerfile захардкожен `DATABASE_URL` для контейнера. Для production измените его или используйте переменные окружения.

---

## CI/CD

### GitLab CI/CD

Проект использует GitLab CI/CD для автоматической сборки и развертывания.

#### Конфигурация (`.gitlab-ci.yml`)

**Stage: build**
- Собирает Docker образ при создании тега
- Пушит образ в GitLab Container Registry
- Использует тег как версию образа

**Stage: deploy-prod**
- Ручное развертывание (manual)
- Вызывает Portainer webhook для обновления контейнера
- Использует тег для указания версии

#### Требуемые переменные в GitLab

- `CI_REGISTRY` - URL реестра контейнеров
- `CI_REGISTRY_USER` - Пользователь для входа в реестр
- `CI_REGISTRY_PASSWORD` - Пароль для входа в реестр
- `PORTAINER_WEBHOOK` - URL webhook для Portainer

#### Процесс развертывания

1. Создайте тег в Git:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. GitLab CI автоматически:
   - Соберет Docker образ
   - Запушит его в реестр

3. Вручную запустите stage `deploy-prod` в GitLab CI/CD

4. Portainer получит webhook и обновит контейнер

### GitHub Actions

Проект также включает GitHub Actions workflow (`.github/workflows/docker-image.yml`).

---

## Проверка работоспособности

### 1. Проверка запуска сервера

После запуска приложения вы должны увидеть:

```
Start listening on port 3000
```

### 2. Проверка API endpoints

#### Проверка аутентификации

```bash
curl http://localhost:3000/api/user/is_auth
```

Ожидаемый ответ: `{"auth": false}` или `{"auth": true}`

#### Проверка статических файлов

Откройте в браузере: `http://localhost:3000`

Должна загрузиться страница из `front/index.html`

### 3. Проверка базы данных

```bash
# Подключение к MySQL
mysql -u username -p fallaf_kr_m

# Проверка таблиц
SHOW TABLES;

# Ожидаемые таблицы:
# - User
# - UserInvate
# - Session
# - Instructor
# - File
# - InstructorHistory
# - Dev
# - DevHistory
```

### 4. Проверка Prisma

```bash
# Проверка подключения к БД
npx prisma db pull

# Просмотр схемы
npx prisma studio
```

Prisma Studio откроет веб-интерфейс для просмотра данных.

### 5. Проверка логов

Проверьте логи приложения на наличие ошибок:

- Ошибки подключения к БД
- Ошибки валидации
- Ошибки зависимостей

---

## Устранение неполадок

### Проблема: Ошибка подключения к базе данных

**Симптомы**:
```
Error: Can't reach database server
```

**Решения**:
1. Проверьте, запущен ли MySQL:
   ```bash
   sudo systemctl status mysql  # Linux
   brew services list            # macOS
   ```

2. Проверьте `DATABASE_URL` в `.env`:
   - Правильный хост (localhost или IP)
   - Правильный порт (обычно 3306)
   - Правильные username и password
   - Правильное имя базы данных

3. Проверьте права доступа пользователя БД:
   ```sql
   SHOW GRANTS FOR 'username'@'localhost';
   ```

4. Проверьте firewall (если БД на удаленном сервере)

### Проблема: Prisma Client не найден

**Симптомы**:
```
Error: Cannot find module '@prisma/client'
```

**Решения**:
1. Переустановите зависимости:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Регенерируйте Prisma Client:
   ```bash
   npm run prisma:gen
   ```

3. Убедитесь, что Prisma установлен:
   ```bash
   npx prisma --version
   ```

### Проблема: Ошибки компиляции TypeScript

**Симптомы**:
```
error TS2307: Cannot find module
```

**Решения**:
1. Проверьте `tsconfig.json`
2. Убедитесь, что все зависимости установлены
3. Очистите и пересоберите:
   ```bash
   npm run build:clean
   npm run build
   ```

### Проблема: Сессии не сохраняются

**Симптомы**:
- Пользователь разлогинивается после перезагрузки
- Сессии не работают

**Решения**:
1. Проверьте таблицу `Session` в БД:
   ```sql
   SELECT * FROM Session;
   ```

2. Проверьте `SESSION_TOKEN` в `.env` (должен быть достаточно длинным)

3. Проверьте настройки cookie в `src/main.ts`

4. Убедитесь, что PrismaSessionStore правильно инициализирован

### Проблема: Порт уже занят

**Симптомы**:
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Решения**:
1. Измените порт в `.env`:
   ```env
   SERVER_PORT="3001"
   ```

2. Или остановите процесс, использующий порт:
   ```bash
   # Linux/macOS
   lsof -ti:3000 | xargs kill -9
   
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

### Проблема: Docker образ не собирается

**Симптомы**:
```
Error during build
```

**Решения**:
1. Проверьте версию Docker:
   ```bash
   docker --version
   ```

2. Очистите кэш Docker:
   ```bash
   docker system prune -a
   ```

3. Проверьте Dockerfile на синтаксические ошибки

4. Убедитесь, что все файлы скопированы (проверьте `.dockerignore`)

### Проблема: FreeKassa не работает

**Симптомы**:
- Ошибки при генерации URL оплаты
- Неверная подпись

**Решения**:
1. Проверьте переменные окружения:
   - `FREE_KASSA_MERCHANT_ID`
   - `FREE_KASSA_SECRET_1`
   - `FREE_KASSA_SECRET_2`

2. Убедитесь, что значения совпадают с настройками в личном кабинете FreeKassa

3. Проверьте логи приложения на наличие ошибок

### Проблема: Миграции не применяются

**Симптомы**:
- Таблицы не создаются
- Ошибки при `prisma:push`

**Решения**:
1. Проверьте подключение к shadow database:
   ```env
   SHADOW_DATABASE_URL="mysql://..."
   ```

2. Убедитесь, что shadow database существует и доступна

3. Попробуйте использовать миграции вместо push:
   ```bash
   npx prisma migrate dev
   ```

---

## Дополнительные ресурсы

### Полезные команды

```bash
# Просмотр всех скриптов
npm run

# Форматирование Prisma схемы
npm run prisma:format

# Просмотр сгенерированного Prisma Client
ls -la prisma/generated/client/

# Просмотр структуры проекта
tree -L 3 -I 'node_modules|dist|.git'
```

### Ссылки на документацию

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Inversify Documentation](https://inversify.io/)
- [Docker Documentation](https://docs.docker.com/)

---

## Поддержка

При возникновении проблем:

1. Проверьте раздел [Устранение неполадок](#устранение-неполадок)
2. Изучите логи приложения
3. Проверьте документацию используемых библиотек
4. Создайте issue в репозитории проекта

---

**Последнее обновление**: 2024  
**Версия документации**: 1.0.0
