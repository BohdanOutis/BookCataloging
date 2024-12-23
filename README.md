Опис проекту

Book Cataloging System — це API для управління каталогом книг. Функціонал включає реєстрацію користувачів, додавання книг, оцінки та коментарі, управління жанрами, авторами, історією читання та виданнями. Проект підтримує REST і GraphQL API.

Як запустити проект

Кроки:

1. Клонування репозиторію:

git clone https://github.com/BohdanOutis/BookCataloging.git
cd BookCataloging

2. Встановлення залежностей:
Використовуйте Yarn або npm для встановлення залежностей:

yarn install
# або
npm install

3. Налаштування змінних середовища:
Створіть файл .env у кореневій папці проекту та додайте наступні змінні:

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=book_catalog
JWT_SECRET=your_jwt_secret

4. Запуск бази даних:
Переконайтеся, що PostgreSQL запущено, та створіть базу даних з ім’ям book_catalog (або іншим, зазначеним у .env).

5. Запуск міграцій:
Застосуйте міграції для створення структури бази даних:

yarn typeorm migration:run
# або
npm run typeorm migration:run

6. Запуск проекту:
Для запуску у режимі розробки використовуйте:

yarn start:dev
# або
npm run start:dev

7. Доступ до API:

REST API доступний за адресою: http://localhost:3000/api

GraphQL API доступний за адресою: http://localhost:3000/graphql

Приклади використання API

REST API

Реєстрація користувача

POST /users

{
  "username": "JohnDoe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}

Додавання книги

POST /books

{
  "title": "The Great Gatsby",
  "description": "A classic novel by F. Scott Fitzgerald",
  "coverUrl": "https://example.com/cover.jpg",
  "genres": [1, 2],
  "authors": [3]
}

GraphQL API

Запит списку книг

query {
  books {
    id
    title
    description
    genres {
      name
    }
    authors {
      name
    }
    averageRating
  }
}

Додавання книги

mutation {
  createBook(input: {
    title: "The Great Gatsby",
    description: "A classic novel by F. Scott Fitzgerald",
    coverUrl: "https://example.com/cover.jpg",
    genres: [1, 2],
    authors: [3]
  }) {
    id
    title
  }
}

Структура бази даних
·   	**Користувачі (users):**
·   	- id (Primary Key)
·   	- username (string)
·   	- email (string)
·   	- password (hashed string)
·   	- createdAt (date)
·   	- updatedAt (date)
·   	**Книги (books):**
·   	- id (Primary Key)
·   	- title (string)
·   	- description (text)
·   	- coverUrl (string, URL до обкладинки книги)
·   	- addedByUserId (Foreign Key до users.id)
·   	- addedAt (date)
·   	- averageRating (float, обчислюється з оцінок)
·   	- Зв'язки: Many-to-Many з genres, Many-to-Many з authors, One-to-Many з comments, One-to-Many з ratings
·   	**Автори (authors):**
·   	- id (Primary Key)
·   	- name (string)
·   	- bio (text, необов'язково)
·   	- Зв'язки: Many-to-Many з books
·   	**Жанри (genres):**
·   	- id (Primary Key)
·   	- name (string, унікальне)
·   	- Зв'язки: Many-to-Many з books
·   	**Рейтинги (ratings):**
·   	- id (Primary Key)
·   	- rating (int, від 1 до 5)
·   	- userId (Foreign Key до users.id)
·   	- bookId (Foreign Key до books.id)
·   	**Коментарі (comments):**
·   	- id (Primary Key)
·   	- content (text)
·   	- userId (Foreign Key до users.id)
·   	- bookId (Foreign Key до books.id)
·   	- createdAt (date)
·   	**Історія прочитання (reading_history):**
·   	- id (Primary Key)
·   	- userId (Foreign Key до users.id)
·   	- bookId (Foreign Key до books.id)
·   	- dateRead (date)
·   	**Видання (editions):**
·   	- id (Primary Key)
·   	- bookId (Foreign Key до books.id)
·   	- year (int, рік видання)
·   	- publisher (string, видавництво)
