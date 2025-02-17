const express = require('express')
const router = express.Router()
const electronicBillController = require('../controllers/electronicbill.controller')

router.post('/', electronicBillController.create)
router.get('/', electronicBillController.getAll)
router.get('/:id', electronicBillController.getById)

module.exports = router