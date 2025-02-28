const express = require('express')
const router = express.Router()
const commercialRegisterController = require('../controllers/commericalregister.controller')

router.post('/', commercialRegisterController.create)
router.get('/', commercialRegisterController.getAll)
router.get('/:id', commercialRegisterController.getById)
router.get('/by-task/:taskId', commercialRegisterController.getByTaskId)
router.put('/:id', commercialRegisterController.update)

module.exports = router