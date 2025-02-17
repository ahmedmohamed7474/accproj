const RoleRepository = require('../repositories/role.repository');
const { ApiResponse } = require('../utils/api-response');

class RoleController {
  constructor() {
    this.repository = new RoleRepository();
  }

  async getAllRoles(req, res, next) {
    try {
      const roles = await this.repository.findAll();
      res.json(new ApiResponse(200, 'Roles retrieved', roles));
    } catch (error) {
      next(error);
    }
  }

  async getRoleById(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const role = await this.repository.findById(id);
      res.json(new ApiResponse(200, 'Role retrieved', role));
    } catch (error) {
      next(error);
    }
  }

  async createRole(req, res, next) {
    try {
      const role = await this.repository.create(req.body);
      res.status(201).json(new ApiResponse(201, 'Role created', role));
    } catch (error) {
      next(error);
    }
  }

  async updateRole(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const role = await this.repository.update(id, req.body);
      res.json(new ApiResponse(200, 'Role updated', role));
    } catch (error) {
      next(error);
    }
  }

  async deleteRole(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      await this.repository.delete(id);
      res.json(new ApiResponse(200, 'Role deleted'));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RoleController;
