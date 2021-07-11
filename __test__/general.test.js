const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)
const Books = require('../src/models/Books')
process.env.NODE_ENV = 'test'

describe('test', () => {
	beforeEach(() => {
		Books.deleteMany({})
	})
	it('Should get 0 books from the books endpoint', async () => {
		const res = await request.get('/api/books/')
		expect(res.status).toBe(200)
		expect(res.body).toEqual([])
	})

	it('Should get 0 books by id from the /get endpoint', async () => {
		const res = await request.get('/api/books/get/nonexistentbook')
		expect(res.status).toBe(200)
		expect(res.body).toEqual([])
	})

	it('Should get 0 books by author from the /author endpoint', async () => {
		const res = await request.get('/api/books/author/nonexistentauthor')
		expect(res.status).toBe(200)
		expect(res.body).toEqual([])
	})

	it('Should get 0 books from the random book endpoint', async () => {
		const res = await request.get('/api/books/random')
		expect(res.status).toBe(200)
		expect(res.body).toEqual([])
	})
})
