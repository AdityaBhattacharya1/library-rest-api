const express = require('express')
const router = express.Router()
const Book = require('../models/Books')

/*
Key
---
    Types of routes:
    1. Get all books (GET)
    2. Get book by id (GET)
    3. Get book by author's name (GET)
    4. Create new entry of book (POST)
    5. Update book content (PATCH)
    6. Delete entry of book (DELETE)
    7. Get random book (GET)

*/

// 1. Get all books (GET)
router.get('/', async (_, res) => {
    const books = await Book.find()
    res.json(books)
})

// 2. Get book by id (GET)
router.get('/get/:id', async (req, res) => {
    const specificBook = await Book.findById({ _id: req.params.id })
    res.json(specificBook)
})

// 3. Get book by author's name (GET)
router.get('/author/:name', async (req, res) => {
    const authoredBook = await Book.find({
        author: req.params.name.replace(/-/g, ' '),
    })
    res.json(authoredBook)
})

// 4. Create new entry of book (POST)
router.post('/new', async (req, res) => {
    const newBook = new Book(req.body)

    const savedBook = await newBook.save()
    res.json(savedBook)
})

// 5. Update book content (PATCH)
router.patch('/update/:id', async (req, res) => {
    const book = await Book.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.json(book)
})

// 6. Delete entry of book (DELETE)
router.delete('/delete/:id', async (req, res) => {
    const result = await Book.findByIdAndDelete(req.params.id)
    res.json(result)
})

// 7. Get random book (GET)
router.get('/random', async (req, res) => {
    const count = await Book.countDocuments()
    const random = Math.floor(Math.random() * count)
    const bookName = await Book.findOne().skip(random)

    res.json(bookName)
})

module.exports = router
