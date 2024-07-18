
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

// Protected routes requiring authentication
router.get('/', authMiddleware, getAllTasks);
router.post('/add', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
