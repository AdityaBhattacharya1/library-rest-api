const express = require('express')
const router = express.Router()
const Book = require('../models/Books')
const verify = require('../middleware/verifyToken')
const { bookValidation } = require('../utils/validation')
// const { logToConsole } = require('../utils/logToConsole')

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

*/

// 1. Get all books (GET)
router.get('/:title?', async (req, res) => {
	let books
	if (req.params.title) {
		books = await Book.find({
			title: {
				$regex: req.params.title.replace(/-/g, ' '),
				$options: 'i',
			},
		})
	} else {
		books = await Book.find()
	}
	res.json(books)
})

// 2. Get book by id (GET)
router.get('/get/:id', async (req, res) => {
	try {
		const specificBook = await Book.findById({ _id: req.params.id })
		res.json(specificBook)
	} catch (err) {
		return res.send([])
	}
})

// 3. Get book by author's name (GET)
router.get('/author/:name', async (req, res) => {
	const authoredBook = await Book.find({
		author: { $regex: req.params.name.replace(/-/g, ' '), $options: 'i' },
	})
	res.json(authoredBook)
})

// 4. Create new entry of book (POST)
router.post('/new', verify, async (req, res) => {
	const { error } = bookValidation(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const newBook = new Book(req.body)

	const savedBook = await newBook.save()
	res.json(savedBook).status(200)
})

// 5. Update book content (PATCH)
// Using a PATCH req instead of PUT because I'm not replacing the resource, just updating the values.
router.patch('/update/:id', verify, async (req, res) => {
	const { error } = bookValidation(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const checkIfBookExists = await Book.findById(req.params.id)

	if (!checkIfBookExists) {
		return res.status(404).send('No book found by that ID')
	}

	const book = await Book.updateOne(
		{ _id: req.params.id },
		{ $set: req.body }
	)
	res.json(book)
})

// 6. Delete entry of book (DELETE)
router.delete('/delete/:id', verify, async (req, res) => {
	try {
		const result = await Book.findByIdAndDelete(req.params.id)
		res.json(result)
	} catch (err) {
		res.status(404).send('Could not find a book by that ID')
	}
})

module.exports = router
