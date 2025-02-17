const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/company.controller');
const CompanyRepository = require('../repositories/company.repository');

const companyRepository = new CompanyRepository();
const companyController = new CompanyController(companyRepository);

// Create a new company
router.post('/', (req, res) => companyController.createCompany(req, res));

// Get all companies
router.get('/', (req, res) => companyController.getAllCompanies(req, res));

// Get a single company by ID
router.get('/:id', (req, res) => companyController.getCompanyById(req, res));

// Update a company
router.put('/:id', (req, res) => companyController.updateCompany(req, res));

// Delete a company
router.delete('/:id', (req, res) => companyController.deleteCompany(req, res));

module.exports = router;