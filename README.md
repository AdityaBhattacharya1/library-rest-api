# Library REST API

A sample rest API for a hypothetical library.

<br />

# Technologies used:

-   Node.js
-   Express
-   MongoDB
-   Mongoose
-   Docker

<br />

# API Reference

## Home Route

```http
  GET /
```

| Parameter | Type  | Description                                   |
| :-------- | :---- | :-------------------------------------------- |
| None      | `GET` | Home route. Greets you with a 'Hello world!'. |

<hr />
<br />

## Get All Books

```http
  GET /books/
```

| Parameter | Type  | Description                                         |
| :-------- | :---- | :-------------------------------------------------- |
| None      | `GET` | Gets all the books that are stored in the database. |

<hr />
<br />

## Get Books By ID

```http
  GET /books/${id}
```

| Parameter | Type  | Description                                                                           |
| :-------- | :---- | :------------------------------------------------------------------------------------ |
| id        | `GET` | Substitute `${id}` for the id of the book. The JSON output will show the desired book |

Example:

```
  http://localhost:3000/books/get/5099803df3f4948bd2f98391
```

<hr />
<br />

## Get All Books By Certain Author

```http
  GET /books/author/${name}
```

| Parameter | Type  | Description                                                                                                                                                      |
| :-------- | :---- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id        | `GET` | Substitute `${name}` for the name of the author. The JSON output will return the books authored (an array, if there are multiple entries or just a JSON object). |

**Note: While substituting for ${name}, ensure that you replace the whitespace in the name with hyphens (-) and maintain the punctuation of the name.** <br />

### Example: <br />

Input:

```
  // A book authored by Dan Brown is already stored in the DB
  http://localhost:3000/books/author/Dan-Brown
```

Output: <br />

1. Single Entry

```
  {
    "title": "The Da Vinci Code",
    "author": "Dan Brown",
    "description": "..."
}
```

2. Multiple Entries

```
  [
  {
    "title": "The Da Vinci Code",
    "author": "Dan Brown",
    "description": "..."
  },
  {
    "title": "The Lost Symbol",
    "author": "Dan Brown",
    "description": "..."
  },
  {
    "title": "Origin",
    "author": "Dan Brown",
    "description": "..."
  },
  ...
]
```

<hr />
<br />

## Create New Entry Of Book

```http
  POST /books/new
```

| Parameter | Type   | Description                                                             |
| :-------- | :----- | :---------------------------------------------------------------------- |
| None      | `POST` | Create new book. Title is required, author and description are optional |

<hr />
<br />

## Update Book Data

```http
  PATCH /books/update:${id}
```

| Parameter | Type    | Description                                                                                                              |
| :-------- | :------ | :----------------------------------------------------------------------------------------------------------------------- |
| None      | `PATCH` | Substitute `${id}` for the id of the book. Enter the fields which are to be updated in JSON format and send the request. |

Example:

```
// Before making the request, ensure that you include the updated data in the request body.
  http://localhost:3000/books/update/5099803df3f4948bd2f98391
```

<hr /><br />

## Delete Book

```http
  DELETE /books/delete:${id}
```

| Parameter | Type     | Description                                                                                                                                                                   |
| :-------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| None      | `DELETE` | Substitute `${id}` for the id of the book. The JSON output will show the deleted book. You can check if the book has indeed been deleted by going to the Get All Books route. |

Example:

```
// Before making the request, ensure that you include the updated data in the request body.
  http://localhost:3000/books/delete/5099803df3f4948bd2f98391
```

<hr /><br />

## Get Random Book

```http
  GET /books/random
```

| Parameter | Type  | Description                                                                                                              |
| :-------- | :---- | :----------------------------------------------------------------------------------------------------------------------- |
| None      | `GET` | Fetches a random book from the database (Assuming that there are books stored in the DB, else returns empty JSON object) |

<hr />
<br />

# To Clone:

```
  git clone https://github.com/AdityaBhattacharya1/library-rest-api
```

<br />

# To Start

Ensure that you have [mongoDB](https://docs.mongodb.com/manual/installation/) installed before running the server

```
mongod
:: Starts the mongoDB server.
```

```
npm install
npm run dev
```

  <h3>OR</h3>

```
:: Run in Docker
docker-compose up
:: use -d flag to run in background

:: Tear down
docker-compose down

:: To be able to edit files, add volume to compose file
volumes: ['./:/usr/src/app']

:: To re-build
docker-compose build
```

On success -

-   Server started! - server has been started
-   MongoDB up and running - database server has started

_[Note: Both are necessary for full functionality of the REST API. Ensure that you get both these messages in your terminal before sending any requests]_

If you run it **without** docker, the server should be up at port **3000** of localhost. <br />
If you run it **with** docker, the server should be up at port **80** of localhost.
