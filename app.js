const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const compression = require('compression')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const mongoose = require('mongoose')
const { logToConsole } = require('./src/utils/logToConsole')
const logger = require('./src/config/logger')

// configure dotenv
require('dotenv').config()

const defaultLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
})

const createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour window
	max: 10, // start blocking after 5 requests
	message:
		'Too many accounts created from this IP, please try again after an hour',
})

// Primary routes
const BookRoutes = require('./src/routes/Books')
const AuthRoutes = require('./src/routes/Auth')

const app = express()

// Middleware

app.use(express.json())

// set security HTTP headers
app.use(helmet())

// sanitize request data
app.use(xss())
// Chances are that the validation middleware will do a lot in preventing injections
app.use(mongoSanitize())

// enable cors
app.use(cors())
app.options('*', cors())

// enable gzip compression
// (However, it is not a great idea to use compression since NodeJS takes up a lot of resources due to its single threaded nature)
app.use(compression())

// Database
// if the node env is prod but prod db url is empty then the connection link defaults to the db url
const connectionLink =
	process.env.NODE_ENV === 'production' && process.env.PROD_DB_URL
		? process.env.PROD_DB_URL
		: process.env.DB_URL || 'mongodb://localhost:27017/library'

mongoose
	.connect(connectionLink, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((err) => logger.error(err))

const db = mongoose.connection

db.once('open', () => {
	logToConsole('MongoDB up and running')
})

// Home route
app.get('/api', (_, res) => {
	res.send('Hello world!')
})

// Route middleware
app.use('/api/books/', defaultLimiter, BookRoutes)
app.use('/api/user/', createAccountLimiter, AuthRoutes)

module.exports = app
