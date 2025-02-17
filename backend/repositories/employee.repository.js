const prisma = require('../prisma/prisma.service');
const { ApiError } = require('../utils/api-error');

class EmployeeRepository {
  async findAll() {
    try {
      return await prisma.employee.findMany();
    } catch (error) {
      throw new ApiError(500, 'Error fetching employees', [error]);
    }
  }

  async findById(id) {
    try {
      const employee = await prisma.employee.findUnique({ where: { id } });

      if (!employee) {
        throw new ApiError(404, 'Employee not found');
      }

      return employee;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Error fetching employee', [error]);
    }
  }

  async findByEmail(email) {
    try {
      const employee = await prisma.employee.findUnique({ where: { email } });

      if (!employee) {
        throw new ApiError(404, 'Employee not found');
      }

      return employee;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Error fetching employee', [error]);
    }
  }

  async create(data) {
    try {
      console.log('Data passed to create:', data);  // Debugging line
      return await prisma.employee.create({ data });
    } catch (error) {
      throw new ApiError(400, 'Error creating employee', [error]);
    }
  }

  async update(id, data) {
    try {
      console.log('Data passed to update:', data);  // Debugging line
      return await prisma.employee.update({ where: { id }, data });
    } catch (error) {
      throw new ApiError(400, 'Error updating employee', [error]);
    }
  }

  async delete(id) {
    try {
      return await prisma.employee.delete({ where: { id } });
    } catch (error) {
      throw new ApiError(400, 'Error deleting employee', [error]);
    }
  }
}

module.exports = EmployeeRepository;
