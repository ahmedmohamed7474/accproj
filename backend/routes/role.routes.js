const express = require('express');
const RoleController = require('../controllers/role.controller');

const router = express.Router();
const roleController = new RoleController();

router.get('/', (req, res, next) => roleController.getAllRoles(req, res, next));
router.get('/:id', (req, res, next) => roleController.getRoleById(req, res, next));
router.post('/', (req, res, next) => roleController.createRole(req, res, next));
router.put('/:id', (req, res, next) => roleController.updateRole(req, res, next));
router.delete('/:id', (req, res, next) => roleController.deleteRole(req, res, next));

module.exports = router;
