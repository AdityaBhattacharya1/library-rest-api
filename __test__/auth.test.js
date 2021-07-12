const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose')
const User = require('../src/models/User')

const { createTestUser } = require('../src/utils/testDBSetup')

describe('Auth tests', () => {
	beforeAll(() => {
		createTestUser()
	})

	afterAll(async () => {
		await User.deleteMany({ email: { $eq: 'testing@testtest.com' } })
		await mongoose.connection.close()
	})

	it('should return a 400 response as no request body is passed', async () => {
		const res = await request.post('/api/user/login')

		expect(res.status).toBe(400)
	})

	it('should return a 200 response as valid user credentials have been passed', async () => {
		const testUser = {
			email: 'testing@testtest.com',
			password: 'totallysecurepasswordnohaxpls',
		}

		const res = await request.post('/api/user/login').send(testUser)

		expect(res.status).toBe(200)
	})

	it('should return a 400 response as no request body is being passed', async () => {
		const res = await request.post('/api/user/register')

		expect(res.status).toBe(400)
	})

	it('should return a 401 response as there is no auth token being passed', async () => {
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
