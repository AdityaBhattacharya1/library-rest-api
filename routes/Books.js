const express = require('express')
const router = express.Router()
const Book = require('../models/Books')
const verify = require('../utils/verifyToken')
const { bookValidation } = require('../utils/validation')

/*
Key
---
    Types of routes:
    1. Get all books (GET)
    2. Get book by id (GET)
    3. Get book by author's name (GET)
    4. Create new entry of book (POST) - Auth protected
    5. Update book content (PATCH) - Auth protected
    6. Delete entry of book (DELETE) - Auth protected
    7. Get random book (GET)

*/

// 1. Get all books (GET)
router.get('/', verify, async (_, res) => {
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
router.post('/new', verify, async (req, res) => {
	const { error } = bookValidation(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const newBook = new Book(req.body)

	const savedBook = await newBook.save()
	res.json(savedBook)
})

// 5. Update book content (PATCH)
// Using a PATCH req instead of PUT because I'm not replacing the resource, just updating the values.
router.patch('/update/:id', verify, async (req, res) => {
	const { error } = bookValidation(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const book = await Book.updateOne(
		{ _id: req.params.id },
		{ $set: req.body }
	)
	res.json(book)
})

// 6. Delete entry of book (DELETE)
router.delete('/delete/:id', verify, async (req, res) => {
	const result = await Book.findByIdAndDelete(req.params.id)
	res.json(result)
})

// 7. Get random book (GET)
router.get('/random', async (_, res) => {
	const count = await Book.countDocuments()
	const random = Math.floor(Math.random() * count)
	const bookName = await Book.findOne().skip(random)

	res.json(bookName)
})

module.exports = router
