const express = require('express');
const TaskController = require('../controllers/task.controller');

const router = express.Router();

const taskController = new TaskController();

// Special routes that need to be defined before parameterized routes
router.get('/checkdata/:taskId', taskController.checkTaskDataExists.bind(taskController));
router.get('/employees/:employeeId', taskController.getTasksByEmployee.bind(taskController));

// Base routes
router.post('/', taskController.createTask.bind(taskController));  
router.get('/', taskController.getAllTasks.bind(taskController));
router.get('/:id', taskController.getTaskById.bind(taskController));
router.put('/:id', taskController.updateTask.bind(taskController));
router.patch('/:id', taskController.updateTask.bind(taskController));
router.delete('/:id', taskController.deleteTask.bind(taskController));
router.put('/:id/complete', taskController.updateTaskStatus.bind(taskController));

module.exports = router;