const express = require('express');

const router = express.Router();
const UserService = require('../service/UserService');

const UserServiceInstance = new UserService();

// GET all users
router.get('/', async (_req, res) => {
  try {
    const users = await UserServiceInstance.readUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET SPECIFIC User
router.get('/:userId', async (req, res) => {
  try {
    const user = await UserServiceInstance.readUserById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// SUBMIT A User
router.post('/', async (req, res) => {
  try {
    const createdUser = await UserServiceInstance.createUser(req.body);
    res.json(createdUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Update User
router.patch('/:userId', async (req, res) => {
  try {
    const updatedUser = await UserServiceInstance.updateUser(
      req.params.userId,
      req.body,
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Delete User
router.delete('/:userId', async (req, res) => {
  try {
    const deletedUser = await UserServiceInstance.deleteUser(req.params.userId);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
