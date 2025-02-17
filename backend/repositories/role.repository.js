const prisma = require('../prisma/prisma.service');
const { ApiError } = require('../utils/api-error');

class RoleRepository {
  async findAll() {
    try {
      return await prisma.role.findMany();
    } catch (error) {
      throw new ApiError(500, 'Error fetching roles', [error]);
    }
  }

  async findById(id) {
    try {
      const role = await prisma.role.findUnique({ where: { id } });

      if (!role) {
        throw new ApiError(404, 'Role not found');
      }

      return role;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Error fetching role', [error]);
    }
  }

  async create(data) {
    try {
      return await prisma.role.create({ data });
    } catch (error) {
      throw new ApiError(400, 'Error creating role', [error]);
    }
  }

  async update(id, data) {
    try {
      return await prisma.role.update({ where: { id }, data });
    } catch (error) {
      throw new ApiError(400, 'Error updating role', [error]);
    }
  }

  async delete(id) {
    try {
      return await prisma.role.delete({ where: { id } });
    } catch (error) {
      throw new ApiError(400, 'Error deleting role', [error]);
    }
  }
}

module.exports = RoleRepository;
