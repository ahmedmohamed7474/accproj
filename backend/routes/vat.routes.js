const express = require('express')
const router = express.Router()
const vatController = require('../controllers/vat.controller')

router.post('/', vatController.create)
router.get('/', vatController.getAll)
router.get('/:id', vatController.getById)
router.get('/by-task/:taskId', vatController.getByTaskId);
router.put('/:id', vatController.update)

module.exports = router