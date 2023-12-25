const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
	title: {
		type: String,
	},

	description: {
		type: String,
	},

	owner: {
		type: String,
	},

	date_starts: {
		type: Date,
	},

	date_ends: {
		type: Date,
	},

	date_reminder: {
		type: Date,
	},

	is_done: {
		type: Boolean,
	},

	created_at: {
		type: Date,
	},

	created_by: {
		type: String,
	},
});

module.exports = mongoose.model('Task', TaskSchema);
