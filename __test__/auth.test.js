const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose')
const User = require('../src/models/User')
const Book = require('../src/models/Books')

const { createTestUser, createTestBooks } = require('../src/utils/testDBSetup')

describe('Auth protected routes tests', () => {
	beforeAll(() => {
		createTestUser()
		createTestBooks()
	})

	afterAll(async () => {
		await User.deleteMany({
			email: { $regex: '@testtest.com', $options: 'i' },
		})
		await Book.deleteMany({})
		await mongoose.connection.close()
	})

	describe('Unauthenticated, unauthorized and incomplete requests', () => {
		it('should return a 400 response as no request body is passed', async () => {
			const res = await request.post('/api/user/login')

			expect(res.status).toBe(400)
		})

		it('should return a 400 response as no request body is being passed', async () => {
			const res = await request.post('/api/user/register')

			expect(res.status).toBe(400)
		})

		it('should return a 400 response as a request body with email which already exists in the DB is being passed', async () => {
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

		it('should return a 401 response as there is no auth token being passed', async () => {
			const res = await request
				.post('/api/books/new')
				.expect((response) => (response.body = 'Access denied!'))

			expect(res.status).toBe(401)
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

	describe('Authenticated and authorized requests', () => {
		it('should return a 200 response as valid user credentials have been passed', async () => {
			const testUser = {
				email: 'testing@testtest.com',
				password: 'totallysecurepasswordnohaxpls',
			}

			const res = await request.post('/api/user/login').send(testUser)

			expect(res.status).toBe(200)
		})

		it('should return a 201 response as valid request body is being passed and a user is successfully created', async () => {
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

		it('Should return the appropriate responses instead of 401s', async () => {
			const testUser = {
				email: 'testing2@testtest.com',
				password: 'totallysecurepasswordnohaxpls',
			}

			const response = await request
				.post('/api/user/login')
				.send(testUser)

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
				.post('/api/books/new')
				.set('auth-token', response.text)
				.expect(400)

			await request
				.patch('/api/books/update/nonexistentbook')
				.set('auth-token', response.text)
				.expect(400)

			await request
				.patch('/api/books/update/60ee8f6f3bff4b1734d328bf') // this is a sample objectID. It does not exist in the DB.
				.set('auth-token', response.text)
				.send({ title: 'Invalid book' })
				.expect(404)
				.expect('No book found by that ID')

			await request
				.delete('/api/books/delete/nonexistentbook')
				.set('auth-token', response.text)
				.expect(404)
				.expect('Could not find a book by that ID')
		})

		it('Should return 200 responses as valid URL parameters are being passed', async () => {
			const res = await request.get('/api/books/').expect(200)

			const testUser = {
				email: 'testing2@testtest.com',
				password: 'totallysecurepasswordnohaxpls',
			}

			const response = await request
				.post('/api/user/login')
				.send(testUser)
				.expect(200)

			const id = await res.body[0]._id

			await request.get(`/api/books/get/${id}`).expect(200)

			await request
				.patch(`/api/books/update/${id}`)
				.set('auth-token', response.text)
				.send({ title: 'Updated title' })
				.expect(200)

			await request
				.delete(`/api/books/delete/${id}`)
				.set('auth-token', response.text)
				.expect(200)
		})
	})
})
