const express = require('express');
const EmployeeController = require('../controllers/employee.controller');

const router = express.Router();
const employeeController = new EmployeeController();

router.get('/', (req, res, next) => employeeController.getAllEmployees(req, res, next));
router.get('/:id', (req, res, next) => employeeController.getEmployeeById(req, res, next));
router.post('/', (req, res, next) => employeeController.createEmployee(req, res, next));
router.put('/:id', (req, res, next) => employeeController.updateEmployee(req, res, next));
router.delete('/:id', (req, res, next) => employeeController.deleteEmployee(req, res, next));
router.post('/login', (req,res,next) => employeeController.login(req,res,next));
router.get("/", (req, res, next) => employeeController.getAllEmployees(req, res, next));
module.exports = router;
