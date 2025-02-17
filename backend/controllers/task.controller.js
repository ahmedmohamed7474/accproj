const TaskRepository = require('../repositories/task.repository');
const { ApiResponse } = require('../utils/api-response');

class TaskController {
  constructor() {
    this.repository = new TaskRepository();
  }

  async getAllTasks(req, res, next) {
    try {
      const tasks = await this.repository.findAll();
      res.json(new ApiResponse(200, 'Tasks retrieved', tasks));
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const task = await this.repository.findById(id);
      res.json(new ApiResponse(200, 'Task retrieved', task));
    } catch (error) {
      next(error);
    }
  }

  async getTasksByEmployee(req, res, next) {
    try {
      const employeeId = parseInt(req.params.employeeId, 10);
      if (isNaN(employeeId)) {
        return res.status(400).json(new ApiResponse(400, 'Invalid employee ID'));
      }
      const tasks = await this.repository.findByEmployeeId(employeeId);
      res.json(new ApiResponse(200, 'Tasks retrieved for employee', tasks));
    } catch (error) {
      next(error);
    }
  }

  async createTask(req, res, next) {
    try {
      const task = await this.repository.create(req.body);
      res.status(201).json(new ApiResponse(201, 'Task created', task));
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const task = await this.repository.update(id, req.body);
      res.json(new ApiResponse(200, 'Task updated', task));
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      await this.repository.delete(id);
      res.json(new ApiResponse(200, 'Task deleted'));
    } catch (error) {
      next(error);
    }
  }

  async updateTaskStatus(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const updatedTask = await this.repository.update(id, { status: 'COMPLETED' });
      res.json(new ApiResponse(200, 'Task status updated to COMPLETED', updatedTask));
    } catch (error) {
      next(error);
    }
  }

  // New method to check if taskId exists in any of the related tables
  async checkTaskDataExists(req, res, next) {
    try {
      const taskId = parseInt(req.params.taskId, 10);
  
      if (isNaN(taskId)) {
        return res.status(400).json(new ApiResponse(400, 'Invalid task ID'));
      }
  
      // Call the repository method to check if taskId exists
      const exists = await this.repository.checkTaskDataExists(taskId);
  
      // Respond with the result
      res.json(new ApiResponse(200, 'Task data existence checked', { exists }));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;