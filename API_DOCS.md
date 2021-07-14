# API Documentation

# General Routes

These routes do not require any prior authentication. Refer to the [Rate Limiting](README.md/#rate-limit) section in the [README](README.md) file for information on the rate limits for these routes.

## Home Route

```http
  GET /api/
```

| Parameter | Type  | Description                                   |
| :-------- | :---- | :-------------------------------------------- |
| None      | `GET` | Home route. Greets you with a 'Hello world!'. |

<hr />
<br />

## Get All Books

```http
  GET /api/books/${title}
```

| Parameter        | Type  | Description                                                                                                                                                         |
| :--------------- | :---- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Title (Optional) | `GET` | Gets all the books that are stored in the database. If the title parameter is passed, then it gets all the books having title like the parameter (Case insensitive) |

<hr />
<br />

## Get Books By ID

```http
  GET /api/books/${id}
```

| Parameter | Type  | Description                                                                           |
| :-------- | :---- | :------------------------------------------------------------------------------------ |
| id        | `GET` | Substitute `${id}` for the id of the book. The JSON output will show the desired book |

Example:

```http
  http://localhost:3000/books/get/5099803df3f4948bd2f98391
```

<hr />
<br />

## Get All Books By Certain Author

```http
  GET /api/books/author/${name}
```

| Parameter | Type  | Description                                                                                                                                                                         |
| :-------- | :---- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id        | `GET` | Substitute `${name}` for the name of the author (Case insensitive). The JSON output will return the books authored (an array, if there are multiple entries or just a JSON object). |

<br />

### Example: <br />

Input:

```sh
 # A book authored by Dan Brown is already stored in the DB
  http://localhost:3000/books/author/dan-brown
```

Output: <br />

1. Single Entry

```json
{
	"title": "The Da Vinci Code",
	"author": "Dan Brown",
	"description": "..."
}
```

2. Multiple Entries

```json
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

# Auth routes

These routes require prior authentication. Refer to the [Rate Limiting](README.md/#rate-limit) section in the [README](README.md) file for information on the rate limits for these routes.

## Create New Entry Of Book

```http
  POST /api/books/new
```

| Parameter | Type   | Description                                                             |
| :-------- | :----- | :---------------------------------------------------------------------- |
| None      | `POST` | Create new book. Title is required, author and description are optional |

<hr />
<br />

## Update Book Data

```http
  PATCH /api/books/update/${id}
```

| Parameter | Type    | Description                                                                                                              |
| :-------- | :------ | :----------------------------------------------------------------------------------------------------------------------- |
| None      | `PATCH` | Substitute `${id}` for the id of the book. Enter the fields which are to be updated in JSON format and send the request. |

Example:

```
// Before making the request, ensure that you include the updated data in the request body.
  http://localhost:3000/books/update/5099803df3f4948bd2f98391
```

<hr />
<br />

## Delete Book

```http
  DELETE /api/books/delete/${id}
```

| Parameter | Type     | Description                                                                                                                                                                   |
| :-------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| None      | `DELETE` | Substitute `${id}` for the id of the book. The JSON output will show the deleted book. You can check if the book has indeed been deleted by going to the Get All Books route. |

Example:

```sh
# Before making the request, ensure that you include the updated data in the request body.
  http://localhost:3000/books/delete/5099803df3f4948bd2f98391
```

<hr />
<br />

# User Routes

These routes are used to create and access users in the DB. Refer to the [Rate Limiting](README.md/#rate-limit) section in the [README](README.md) file for information on the rate limits for these routes.

**NOTE**:

-   For registering the user, the request body should be in the following format:

```json
{
	"name": "sample name",
	"email": "valid_email@test.com",
	"password": "extremelysecurepassword"
}
```

-   For logging in, the request body should be in the following format:

```json
{
	"email": "valid_email@test.com",
	"password": "extremelysecurepassword"
}
```

-   The following are the validation thresholds. If these thresholds are not met, an error with status Bad Request (201) will be thrown.

```js
  name: {
    		type: String,
    		required: true,
    		min: 6,
    		max: 255,
    	},
  email: {
    		type: String,
    		required: true,
    		max: 255,
    		min: 6,
    	},
  password: {
    		type: String,
    		required: true,
    		min: 8,
    	}
```

## Register User

```http
  POST api/user/register/
```

| Parameter | Type   | Description                  |
| :-------- | :----- | :--------------------------- |
| None      | `POST` | Create a new user in the DB. |

Example:

```sh
# Before making the request, ensure that you include the details of the user in the request body.
  http://localhost:3000/api/users/register
```

<hr />
<br />

## Login User

```http
  POST api/user/login
```

| Parameter | Type   | Description  |
| :-------- | :----- | :----------- |
| None      | `POST` | Login users. |

Example:

```sh
# Before making the request, ensure that you include the details of the user in the request body.
  http://localhost:3000/api/users/register
```

You should receive a JWT token as a response on successfully signing in. You can then access the auth routes by setting an `auth-token` header with the JWT token as its value in the request.

**NOTE**: The JWT tokens will expire after 1 hour (by default. You can change this behaviour by updating the `JWT_TOKEN_EXPIRY` in the `.env` file). In order to refresh the token, you will have to successfully sign in.

<hr />
<br />
