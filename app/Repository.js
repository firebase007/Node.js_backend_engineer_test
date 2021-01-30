class Repository {
	constructor(Model) {
		this.Model = Model
	}

	create(payload = {}) {
		return this.Model.create(payload)
	}

	findOne(condition = {}) {
		delete condition.page
		delete condition.limit
		return this.Model.findOne(condition)
	}

	findById(id) {
		return this.Model.findOne({ _id: id })
	}
}

module.exports = Repository
