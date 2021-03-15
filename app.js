const express = require('express')
const mongoose = require('mongoose')

// Primary routes
const BookRoutes = require('./routes/Books')

const app = express()

// Middleware
app.use(express.json())

// Database
// Note: If you want to run the REST API locally without Docker, use connectionLink: mongodb://mongo:27017/library instead.
const connectionLink = 'mongodb://mongo:27017/library'

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

// Routes
app.get('/', (_, res) => {
    res.send('Hello world!')
})

app.use('/books', BookRoutes)

// App start
const port = 3000

app.listen(port, console.log(`Server started!`))
