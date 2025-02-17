const express = require('express')
const router = express.Router()
const publicTaxController = require('../controllers/publictax.controller')

router.post('/', publicTaxController.create)
router.get('/', publicTaxController.getAll)
router.get('/:id', publicTaxController.getById)

module.exports = router