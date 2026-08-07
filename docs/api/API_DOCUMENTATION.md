# API Documentation

Подробная документация всех API endpoints проекта FallaF KR M Backend.

## Содержание

- [Общая информация](#общая-информация)
- [Аутентификация](#аутентификация)
- [Пользователи (`/api/user`)](#пользователи-apiuser)
- [Финансы (`/api/money`)](#финансы-apimoney)
- [FreeKassa (`/api/free-kassa`)](#freekassa-apifree-kassa)
- [FreeKassa Public API (`/public-api/free-kassa`)](#freekassa-public-api-public-apifree-kassa)
- [Коды ошибок](#коды-ошибок)

---

## Общая информация

### Базовый URL
```
http://localhost:3000
```
(Порт настраивается через переменную окружения `SERVER_PORT`)

### Формат данных
- Все запросы и ответы используют формат JSON
- Content-Type: `application/json`
- Кодировка: UTF-8

### Сессии
Приложение использует cookie-based сессии. После успешной авторизации сессия сохраняется в cookie и автоматически отправляется с каждым запросом.

### Роли пользователей
- `Admin` - Администратор (полный доступ)
- `Manager` - Менеджер (управление пользователями и данными)
- `Instructor` - Инструктор (доступ к своим данным)
- `User` - Обычный пользователь (ограниченный доступ)

### Статусы пользователей
- `New` - Новый пользователь (требует регистрации)
- `Active` - Активный пользователь
- `Deactive` - Деактивированный пользователь

---

## Аутентификация

Большинство endpoints требуют аутентификации через сессию. Endpoints, требующие авторизации, помечены middleware `IsSignIn`. При отсутствии авторизации возвращается статус `401` с текстом `"require auth"`.

---

## Пользователи (`/api/user`)

### `GET /api/user/is_auth`

Проверка статуса аутентификации текущего пользователя.

**Авторизация:** Не требуется

**Описание:** Проверяет, авторизован ли пользователь и активен ли его аккаунт. Обновляет данные сессии.

**Параметры запроса:** Отсутствуют

**Ответы:**

**200 OK** - Пользователь авторизован и активен
```json
{
  "status": true,
  "user_id": 1,
  "user_role": "Admin"
}
```

**200 OK** - Пользователь не авторизован
```json
{
  "status": false,
  "user_id": 0,
  "user_role": "User"
}
```

**Пример использования:**
```bash
curl -X GET http://localhost:3000/api/user/is_auth \
  -H "Cookie: connect.sid=..."
```

---

### `POST /api/user/auth`

Авторизация пользователя по логину и паролю.

**Авторизация:** Не требуется

**Описание:** Выполняет вход пользователя в систему. Создает сессию при успешной авторизации.

**Тело запроса:**
```json
{
  "login": "string",
  "password": "string"
}
```

**Параметры:**
- `login` (string, обязательный) - Логин пользователя
- `password` (string, обязательный) - Пароль пользователя

**Ответы:**

**200 OK** - Успешная авторизация
```
(пустое тело)
```

**400 Bad Request** - Ошибка валидации
```json
[
  {
    "value": "...",
    "context": [...],
    "message": "..."
  }
]
```

**400 Bad Request** - Пользователь не найден или неактивен
```
"user_not_found"
```

**400 Bad Request** - Неверный пароль
```
"password_invalid"
```

**Пример использования:**
```bash
curl -X POST http://localhost:3000/api/user/auth \
  -H "Content-Type: application/json" \
  -d '{
    "login": "admin",
    "password": "password123"
  }'
```

---

### `POST /api/user/logout`

Выход из системы.

**Авторизация:** Не требуется

**Описание:** Очищает сессию пользователя.

**Параметры запроса:** Отсутствуют

**Ответы:**

**200 OK** - Успешный выход
```
(пустое тело)
```

**Пример использования:**
```bash
curl -X POST http://localhost:3000/api/user/logout \
  -H "Cookie: connect.sid=..."
```

---

### `POST /api/user/check-invite`

Проверка пригласительной ссылки.

**Авторизация:** Не требуется

**Описание:** Проверяет валидность пригласительной ссылки и возвращает информацию о пользователе, для которого она создана.

**Тело запроса:**
```json
{
  "hash_link": "string"
}
```

**Параметры:**
- `hash_link` (string, обязательный) - Хеш пригласительной ссылки

**Ответы:**

**200 OK** - Приглашение валидно
```json
{
  "id": 1,
  "login": "newuser"
}
```

**400 Bad Request** - Ошибка валидации
```json
[
  {
    "value": "...",
    "context": [...],
    "message": "..."
  }
]
```

**404 Not Found** - Приглашение не найдено или неактивно
```
"not_found"
```

**Пример использования:**
```bash
curl -X POST http://localhost:3000/api/user/check-invite \
  -H "Content-Type: application/json" \
  -d '{
    "hash_link": "abc123def456..."
  }'
```

---

### `POST /api/user/reg`

Регистрация нового пользователя.

**Авторизация:** Не требуется

**Описание:** Регистрирует нового пользователя по пригласительной ссылке. Активирует аккаунт и создает сессию.

**Тело запроса:**
```json
{
  "login": "string",
  "password": "string",
  "hash_link": "string"
}
```

**Параметры:**
- `login` (string, обязательный) - Логин для нового пользователя
- `password` (string, обязательный) - Пароль для нового пользователя
- `hash_link` (string, обязательный) - Хеш пригласительной ссылки

**Ответы:**

**200 OK** - Успешная регистрация
```
(пустое тело)
```

**400 Bad Request** - Ошибка валидации
```json
[
  {
    "value": "...",
    "context": [...],
    "message": "..."
  }
]
```

**400 Bad Request** - Пользователь не найден или приглашение невалидно
```json
"user_not_found"
```

**500 Internal Server Error** - Ошибка сервера
```
(пустое тело)
```

**Пример использования:**
```bash
curl -X POST http://localhost:3000/api/user/reg \
  -H "Content-Type: application/json" \
  -d '{
    "login": "newuser",
    "password": "securepassword123",
    "hash_link": "abc123def456..."
  }'
```

---

### `GET /api/user/all`

Получение списка всех пользователей.

**Авторизация:** Требуется (`IsSignIn`)

**Требования к роли:** `Admin` или `Manager`

**Описание:** Возвращает список всех пользователей системы с их пригласительными ссылками.

**Параметры запроса:** Отсутствуют

**Ответы:**

**200 OK** - Список пользователей
```json
[
  {
    "id": 1,
    "login": "admin",
    "role": "Admin",
    "status": "Active",
    "instructorId": null,
    "invite": {
      "hash": "abc123..."
    }
  },
  {
    "id": 2,
    "login": "instructor1",
    "role": "Instructor",
    "status": "Active",
    "instructorId": 1,
    "invite": null
  }
]
```

**401 Unauthorized** - Требуется авторизация
```
"require auth"
```

**403 Forbidden** - Недостаточно прав
```json
"Forbidden"
```

**Пример использования:**
```bash
curl -X GET http://localhost:3000/api/user/all \
  -H "Cookie: connect.sid=..."
```

---

### `POST /api/user/add`

Добавление нового пользователя.

**Авторизация:** Требуется (`IsSignIn`)

**Требования к роли:** `Admin` или `Manager`

**Описание:** Создает нового пользователя со статусом `New` и генерирует для него пригласительную ссылку.

**Тело запроса:**
```json
{
  "login": "string",
  "role": "Admin" | "Manager" | "Instructor" | "User",
  "instructor_id": 0
}
```

**Параметры:**
- `login` (string, обязательный) - Логин нового пользователя
- `role` (enum, обязательный) - Роль пользователя: `Admin`, `Manager`, `Instructor`, `User`
- `instructor_id` (number, обязательный) - ID инструктора (0 если не привязан)

**Ответы:**

**200 OK** - Пользователь создан
```json
{
  "hash": "abc123def456..."
}
```

**400 Bad Request** - Ошибка валидации
```json
[
  {
    "value": "...",
    "context": [...],
    "message": "..."
  }
]
```

**401 Unauthorized** - Требуется авторизация
```
"require auth"
```

**403 Forbidden** - Недостаточно прав
```json
"Forbidden"
```

**500 Internal Server Error** - Ошибка сервера
```
(пустое тело)
```

**Пример использования:**
```bash
curl -X POST http://localhost:3000/api/user/add \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=..." \
  -d '{
    "login": "newuser",
    "role": "Instructor",
    "instructor_id": 1
  }'
```

---

### `POST /api/user/enable`

Активация пользователя.

**Авторизация:** Требуется (`IsSignIn`)

**Требования к роли:** `Admin` или `Manager`

**Описание:** Активирует деактивированного пользователя (меняет статус с `Deactive` на `Active`).

**Тело запроса:**
```json
{
  "user_id": 1
}
```

**Параметры:**
- `user_id` (number, обязательный) - ID пользователя для активации

**Ответы:**

**200 OK** - Пользователь активирован
```
(пустое тело)
```

**400 Bad Request** - Ошибка валидации
```json
[
  {
    "value": "...",
    "context": [...],
    "message": "..."
  }
]
```

**400 Bad Request** - Пользователь не найден или не в статусе Deactive
```
"user_not_found"
```

**401 Unauthorized** - Требуется авторизация
```
"require auth"
```

**403 Forbidden** - Недостаточно прав
```json
"Forbidden"
```

**500 Internal Server Error** - Ошибка сервера
```
(пустое тело)
```

**Пример использования:**
```bash
curl -X POST http://localhost:3000/api/user/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=..." \
  -d '{
    "user_id": 5
  }'
```

---

### `POST /api/user/disable`

Деактивация пользователя.

**Авторизация:** Требуется (`IsSignIn`)

**Требования к роли:** `Admin` или `Manager`

**Описание:** Деактивирует активного пользователя (меняет статус с `Active` на `Deactive`).

**Тело запроса:**
```json
{
  "user_id": 1
}
```

**Параметры:**
- `user_id` (number, обязательный) - ID пользователя для деактивации

**Ответы:**

**200 OK** - Пользователь деактивирован
```
(пустое тело)
```

**400 Bad Request** - Ошибка валидации
```json
[
  {
    "value": "...",
    "context": [...],
    "message": "..."
  }
]
```

**400 Bad Request** - Пользователь не найден или не в статусе Active
```
"user_not_found"
```

**401 Unauthorized** - Требуется авторизация
```
"require auth"
```

**403 Forbidden** - Недостаточно прав
```json
"Forbidden"
```

**500 Internal Server Error** - Ошибка сервера
```
(пустое тело)
```

**Пример использования:**
```bash
curl -X POST http://localhost:3000/api/user/disable \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=..." \
  -d '{
    "user_id": 5
  }'
```

---

### `POST /api/user/delete`

Удаление пользователя.

**Авторизация:** Требуется (`IsSignIn`)

**Требования к роли:** `Admin` или `Manager`

**Описание:** ⚠️ **Не реализовано** - всегда возвращает 404.

**Тело запроса:** Отсутствует

**Ответы:**

**404 Not Found** - Endpoint не реализован
```
"not_found"
```

---

## Финансы (`/api/money`)

### `GET /api/money/instructors`

Получение списка всех инструкторов.

**Авторизация:** Не требуется ⚠️

**Описание:** Возвращает список всех инструкторов с их балансами.

**Параметры запроса:** Отсутствуют

**Ответы:**

**200 OK** - Список инструкторов
```json
[
  {
    "id": 1,
    "name": "Инструктор 1",
    "price": 1500.50
  },
  {
    "id": 2,
    "name": "Инструктор 2",
    "price": 2300.75
  }
]
```

**Пример использования:**
```bash
curl -X GET http://localhost:3000/api/money/instructors
```

---

### `PUT /api/money/instructor`

Создание нового инструктора.

**Авторизация:** Не требуется ⚠️

**Описание:** Создает нового инструктора с начальным балансом 0.

**Тело запроса:**
```json
{
  "name": "string"
}
```

**Параметры:**
- `name` (string, обязательный) - Имя инструктора

**Ответы:**

**200 OK** - Инструктор создан
```json
{
  "id": 1,
  "name": "Инструктор 1",
  "price": 0
}
```

**400 Bad Request** - Ошибка валидации имени
```
"error name"
```

**Пример использования:**
```bash
curl -X PUT http://localhost:3000/api/money/instructor \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Новый инструктор"
  }'
```

---

### `DELETE /api/money/instructor/:id`

Удаление инструктора.

**Авторизация:** Не требуется ⚠️

**Описание:** Удаляет инструктора по ID.

**Параметры пути:**
- `id` (number, обязательный) - ID инструктора

**Ответы:**

**200 OK** - Инструктор удален
```
(пустое тело)
```

**500 Internal Server Error** - Ошибка удаления
```
(пустое тело)
```

**Пример использования:**
```bash
curl -X DELETE http://localhost:3000/api/money/instructor/1
```

---

### `PUT /api/money/instructor/:id/addMoney`

Пополнение баланса инструктора.

**Авторизация:** Не требуется ⚠️

**Описание:** Уменьшает баланс инструктора на указанную сумму и создает запись в истории операций. ⚠️ **Примечание:** Метод использует `decrement`, что означает уменьшение баланса, а не увеличение.

**Параметры пути:**
- `id` (number, обязательный) - ID инструктора

**Тело запроса:**
```json
{
  "money": 100.50
}
```

**Параметры:**
- `money` (number, обязательный) - Сумма для списания (должна быть > 0)

**Ответы:**

**200 OK** - Операция выполнена
```json
[
  {
    "id": 1,
    "name": "Инструктор 1",
    "price": 1400.00
  },
  {
    "id": 1,
    "sum": 100.50,
    "date": "2024-01-15T10:30:00.000Z",
    "instructorId": 1
  }
]
```

**400 Bad Request** - Ошибка валидации суммы или ID
```
"error money"
```
или
```
"error id"
```

**Пример использования:**
```bash
curl -X PUT http://localhost:3000/api/money/instructor/1/addMoney \
  -H "Content-Type: application/json" \
  -d '{
    "money": 100.50
  }'
```

---

### `GET /api/money/files`

Получение списка файлов.

**Авторизация:** Не требуется ⚠️

**Описание:** Возвращает список всех файлов с расчетом балансов. Для пользователей с ролью `Instructor` возвращаются только файлы их инструктора.

**Параметры запроса:** Отсутствуют

**Ответы:**

**200 OK** - Список файлов
```json
[
  {
    "id": 1,
    "name": "Файл 1",
    "instructor_id": 1,
    "fallaf_price": 500.00,
    "dev_price": 100.00,
    "date": "2024-01-15T10:00:00.000Z",
    "balance": 0
  },
  {
    "id": 2,
    "name": "Файл 2",
    "instructor_id": 1,
    "fallaf_price": 300.00,
    "dev_price": 50.00,
    "date": "2024-01-16T11:00:00.000Z",
    "balance": 200.00
  }
]
```

**Поля ответа:**
- `id` - ID файла
- `name` - Название файла
- `instructor_id` - ID инструктора
- `fallaf_price` - Цена для Fallaf
- `dev_price` - Цена для разработчика
- `date` - Дата создания файла
- `balance` - Текущий баланс файла (рассчитывается на основе баланса инструктора)

**Пример использования:**
```bash
curl -X GET http://localhost:3000/api/money/files \
  -H "Cookie: connect.sid=..."
```

---

### `PUT /api/money/file`

Создание нового файла.

**Авторизация:** Не требуется ⚠️

**Описание:** Создает новый файл, привязанный к инструктору, и обновляет балансы инструктора и разработчика.

**Тело запроса:**
```json
{
  "name": "string",
  "instructor_id": 1,
  "fallaf_price": 500.00,
  "dev_price": 100.00,
  "date": "2024-01-15T10:00:00.000Z"
}
```

**Параметры:**
- `name` (string, обязательный) - Название файла
- `instructor_id` (number, обязательный) - ID инструктора
- `fallaf_price` (number, обязательный) - Цена для Fallaf
- `dev_price` (number, обязательный) - Цена для разработчика
- `date` (string, ISO 8601, опциональный) - Дата файла (по умолчанию текущая дата)

**Ответы:**

**200 OK** - Файл создан
```json
{
  "id": 1,
  "name": "Файл 1",
  "instructorId": 1,
  "date": "2024-01-15T10:00:00.000Z",
  "fallaf_price": 500.00,
  "dev_price": 100.00
}
```

**400 Bad Request** - Ошибка валидации
```
"Invalid value..."
```

**400 Bad Request** - Инструктор не найден
```
"not found instructor"
```

**Пример использования:**
```bash
curl -X PUT http://localhost:3000/api/money/file \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Новый файл",
    "instructor_id": 1,
    "fallaf_price": 500.00,
    "dev_price": 100.00,
    "date": "2024-01-15T10:00:00.000Z"
  }'
```

---

### `DELETE /api/money/file/:id`

Удаление файла.

**Авторизация:** Не требуется ⚠️

**Описание:** Удаляет файл и корректирует балансы инструктора и разработчика.

**Параметры пути:**
- `id` (number, обязательный) - ID файла

**Ответы:**

**200 OK** - Файл удален
```
(пустое тело)
```

**500 Internal Server Error** - Файл не найден или ошибка удаления
```
(пустое тело)
```

**Пример использования:**
```bash
curl -X DELETE http://localhost:3000/api/money/file/1
```

---

### `POST /api/money/file/:id/edit_fallaf_price`

Редактирование цены Fallaf для файла.

**Авторизация:** Не требуется ⚠️

**Описание:** Изменяет цену Fallaf для файла и корректирует баланс инструктора.

**Параметры пути:**
- `id` (number, обязательный) - ID файла

**Тело запроса:**
```json
{
  "price": 600.00
}
```

**Параметры:**
- `price` (number, обязательный) - Новая цена Fallaf

**Ответы:**

**200 OK** - Цена обновлена
```json
[
  {
    "id": 1,
    "name": "Инструктор 1",
    "price": 1600.00
  },
  {
    "id": 1,
    "name": "Файл 1",
    "fallaf_price": 600.00,
    "dev_price": 100.00
  }
]
```

**400 Bad Request** - Ошибка валидации цены
```
"error price"
```

**Пример использования:**
```bash
curl -X POST http://localhost:3000/api/money/file/1/edit_fallaf_price \
  -H "Content-Type: application/json" \
  -d '{
    "price": 600.00
  }'
```

---

### `POST /api/money/file/:id/edit_dev_price`

Редактирование цены разработчика для файла.

**Авторизация:** Не требуется ⚠️

**Описание:** Изменяет цену разработчика для файла и корректирует баланс разработчика.

**Параметры пути:**
- `id` (number, обязательный) - ID файла

**Тело запроса:**
```json
{
  "price": 150.00
}
```

**Параметры:**
- `price` (number, обязательный) - Новая цена разработчика

**Ответы:**

**200 OK** - Цена обновлена
```json
[
  {
    "id": 1,
    "price": 1150.00
  },
  {
    "id": 1,
    "name": "Файл 1",
    "fallaf_price": 500.00,
    "dev_price": 150.00
  }
]
```

**400 Bad Request** - Ошибка валидации цены
```
"error price"
```

**Пример использования:**
```bash
curl -X POST http://localhost:3000/api/money/file/1/edit_dev_price \
  -H "Content-Type: application/json" \
  -d '{
    "price": 150.00
  }'
```

---

### `GET /api/money/instructors/history`

Получение истории операций инструкторов.

**Авторизация:** Не требуется ⚠️

**Описание:** Возвращает историю всех финансовых операций инструкторов.

**Параметры запроса:** Отсутствуют

**Ответы:**

**200 OK** - История операций
```json
[
  {
    "id": 1,
    "date": "2024-01-15T10:30:00.000Z",
    "sum": 100.50,
    "inst_id": 1
  },
  {
    "id": 2,
    "date": "2024-01-16T11:00:00.000Z",
    "sum": 200.75,
    "inst_id": 1
  }
]
```

**Пример использования:**
```bash
curl -X GET http://localhost:3000/api/money/instructors/history
```

---

### `PUT /api/money/dev/money`

Пополнение баланса разработчика.

**Авторизация:** Не требуется ⚠️

**Описание:** Уменьшает баланс разработчика на указанную сумму и создает запись в истории операций. ⚠️ **Примечание:** Метод использует `decrement`, что означает уменьшение баланса, а не увеличение.

**Тело запроса:**
```json
{
  "money": 500.00
}
```

**Параметры:**
- `money` (number, обязательный) - Сумма для списания (должна быть > 0)

**Ответы:**

**200 OK** - Операция выполнена
```
(пустое тело)
```

**400 Bad Request** - Ошибка валидации
```
"Invalid value..."
```

**Пример использования:**
```bash
curl -X PUT http://localhost:3000/api/money/dev/money \
  -H "Content-Type: application/json" \
  -d '{
    "money": 500.00
  }'
```

---

### `GET /api/money/dev/history`

Получение истории операций разработчика и текущего баланса.

**Авторизация:** Не требуется ⚠️

**Описание:** Возвращает историю всех финансовых операций разработчика и текущий баланс.

**Параметры запроса:** Отсутствуют

**Ответы:**

**200 OK** - История и баланс
```json
{
  "history": [
    {
      "id": 1,
      "date": "2024-01-15T10:30:00.000Z",
      "sum": 500.00
    },
    {
      "id": 2,
      "date": "2024-01-16T11:00:00.000Z",
      "sum": 300.00
    }
  ],
  "price": 2000.00
}
```

**Поля ответа:**
- `history` - Массив записей истории операций
- `price` - Текущий баланс разработчика

**Пример использования:**
```bash
curl -X GET http://localhost:3000/api/money/dev/history
```

---

## FreeKassa (`/api/free-kassa`)

### `GET /api/free-kassa/get-pay-url`

Получение URL для оплаты через FreeKassa.

**Авторизация:** Не требуется ⚠️

**Описание:** ⚠️ **ВНИМАНИЕ:** Endpoint содержит hardcoded значения и не готов к продакшн использованию. Создает URL для оплаты через платежную систему FreeKassa.

**Параметры запроса:** Отсутствуют

**Ответы:**

**200 OK** - URL для оплаты
```json
"https://pay.freekassa.ru/?m=12345&oa=500&currency=RUB&o=1&s=abc123...&lang=ru&i=42&us_inst_id=1"
```

**Пример использования:**
```bash
curl -X GET http://localhost:3000/api/free-kassa/get-pay-url
```

**Примечание:** В текущей реализации используются hardcoded значения:
- `order_id = 1`
- `inst_id = 1`
- `amount = 500`

Для продакшн использования необходимо передавать эти параметры в запросе.

---

## FreeKassa Public API (`/public-api/free-kassa`)

### `POST /public-api/free-kassa/notify`

Webhook для уведомлений от FreeKassa.

**Авторизация:** Не требуется

**Описание:** ⚠️ **ВНИМАНИЕ:** Endpoint только логирует данные, но не обрабатывает платежи. Принимает уведомления от платежной системы FreeKassa о статусе платежей.

**Тело запроса:**
```json
{
  "MERCHANT_ID": "string",
  "AMOUNT": "string",
  "intid": "string",
  "MERCHANT_ORDER_ID": "string",
  "P_EMAIL": "string",
  "P_PHONE": "string",
  "CUR_ID": "string",
  "SIGN": "string",
  "payer_account": "string",
  "commission": "string",
  "us_inst_id": "string"
}
```

**Параметры:**
- `MERCHANT_ID` (string, обязательный) - ID магазина в системе FreeKassa
- `AMOUNT` (string, обязательный) - Сумма платежа
- `intid` (string, обязательный) - ID транзакции в системе FreeKassa
- `MERCHANT_ORDER_ID` (string, обязательный) - ID заказа в вашей системе
- `P_EMAIL` (string, обязательный) - Email плательщика
- `P_PHONE` (string, обязательный) - Телефон плательщика
- `CUR_ID` (string, обязательный) - ID валюты платежа
- `SIGN` (string, обязательный) - Подпись данных для проверки
- `payer_account` (string, обязательный) - Номер карты/счета плательщика
- `commission` (string, обязательный) - Комиссия
- `us_inst_id` (string, обязательный) - ID инструктора (пользовательский параметр)

**Ответы:**

**200 OK** - Уведомление получено (только логирование)
```
(пустое тело)
```

**400 Bad Request** - Ошибка валидации
```json
[
  {
    "value": "...",
    "context": [...],
    "message": "..."
  }
]
```

**Пример использования:**
```bash
curl -X POST http://localhost:3000/public-api/free-kassa/notify \
  -H "Content-Type: application/json" \
  -d '{
    "MERCHANT_ID": "12345",
    "AMOUNT": "500",
    "intid": "67890",
    "MERCHANT_ORDER_ID": "1",
    "P_EMAIL": "user@example.com",
    "P_PHONE": "+79001234567",
    "CUR_ID": "1",
    "SIGN": "abc123...",
    "payer_account": "1234567890",
    "commission": "10",
    "us_inst_id": "1"
  }'
```

**Примечание:** В текущей реализации endpoint только логирует данные в консоль, но не выполняет никаких действий по обработке платежа. Необходимо добавить:
- Проверку подписи `SIGN`
- Обновление баланса инструктора
- Создание записи о платеже
- Возврат корректного ответа для FreeKassa

---

## Коды ошибок

### HTTP статус коды

- **200 OK** - Успешный запрос
- **400 Bad Request** - Ошибка валидации данных или некорректный запрос
- **401 Unauthorized** - Требуется авторизация
- **403 Forbidden** - Недостаточно прав доступа
- **404 Not Found** - Ресурс не найден
- **500 Internal Server Error** - Внутренняя ошибка сервера

### Текстовые сообщения об ошибках

- `"require auth"` - Требуется авторизация (401)
- `"Forbidden"` - Недостаточно прав (403)
- `"not_found"` - Ресурс не найден (404)
- `"user_not_found"` - Пользователь не найден или неактивен (400)
- `"password_invalid"` - Неверный пароль (400)
- `"error name"` - Ошибка валидации имени (400)
- `"error money"` - Ошибка валидации суммы (400)
- `"error id"` - Ошибка валидации ID (400)
- `"error price"` - Ошибка валидации цены (400)
- `"not found instructor"` - Инструктор не найден (400)

### Формат ошибок валидации (io-ts)

При ошибках валидации возвращается массив объектов с описанием ошибок:

```json
[
  {
    "value": "некорректное значение",
    "context": [
      {
        "key": "login",
        "type": {
          "name": "string"
        },
        "actual": "некорректное значение"
      }
    ],
    "message": "Invalid value..."
  }
]
```

---

## Безопасность

### ⚠️ Важные замечания

1. **Отсутствие авторизации на финансовых endpoints:**
   - Большинство endpoints в `/api/money` не требуют авторизации
   - Рекомендуется добавить middleware `IsSignIn` на все финансовые операции
   - Endpoint `/api/money/files` частично проверяет роль `Instructor`, но не требует авторизации

2. **Хеширование паролей:**
   - Пароли хранятся в хешированном виде с использованием библиотеки `password-hash`
   - При регистрации пароль автоматически хешируется

3. **Сессии:**
   - Сессии хранятся в базе данных через `PrismaSessionStore`
   - Время жизни сессии: 7 дней
   - Cookie не защищены флагом `secure` (для разработки)

4. **Валидация данных:**
   - Все входные данные валидируются через библиотеку `io-ts`
   - При ошибках валидации возвращается детальное описание проблемы

5. **FreeKassa:**
   - Webhook endpoint не проверяет подпись запросов
   - Необходимо добавить проверку подписи `SIGN` перед обработкой платежей

---

## Примеры использования

### Полный цикл работы с пользователем

```bash
# 1. Проверка авторизации
curl -X GET http://localhost:3000/api/user/is_auth

# 2. Авторизация
curl -X POST http://localhost:3000/api/user/auth \
  -H "Content-Type: application/json" \
  -d '{"login": "admin", "password": "password123"}' \
  -c cookies.txt

# 3. Получение списка пользователей (требует авторизации)
curl -X GET http://localhost:3000/api/user/all \
  -b cookies.txt

# 4. Создание нового пользователя
curl -X POST http://localhost:3000/api/user/add \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "login": "newuser",
    "role": "Instructor",
    "instructor_id": 1
  }'

# 5. Выход
curl -X POST http://localhost:3000/api/user/logout \
  -b cookies.txt
```

### Работа с финансами

```bash
# 1. Получение списка инструкторов
curl -X GET http://localhost:3000/api/money/instructors

# 2. Создание инструктора
curl -X PUT http://localhost:3000/api/money/instructor \
  -H "Content-Type: application/json" \
  -d '{"name": "Новый инструктор"}'

# 3. Создание файла
curl -X PUT http://localhost:3000/api/money/file \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Файл 1",
    "instructor_id": 1,
    "fallaf_price": 500.00,
    "dev_price": 100.00
  }'

# 4. Получение истории разработчика
curl -X GET http://localhost:3000/api/money/dev/history
```

---

## Версионирование

В текущей версии API версионирование не используется. Все endpoints доступны по базовому пути без указания версии.

---

## Поддержка

При обнаружении проблем или необходимости добавления новых endpoints, пожалуйста, создайте issue в репозитории проекта.
