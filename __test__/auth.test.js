const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)
const Books = require('../src/models/Books')
const User = require('../src/models/User')
const { testDBSetup } = require('../src/utils/testDBSetup')
process.env.NODE_ENV = 'test'

describe('Auth tests', () => {
	beforeAll(() => {
		Books.deleteMany({})
		testDBSetup()
		console.log('Set up db for tests')
	})
	afterEach(() => {
		User.deleteMany({ email: { $eq: 'testing@testtest.com' } })
		console.log('delete all test accounts')
	})
	it('should return a 400 response', async () => {
		const res = await request.post('/api/user/login')
		expect(res.status).toBe(400)
	})
	it('should return a 401 response', async () => {
		const testUser = {
			email: 'testing@testtest.com',
			password: 'totallysecurepasswordnohaxpls',
		}
		const res = await request.post('/api/user/login').send(testUser)

		expect(res.status).toBe(200)
	})
	it('should return a 400 response', async () => {
		const res = await request.post('/api/user/register')
		expect(res.status).toBe(400)
	})
	it('should return a 401 response', async () => {
		const res = await request.post('/api/books/new')

		expect(res.status).toBe(401)
	})
	it('should return a 401 response', async () => {
		const res = await request.patch('/api/books/update/nonexistentbook')

		expect(res.status).toBe(401)
	})
	it('should return a 401 response', async () => {
		const res = await request.delete('/api/books/delete/nonexistentbook')

		expect(res.status).toBe(401)
	})
})
