const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = mongoose.model('userModel', new Schema({
	name: { type: String },
	github: { type: String },
	email: { type: String },
	twitter: { type: String },
	mobile: { type: String },
}, {
	toJSON: {
		transform(doc, ret) {
			//   ret.userId = ret._id;
			delete ret.createdAt
			delete ret.updatedAt
			delete ret.__v
			delete ret._id
		},
	},
	timestamps: true,
}))
