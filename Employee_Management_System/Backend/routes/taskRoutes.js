const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    const tasks = users.flatMap(user => user.tasks);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add a new task
router.post('/', async (req, res) => {
  const { firstname, task } = req.body;
  try {
    const user = await User.findOne({ firstname });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.tasks.push(task);
    user.taskCounts.newTask += 1;
    await user.save();
    res.status(201).json(user.tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a task
router.put('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const updatedTask = req.body;

  try {
    const user = await User.findOne({ 'tasks._id': taskId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    console.log(user);
    

    const task = user.tasks.id(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });


    Object.assign(task, updatedTask);

     // Update task counts
     if (updatedTask.active && task.newTask) {
      user.taskCounts.active += 1;
      user.taskCounts.newTask -= 1;
    }

    if (updatedTask.completed && task.active) {
      user.taskCounts.completed += 1;
      user.taskCounts.active -= 1;
    }

    if (updatedTask.failed && !updatedTask.completed ) {
      user.taskCounts.failed += 1
        user.taskCounts.active -= 1;
    }

    if (!updatedTask.failed && updatedTask.active) {
      user.taskCounts.failed -= 1;
        user.taskCounts.active += 1;
    }


    await user.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;