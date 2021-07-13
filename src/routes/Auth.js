const router = require('express').Router()
const User = require('../models/User')
const { registerValidation, loginValidation } = require('../utils/validation')
const logger = require('../config/logger')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { logToConsole } = require('../utils/logToConsole')

router.post('/register', async (req, res) => {
	const { error } = registerValidation(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	// check if user exists
	const emailExists = await User.findOne({ email: req.body.email })
	if (emailExists) return res.status(400).send('Email already exists!')

	// hash the password (convert it to Number since dotenv by default converts to Strings)
	const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS || 10))
	const hashedPassword = await bcrypt.hash(req.body.password, salt)

	// create new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
	})
	try {
		const savedUser = await user.save()
		logToConsole(savedUser)
		res.status(201).send('User created successfully!')
	} catch (err) {
		logger.error(err)
		res.status(400).send(
			'An error occurred in account creation. Please try again.'
		)
	}
})

router.post('/login', async (req, res) => {
	const { error } = loginValidation(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	// check if user's email exists
	const user = await User.findOne({ email: req.body.email })
	// vague error message for miniscule improvement in security.
	if (!user) return res.status(400).send('Email or password is incorrect')

	// check if password is correct
	const validPass = await bcrypt.compare(req.body.password, user.password)
	if (!validPass) return res.status(400).send('Invalid password')

	// Create and assign a token
	const token = jwt.sign(
		{ _id: user._id, role: user.role },
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRE_TIME || '1h',
		}
	)
	res.header('auth-token', token).send(token)
})

module.exports = router
