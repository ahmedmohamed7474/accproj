const express = require('express')
const router = express.Router()
const commercialRegisterController = require('../controllers/commericalregister.controller')

router.post('/', commercialRegisterController.create)
router.get('/', commercialRegisterController.getAll)
router.get('/:id', commercialRegisterController.getById)

module.exports = router