module.exports = {
	username: String,
	nintendoId: {type: String, index: true, required: true},
	snapshotDate: {type: Date, index: true, required: true},
	savedDate: {type: Date, required: true},
	stats: {
		starCount: Number
	}
}