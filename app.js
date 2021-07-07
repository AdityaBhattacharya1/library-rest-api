const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// Primary routes
const BookRoutes = require('./routes/Books')
const AuthRoutes = require('./routes/Auth')

const app = express()

// Middleware
app.use(express.json())

// Database
const connectionLink = process.env.DB_URL

mongoose
	.connect(connectionLink, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((err) => console.log(err))

const db = mongoose.connection
db.once('open', () => {
	console.log('MongoDB up and running')
})

// Home route
app.get('/api', (_, res) => {
	res.send('Hello world!')
})

// Route middleware
app.use('/api/books', BookRoutes)
app.use('/api/user/', AuthRoutes)

app.listen(process.env.PORT, console.log(`Server started!`))
