const express = require('express');
const router = express.Router();
const User = require('../models/User');
const IterateUserProps = require('../iterator/UserPropIterator');
const logger = require('../logger/logger');

// GET all users
router.get('/', async (req, res) => {
	logger.info('User GET-all called', 'crud~user~get-all');
	try {
		const users = await User.find();
		logger.info(
			`User GET-all successful: ${users.length}`,
			'crud~user~get-all'
		);
		res.json(users);
	} catch (err) {
		logger.error(`User GET-all failed: ${err.toString()}`, 'crud~user~get-all');
		res.json({ message: err });
	}
});

// GET SPECIFIC User
router.get('/:userId', async (req, res) => {
	logger.info('User GET-single called', 'crud~user~get-single');
	try {
		const user = await User.findById(req.params.userId);
		logger.info(`User GET-single successful`, 'crud~user~get-single');
		res.json(user);
	} catch (err) {
		logger.error('User GET-single failed', 'crud~user~get-single');
		res.json({ message: err });
	}
});

// SUBMIT A User
router.post('/', async (req, res) => {
	logger.info('User POST called', 'crud~user~post');
	const user = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		cnp: req.body.cnp,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		date_started: req.body.date_started,
		date_end: req.body.date_end,
		position: req.body.position,
		salary: req.body.salary,
		pc: req.body.pc,
		car: req.body.car,
		comments: req.body.comments,
	});

	try {
		const savedUser = await user.save();
		logger.info('User POST successful', 'crud~user~post');
		res.json(savedUser);
	} catch (err) {
		logger.error('User POST failed', 'crud~user~post');
		res.json({ message: err });
	}
});

// Update User
router.patch('/:userId', async (req, res) => {
	logger.info('User PATCH called', 'crud~user~patch');
	try {
		let iterator = new IterateUserProps();
		let oNewObj = {};
		let sProp = iterator.hasNext();
		while (sProp !== undefined) {
			oNewObj[sProp] = req.body[sProp];
			sProp = iterator.hasNext();
		}

		const updatedUser = await User.updateOne(
			{ _id: req.params.userId },
			{
				$set: oNewObj,
			}
		);
		logger.info('User PATCH successful', 'crud~user~patch');
		res.json(updatedUser);
	} catch (err) {
		logger.error('User PATCH failed', 'crud~user~patch');
		res.json({ message: err });
	}
});

// Delete User
router.delete('/:userId', async (req, res) => {
	logger.info('User DELETE called', 'crud~user~delete');
	try {
		const removedUser = await User.deleteOne({ _id: req.params.userId });
		logger.info('User DELETE successful', 'crud~user~delete');
		res.json(removedUser);
	} catch (err) {
		logger.error('User DELETE failed', 'crud~user~delete');
		res.json({ message: err });
	}
});

module.exports = router;
