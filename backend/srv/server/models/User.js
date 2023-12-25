const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	firstname: {
		type: String,
	},

	lastname: {
		type: String,
	},

	cnp: {
		type: String,
		unique: true,
	},

	email: {
		type: String,
		unique: true,
	},

	username: {
		type: String,
		unique: true,
	},

	password: {
		type: String,
	},

	date_started: {
		type: Date,
	},

	date_end: {
		type: Date,
	},

	position: {
		type: String,
	},

	salary: {
		type: Number,
	},

	pc: {
		type: Map,
	},

	car: {
		type: Map,
	},

	comments: {
		type: Array,
	},
});

module.exports = mongoose.model('User', UserSchema);
