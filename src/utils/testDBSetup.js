const User = require('../models/User')
const Books = require('../models/Books')
const bcrypt = require('bcryptjs')

const createTestUser = async () => {
	const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS || 10))
	const hashedPassword = await bcrypt.hash(
		'totallysecurepasswordnohaxpls',
		salt
	)
	const testUser = new User({
		name: 'Test Boi',
		email: 'testing@testtest.com',
		password: hashedPassword,
	})
	await testUser.save()
}

const createTestBooks = async () => {
	const testBooks = [
		{
			title: 'Test Book 1',
			author: 'John Doe',
			description:
				'Thriller book which will bring you to the edge of your seat',
		},
		{ title: 'Test Book 2', author: 'Butter dog', description: 'egg' },
	]
	await Books.insertMany(testBooks)
}

module.exports.createTestUser = createTestUser
module.exports.createTestBooks = createTestBooks
