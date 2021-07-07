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

# Features

-

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

# TODO:

-   Add tests
