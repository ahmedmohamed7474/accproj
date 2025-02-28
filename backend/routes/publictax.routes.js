const express = require('express')
const router = express.Router()
const publicTaxController = require('../controllers/publictax.controller')

router.post('/', publicTaxController.create)
router.get('/', publicTaxController.getAll)
router.get('/by-task/:taskId', publicTaxController.getByTaskId);
router.get('/:id', publicTaxController.getById)
router.put('/:id', publicTaxController.update);

module.exports = router