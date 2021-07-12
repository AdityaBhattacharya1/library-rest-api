const User = require('../models/User')
const bcrypt = require('bcryptjs')

async function testDBSetup() {
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

module.exports.testDBSetup = testDBSetup
