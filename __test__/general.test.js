const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)
const Books = require('../src/models/Books')
process.env.NODE_ENV = 'test'

describe('test', () => {
	beforeEach(() => {
		Books.deleteMany({})
	})
	it('Gets the books endpoint', async () => {
		const res = await request.get('/api/books/')
		expect(res.status).toBe(200)
		expect(res.body).toEqual([])
	})

	it('Gets the book by id endpoint', async () => {
		const res = await request.get('/api/books/get/nonexistentbook')
		expect(res.status).toBe(200)
		expect(res.body).toEqual([])
	})

	it('Gets the book by author endpoint', async () => {
		const res = await request.get('/api/books/author/nonexistentauthor')
		expect(res.status).toBe(200)
		expect(res.body).toEqual([])
	})

	it('Gets the random book endpoint', async () => {
		const res = await request.get('/api/books/random')
		expect(res.status).toBe(200)
		expect(res.body).toEqual([])
	})
})
