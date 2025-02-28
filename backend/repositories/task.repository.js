const prisma = require('../prisma/prisma.service');
const { ApiError } = require('../utils/api-error');

class TaskRepository {
  async findAll() {
    try {
      return await prisma.task.findMany();
    } catch (error) {
      throw new ApiError(500, 'Error fetching tasks', [error]);
    }
  }

  async findById(id) {
    try {
      const task = await prisma.task.findUnique({ where: { id } });
      if (!task) {
        throw new ApiError(404, 'Task not found');
      }
      return task;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Error fetching task', [error]);
    }
  }

  async findByEmployeeId(employeeId) {
    return await prisma.task.findMany({
      where: { employeeId: employeeId },
    });
  }

  async create(data) {
    try {
      console.log('Data passed to create:', data);
      return await prisma.task.create({ data });
    } catch (error) {
      throw new ApiError(400, 'Error creating task', [error]);
    }
  }

  async update(id, data) {
    try {
      console.log('Data passed to update:', data);
      return await prisma.task.update({ where: { id }, data });
    } catch (error) {
      throw new ApiError(400, 'Error updating task', [error]);
    }
  }

  async delete(id) {
    try {
      return await prisma.task.delete({ where: { id } });
    } catch (error) {
      throw new ApiError(400, 'Error deleting task', [error]);
    }
  }

  // Fixed method to check if taskId exists in any of the related tables
  async checkTaskDataExists(taskId) {
    try {
      // Check if tables exist in the Prisma model before querying
      let vatRecord = null;
      let electronicBillRecord = null;
      let publicTaxRecord = null;
      let commercialRegisterRecord = null;
      let otherRecord = null;

      // Safely check each table
      try {
        vatRecord = await prisma.vat.findFirst({ where: { taskId } });
      } catch (e) {
        console.log("VAT table might not exist:", e.message);
      }

      try {
        electronicBillRecord = await prisma.electronicBill.findFirst({ where: { taskId } });
      } catch (e) {
        console.log("Electronic Bill table might not exist:", e.message);
      }

      try {
        publicTaxRecord = await prisma.publicTax.findFirst({ where: { taskId } });
      } catch (e) {
        console.log("Public Tax table might not exist:", e.message);
      }

      try {
        commercialRegisterRecord = await prisma.commercialRegister.findFirst({ where: { taskId } });
      } catch (e) {
        console.log("Commercial Register table might not exist:", e.message);
      }

      try {
        otherRecord = await prisma.other.findFirst({ where: { taskId } });
      } catch (e) {
        console.log("Other table might not exist:", e.message);
      }

      // Check if any record exists
      return !!(
        vatRecord ||
        electronicBillRecord ||
        publicTaxRecord ||
        commercialRegisterRecord ||
        otherRecord
      );
    } catch (error) {
      console.error('Error checking task data:', error);
      throw new ApiError(500, 'Error checking task data', [error]);
    }
  }
  
}

module.exports = TaskRepository;