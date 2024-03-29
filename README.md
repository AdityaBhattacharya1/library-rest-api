<h1 align="center">Library REST API</h1>
<p align="center">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" />
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/adityabhattacharya1/library-rest-api/api-ci-test.yml?style=for-the-badge">
	
   > A sample rest API for a hypothetical library.
</p>

# Table of Contents

-   [Technologies Used](#technologies-used)
-   [Features](#features)
-   [Environment Variables](#environmental-variables)
-   [Project Structure](#project-structure)
-   [API Documentation](#api-documentation)
-   [Authentication](#authentication)
-   [Rate Limit](#rate-limit)
-   [Linting](#linting)
-   [Testing](#testing)
-   [To Clone](#to-clone)
-   [To Start](#to-start)
-   [Contributing](#contributing)
-   [License](#license)

# Technologies Used:

-   **Node.js**
-   **Express**
-   **MongoDB**
-   **Mongoose**
-   **Docker**

# Features

-   **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
-   **Authentication and authorization**: using [JWT](https://jwt.io/)
-   **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
-   **Testing**: using [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest)
-   **Logging**: using [log4js-node](https://log4js-node.github.io/log4js-node/)
-   **Dependency management**: with [NPM](https://npmjs.com)
-   **Environment variables support**: using [dotenv](https://github.com/motdotla/dotenv)
-   **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
-   **Sanitizing**: sanitize request data against XSS and query injection
-   **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
-   **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
-   **Docker support**
-   **Continuous Integration**: using [Github Actions](https://docs.github.com/en/actions)
-   **Linting and code quality plugins**: using [eslint](https://eslint.org/)
-   **Rate limits**: controlled request inflow using [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)

# Environmental Variables

```bash
# Node environment
NODE_ENV=production || dev || test

# URL of the MongoDB
DB_URL=mongodb://localhost:27017/library

# URL of the production DB (used when NODE_ENV is set to 'production')
PROD_DB_URL=mongodb+srv://sampledburl

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
 |--__test__\              # Tests
 |--.github\               # Github workflows
 |--src\                   # Source folder - contains the models, configs, utils and controllers
        |--config\         # Config files
        |--middleware\     # Config files
        |--models\         # Mongoose models (data layer)
        |--routes\         # Routes
        |--utils\          # Utility functions
 |--app.js                 # Express app
 |--server.js              # REST API entry point
```

# API Documentation

You can find a more thorough documentation for the API endpoints [here](API_DOCS.md).

## API Endpoints

List of available routes:

**General routes**:\
`GET /api/books/` - get all books stored in the DB\
`GET /api/books/{id}` - get book by id\
`GET /api/books/author/{author's name}` - get book by author

**Auth routes**:\
`POST /api/books/new` - create a new book\
`PATCH /api/books/update/{id}` - update a new book\
`PATCH /api/books/delete/{id}` - delete a pre-existing book

**User routes**:\
`POST /api/user/login` - login as a user\
`POST /api/user/register` - create a user

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

You can refresh your access token by simply making a successful `POST` request to the login (`POST /api/user/login`) endpoint.

# Rate Limit

Rate limits have been put in place in order to control the amount of incoming requests **from a single IP address** to the server.\
**General and Auth routes**: 100 requests / 15 minutes for a single IP address\
**Register route**: 5 requests / 1 hr for a single IP address

# Linting

Linting is done using [ESLint](https://eslint.org/).

```sh
# To run eslint
npm run lint

# To fix eslint errors
npm run lint:fix
```

To modify the ESLint configuration, update the `.eslintrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore`.

# Testing

```sh
# run all tests
npm run test

# run all tests in watch mode
npm run test:watch

# run test coverage
npm run coverage
```

# To Clone

```
  git clone https://github.com/AdityaBhattacharya1/library-rest-api
```

# To Start

## Requirements

-   [MongoDB](https://docs.mongodb.com/manual/installation/)
-   [Docker](https://www.docker.com/get-started)

```bash
# run the mongo db server
mongod
```

```bash
# run normally
npm install
npm run dev
```

  <h3>OR</h3>

```bash
# run in a docker container using the npm script provided
npm run docker
```

<h3>OR</h3>

```bash
# using docker commands
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
[DEBUG] Output - Server started
[DEBUG] Output - MongoDB up and running
```

If you run it **without** docker, the server should be up at port **3000** of localhost. <br />
If you run it **with** docker, the server should be up at port **80** of localhost.

# Contributing

If you want to contribute to the project, feel free to do so.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT](LICENSE)
