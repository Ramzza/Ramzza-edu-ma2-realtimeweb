const express = require('express');

const router = express.Router();
const TaskService = require('../service/TaskService');

const TaskServiceInstance = new TaskService();

// GET Task for User
router.get('/:userName', async (req, res) => {
  try {
    const tasks = await TaskServiceInstance.readTasksByUser(
      req.params.userName,
    );
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// SUBMIT A Task
router.post('/', async (req, res) => {
  try {
    const createdTask = await TaskServiceInstance.createTask(req.body);
    res.json(createdTask);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Update Task
router.patch('/:taskId', async (req, res) => {
  try {
    const updatedTask = await TaskServiceInstance.updateTask(
      req.params.taskId,
      req.body,
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Delete Task
router.delete('/:taskId', async (req, res) => {
  try {
    const deletedTask = await TaskServiceInstance.deleteTask(req.params.taskId);
    res.json(deletedTask);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
