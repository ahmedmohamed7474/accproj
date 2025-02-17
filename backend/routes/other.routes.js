const express = require('express');
const router = express.Router();
const otherController = require('../controllers/other.controller');

// Define routes
router.post('/', otherController.create); // Create a new "Other" record
router.get('/', otherController.getAll); // Get all "Other" records
router.get('/:id', otherController.getById); // Get a specific "Other" record by ID

module.exports = router;