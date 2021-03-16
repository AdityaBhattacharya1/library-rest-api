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

# Routes / API endpoints available:

## Home route

**Link**: / <br />
**Type**: GET <br />
**Function**: Home route. Greets you with a 'Hello world!'. <br />

## Get All Books route

**Link**: /books/<br />
**Type**: GET<br />
**Function**: Gets all the books that are stored in the database<br />

## Get Books By ID route

**Link**: /books/get/`:id`<br />
**Type**: GET<br />
**Function**: Substitute `:id` for the id of the book. The JSON output will show the desired book<br />
**Sample**:

### Input-

```
http://localhost:3000/books/get/5099803df3f4948bd2f98391
:: This is a sample id.
```

## Get All Books By Certain Author route

**Link**: /books/author/`:name`<br />
**Type**: GET<br />
**Function**: Substitute `:name` for the name of the author. The JSON output will show all the desired books<br />
**Note**: While substituting for `:name`, ensure that you replace the whitespace in the name with hyphens (-) and maintain the punctuation of the name. </br >
Example: <br />
_Context_: A GET request for the book 'The Da Vinci Code' by _Dan Brown_, which is already stored in your database. The input and outputs for both scenarios are given below: <br />

### Input-

```
http://localhost:3000/books/author/Dan-Brown

:: Note that the first letters of the first-name and last-name have been capitalized.
:: Also, the whitespace has been substituted for a hyphen (-)
```

### Outputs-

<br />

**In case of only a single entry for a book authored by Dan Brown-**

```
{
    "title": "The Da Vinci Code",
    "author": "Dan Brown",
    "description": "..."
}
```

**In case of multiple entries of books authored by Dan Brown-**

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

## Create New Entry Of Book route

**Link**: /books/new/<br />
**Type**: POST<br />
**Function**: Create new book. Title is required, author and description are optional<br />

## Update Book route

**Link**: /books/update/`:id`<br />
**Type**: PATCH<br />
**Function**: Substitute `:id` for the id of the book. Enter the fields which are to be updated in JSON format and send the request.<br />
**Sample**:

### Input-

```
http://localhost:3000/books/update/5099803df3f4948bd2f98391
:: Before sending the request, ensure that you include the changes in the request body
```

## Delete Book By ID route

**Link**: /books/delete/`:id`<br />
**Type**: DELETE<br />
**Function**: Substitute `:id` for the id of the book. The JSON output will show the deleted book. You can check if the book has indeed been deleted by going to the Get All Books route. <br />
**Sample**:

### Input-

```
http://localhost:3000/books/delete/5099803df3f4948bd2f98391
:: This is a sample id.
```

## Get Random Book route

**Link**: /books/random<br />
**Type**: GET<br />
**Function**: Fetches a random book from the database.

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
