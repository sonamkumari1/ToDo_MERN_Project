const { Request, Response } = require('express');
const Task = require('../models/Task'); // Adjust path as per your project structure

// Your controller functions
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      status,
      user: req.user,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const updateTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ msg: 'Task not found' });
      return;
    }

    if (String(task.user) !== req.user) {
      res.status(401).json({ msg: 'Not authorized' });
      return;
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, status } },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.user });

    if (!deletedTask) {
      res.status(404).json({ msg: 'Task not found' });
      return;
    }

    res.json({ msg: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
