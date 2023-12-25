const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const logger = require('../logger/logger');

const currentUser = 'jkiss';

// GET all tasks
router.get('/', async (req, res) => {
	logger.info('Task GET-all called', 'crud~task~get-all');
	try {
		const tasks = await Task.find({ owner: currentUser });
		logger.info(
			`Task GET-all successful: ${tasks.length}`,
			'crud~task~get-all'
		);
		res.json(tasks);
	} catch (err) {
		logger.error('Task GET-all called', 'crud~task~get-all');
		res.json({ message: err });
	}
});

// GET Task for User
router.get('/:userName', async (req, res) => {
	logger.info('Task GET-per-user called', 'crud~task~get-per-user');
	try {
		// const user = await Task.findById(req.params.taskId);
		const tasks = await Task.find({ owner: req.params.userName });
		logger.info('Task GET-per-user successful', 'crud~task~get-per-user');
		res.json(tasks);
	} catch (err) {
		logger.error('Task GET-per-user failed', 'crud~task~get-per-user');
		res.json({ message: err });
	}
});

// SUBMIT A Task
router.post('/', async (req, res) => {
	logger.info('Task POST called', 'crud~task~post');
	const user = new Task({
		title: req.body.title,
		description: req.body.description,
		owner: req.body.owner,
		date_starts: req.body.date_starts,
		date_ends: req.body.date_ends,
		date_reminder: req.body.date_reminder,
		is_done: false,
		created_at: Date.now(),
		created_by: req.body.created_by,
	});

	try {
		const savedTask = await user.save();
		logger.info('Task POST successful', 'crud~task~post');
		res.json(savedTask);
	} catch (err) {
		logger.error('Task POST failed', 'crud~task~post');
		res.json({ message: err });
	}
});

// Update Task
router.patch('/:taskId', async (req, res) => {
	logger.info('Task PATCH called', 'crud~task~patch');
	try {
		const updatedTask = await Task.updateOne(
			{ _id: req.params.taskId },
			{
				$set: {
					title: req.body.title,
					description: req.body.description,
					owner: req.body.owner,
					date_starts: req.body.date_starts,
					date_ends: req.body.date_ends,
					date_reminder: req.body.date_reminder,
					is_done: req.body.is_done,
				},
			}
		);
		res.json(updatedTask);
		logger.info('Task PATCH successful', 'crud~task~patch');
	} catch (err) {
		logger.error('Task PATCH failed', 'crud~task~patch');
		res.json({ message: err });
	}
});

// Delete Task
router.delete('/:taskId', async (req, res) => {
	logger.info('Task DELETE called', 'crud~task~delete');
	try {
		const removedTask = await Task.deleteOne({ _id: req.params.taskId });
		logger.info('Task DELETE successful', 'crud~task~delete');
		res.json(removedTask);
	} catch (err) {
		logger.error('Task DELETE failed', 'crud~task~delete');
		res.json({ message: err });
	}
});

module.exports = router;
