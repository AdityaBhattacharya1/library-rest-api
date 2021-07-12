const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)
const Books = require('../src/models/Books')
const mongoose = require('mongoose')

const { createTestBooks } = require('../src/utils/testDBSetup')

describe('test', () => {
	beforeEach(() => {
		createTestBooks()
	})

	afterAll(async () => {
		await Books.deleteMany({})
		await mongoose.connection.close()
	})

	it('Should get 2 books from the books endpoint', async () => {
		const res = await request
			.get('/api/books/')
			.expect('Content-Type', /json/)
			.expect('Content-Length', '425')

		expect(res.status).toBe(200)
	})

	it('Should get 0 books by id from the /get endpoint', async () => {
		const res = await request.get('/api/books/get/nonexistentbook')

		expect(res.status).toBe(200)
		expect(res.body).toEqual([])
	})

	it('Should get 1 book by author Butter Dog from the /author endpoint', async () => {
		const res = await request
			.get('/api/books/author/Butter-Dog')
			.expect('Content-Type', /json/)
			.expect('Content-Length', '2')

		expect(res.status).toBe(200)
	})

	it('Should get 0 books from the random book endpoint', async () => {
		const res = await request
			.get('/api/books/random')
			.expect('Content-Type', /json/)

		expect(res.status).toBe(200)
	})
})
