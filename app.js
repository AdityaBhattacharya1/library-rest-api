const express = require('express')
const mongoose = require('mongoose')

// Primary routes
const BookRoutes = require('./routes/Books')

const app = express()

// Middleware
app.use(express.json())

// Database
const connectionLink = 'mongodb://localhost/library'

mongoose.connect(connectionLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.once('open', () => {
    console.log('MongoDB up and running')
})

// Routes
app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.use('/books', BookRoutes)

// App start
const port = 3000

app.listen(port, console.log(`Server started on port ${port}`))
