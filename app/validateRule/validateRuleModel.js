const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = mongoose.model('ruleValidator', new Schema({
	name: { type: String },
	crew: { type: String },
	age: { type: Number },
	position: { type: String },
	missions: { type: Object },
	field: { type: String, required: true },
	condition: { type: String, required: true },
	condition_value: { type: Number, required: true },
}, {
	toJSON: {
		transform(doc, ret) {
			ret.ruleValidatorId = ret._id
			delete ret.createdAt
			delete ret.updatedAt
			delete ret.__v
			delete ret._id
		},
	},
	timestamps: true,
}))
