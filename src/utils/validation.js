const joi = require('@hapi/joi')

/**
 *
 * @param {Object} data
 * @returns {Object} validated data
 */
const registerValidation = (data) => {
	const schema = joi.object({
		name: joi.string().min(6).required(),
		email: joi.string().min(6).required().email(),
		password: joi.string().min(8).required(),
	})
	return schema.validate(data)
}

/**
 *
 * @param {Object} data
 * @returns {object} validated data
 */
const loginValidation = (data) => {
	const schema = joi.object({
		email: joi.string().min(6).required().email(),
		password: joi.string().min(8).required(),
	})
	return schema.validate(data)
}

/**
 *
 * @param {Object} data
 * @returns {object} validated data
 */
const bookValidation = (data) => {
	const schema = joi.object({
		title: joi.string().min(2).required(),
		author: joi.string().min(2),
		description: joi.string().min(6),
	})

	return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.bookValidation = bookValidation
