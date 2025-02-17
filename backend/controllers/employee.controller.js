const EmployeeRepository = require('../repositories/employee.repository');
const { ApiResponse } = require('../utils/api-response');

class EmployeeController {
  constructor() {
    this.repository = new EmployeeRepository();
  }

  async getAllEmployees(req, res, next) {
    try {
      const employees = await this.repository.findAll();
      res.json(new ApiResponse(200, 'Employees retrieved', employees));
    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeeById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const employee = await this.repository.findById(id);
      res.json(new ApiResponse(200, 'Employee retrieved', employee));
    } catch (error) {
      console.log(error);
      
    }
  }

  async createEmployee(req, res, next) {
    try {
      const employee = await this.repository.create(req.body);
      res.status(201).json(new ApiResponse(201, 'Employee created', employee));
    } catch (error) {
      console.log(error);
    }
  }

  async updateEmployee(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const employee = await this.repository.update(id, req.body);
      res.json(new ApiResponse(200, 'Employee updated', employee));
    } catch (error) {
      next(error);
    }
  }

  async deleteEmployee(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      await this.repository.delete(id);
      res.json(new ApiResponse(200, 'Employee deleted'));
    } catch (error) {
      console.log(error);
    }
  }
async login(req, res, next) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required');
    }

    const user = await this.repository.findByEmail(email);
    if (user.password !== password){
      throw new ApiError(401, "Invalid Creds")
      }

    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    res.status(200).json(user)
  } catch (error) {
    next(error);
  }
}
async getAllEmployees(req, res, next) {
  try {
    const employees = await this.repository.findAll();
    res.json({ success: true, data: employees }); 
  } catch (error) {
    next(error);
  }
}


}

module.exports = EmployeeController;
