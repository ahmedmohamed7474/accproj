const express = require('express')
const router = express.Router()
const vatController = require('../controllers/vat.controller')

router.post('/', vatController.create)
router.get('/', vatController.getAll)
router.get('/:id', vatController.getById)

module.exports = router