const express = require('express')
const router = express.Router()
const electronicBillController = require('../controllers/electronicbill.controller')

router.post('/', electronicBillController.create)
router.get('/', electronicBillController.getAll)
router.get('/:id', electronicBillController.getById)
router.get('/by-task/:taskId', electronicBillController.getByTaskId);
router.put('/:id', electronicBillController.update)

module.exports = router