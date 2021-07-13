const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose')
const User = require('../src/models/User')

const { createTestUser } = require('../src/utils/testDBSetup')
// const { logToConsole } = require('../src/utils/logToConsole')

describe('Auth tests', () => {
	beforeAll(() => {
		createTestUser()
	})

	afterAll(async () => {
		await User.deleteMany({ email: { $eq: 'testing@testtest.com' } })
		await User.deleteMany({ email: { $eq: 'testing2@testtest.com' } })
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

	it('should return a 400 response as no request body is being passed', async () => {
		const testUser = {
			name: 'Testing',
			email: 'testing@testtest.com',
			password: 'totallysecurepasswordnohaxpls',
		}
		const res = await request
			.post('/api/user/register')
			.send(testUser)
			.expect((response) => (response.body = 'Email already exists!'))

		expect(res.status).toBe(400)
	})

	it('should return a 201 response as no request body is being passed', async () => {
		const testUser = {
			name: 'Testing',
			email: 'testing2@testtest.com',
			password: 'totallysecurepasswordnohaxpls',
		}
		const res = await request
			.post('/api/user/register')
			.send(testUser)
			.expect(
				(response) => (response.body = 'User created successfully!')
			)

		expect(res.status).toBe(201)
	})

	it('should return a 401 response as there is no auth token being passed', async () => {
		const res = await request
			.post('/api/books/new')
			.expect((response) => (response.body = 'Access denied!'))

		expect(res.status).toBe(401)
	})

	it('Should return the appropriate responses instead of 401s', async () => {
		const testUser = {
			email: 'testing2@testtest.com',
			password: 'totallysecurepasswordnohaxpls',
		}

		const response = await request.post('/api/user/login').send(testUser)

		// logToConsole(response)

		await request
			.post('/api/books/new')
			.set('auth-token', response.text)
			.send({
				title: 'Test title',
				author: 'me',
				description: 'Hello world!',
			})
			.expect(200)

		await request
			.patch('/api/books/update/nonexistentbook')
			.set('auth-token', response.text)
			.expect(400)

		await request
			.delete('/api/books/delete/nonexistentbook')
			.set('auth-token', response.text)
			.expect(400)
			.expect('Could not find a book by that ID')
	})

	it('should return a 401 response as there is no auth token being passed', async () => {
		const res = await request
			.patch('/api/books/update/nonexistentbook')
			.expect((response) => (response.body = 'Access denied!'))

		expect(res.status).toBe(401)
	})

	it('should return a 401 response as there is no auth token being passed', async () => {
		const res = await request
			.delete('/api/books/delete/nonexistentbook')
			.expect((response) => (response.body = 'Access denied!'))

		expect(res.status).toBe(401)
	})
})
