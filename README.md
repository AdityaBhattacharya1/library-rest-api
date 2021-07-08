# Library REST API

A sample rest API for a hypothetical library.

# Table of Contents

-   [Technologies Used](#tech-used)
-   [Features](#features)
-   [Environment Variables](#environment-variables)
-   [Project Structure](#project-structure)
-   [API Documentation](#api-documentation)
-   [Authentication](#authentication)
-   [Rate Limit](#rate-limit)
-   [To Clone](#to-clone)
-   [To Start](#to-start)
-   [Contributing](#contributing)
-   [License](#license)
-   [Todo](#todo)

# Technologies used:

-   **Node.js**
-   **Express**
-   **MongoDB**
-   **Mongoose**
-   **Docker**

# Features

-   **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
-   **Authentication and authorization**: using [JWT](https://jwt.io/)
-   **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
-   **Dependency management**: with [NPM](https://npmjs.com)
-   **Environment variables support**: using [dotenv](https://github.com/motdotla/dotenv)
-   **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
-   **Santizing**: sanitize request data against XSS and query injection
-   **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
-   **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
-   **Docker support**
-   **Rate limits**: controlled request inflow using [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)

# Environmental Variables

```bash
# URL of the MongoDB
DB_URL=mongodb://localhost:27017/library

# Port number (defaults to 8000 in case the port value is not specified)
PORT=3000

# JWT secret
JWT_SECRET=samplepasswordwhichisdefinitelynotmyrealpassword

# Expiration limit of JWT tokens.
JWT_EXPIRE_TIME=1h

# Number of salt rounds used in hashing the passwords
SALT_ROUNDS=5
```

A sample .env is present in the root of the project as [`.sample.env`](.sample.env)

# Project Structure

```
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--utils\          # Utility functions
 |--app.js          # Express app + REST API entry point
```

# API Documentation

You can find a more thorough documentation for the API endpoints [here](API_DOCS.md).

## API Endpoints

List of available routes:

**General routes**:\
`GET /api/books/` - get all books stored in the DB\
`GET /api/books/{id}` - get book by id\
`GET /api/books/author/{author's name}` - get book by author\
`GET /api/books/random` - get a random book\

**Auth routes**:\
`POST /api/books/new` - create a new book\
`PATCH /api/books/update/{id}` - update a new book\
`PATCH /api/books/delete/{id}` - delete a pre-existing book\

**User routes**:\
`POST /api/user/login` - login as a user\
`POST /api/user/register` - create a user\

# Authentication

To require authentication for certain routes, you can use the `verify` middleware.

```javascript
const express = require('express')
const verify = require('../middleware/verifyToken')

const router = express.Router()

router.post('/api/protected-route', verify, (req, res) => {
	res.json({ data: 'Some data that you should not access' })
})
```

These routes require a valid JWT access token in the Authorization request header using a `auth-token` header. If the request does not contain a valid access token, an Unauthorized (401) error is thrown.

**Generating Access Tokens**:

An access token can be generated by making a successful call to the login (`POST /api/user/login`) endpoint. The response of this endpoint also contains refresh tokens (explained below).

An access token is valid for 1 hour. You can modify this expiration time by changing the `JWT_EXPIRE_TIME` environment variable in the .env file.

**Refreshing Access Tokens**:

You can refresh your access token by simply making a successful to the login (`POST /api/user/login`) endpoint.

# Rate Limit

Rate limits have been put in place in order to control the amount of incoming requests to the server.
**General and Auth routes**: 100 requests / 15 minutes

# To Clone

```
  git clone https://github.com/AdityaBhattacharya1/library-rest-api
```

# To Start

## Requirements

-   [mongoDB](https://docs.mongodb.com/manual/installation/)
-   [Docker](https://www.docker.com/get-started)

```bash
# run the mongo db server
mongod
```

```bash
npm install
npm run dev
```

  <h3>OR</h3>

```bash
# use -d flag to run in background
docker-compose up

# Tear down
docker-compose down

# To be able to edit files, add volume to compose file
volumes: ['./:/usr/src/app']

# To re-build
docker-compose build
```

On success -

```bash
Server started! - server has been started
MongoDB up and running - database server has started
```

If you run it **without** docker, the server should be up at port **3000** of localhost. <br />
If you run it **with** docker, the server should be up at port **8000** of localhost.

## Contributing

Contributions are more than welcome! Please check out the [contributing guide](CONTRIBUTING.md).

## License

[MIT](LICENSE)

# TODO:

-   Add tests
-   Add more user routes (forgot password, reset password, etc.)
-   Add user roles
-   Update API docs
