const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const compression = require('compression')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const mongoose = require('mongoose')

// configure dotenv
require('dotenv').config()

const defaultLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // limit each IP to 100 requests per windowMs
})

const createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour window
	max: 5, // start blocking after 5 requests
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
app.use(mongoSanitize())

// enable cors
app.use(cors())
app.options('*', cors())

// enable gzip compression
app.use(compression())

// Database
const connectionLink = process.env.DB_URL

mongoose
	.connect(connectionLink, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((err) => console.log(err))

const db = mongoose.connection

if (process.env.NODE_ENV !== 'test') {
	db.once('open', () => {
		console.log('MongoDB up and running')
	})
}

// Home route
app.get('/api', (_, res) => {
	res.send('Hello world!')
})

// Route middleware
app.use('/api/books/', defaultLimiter, BookRoutes)
app.use('/api/user/', createAccountLimiter, AuthRoutes)

module.exports = app
