const mongoose = require('mongoose')

const TwoFactorSchema = new mongoose.Schema(
	{
		email: { type: String, required: true},
		memoName: { type: String, required: true },
        connectionID: { type: String, required: true }

	},
	{ collection: 'emailMemoCon' }
)

const twoFactorModel = mongoose.model('TwoFactorSchema', TwoFactorSchema)

module.exports = twoFactorModel
