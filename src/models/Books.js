const mongoose = require('mongoose')

const BookScheme = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: { type: String, default: 'No author specified.' },
		description: { type: String, default: 'No description specified.' },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Books', BookScheme)
