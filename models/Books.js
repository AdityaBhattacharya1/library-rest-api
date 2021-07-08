const mongoose = require('mongoose')

const BookScheme = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: String,
		description: String,
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Books', BookScheme)
