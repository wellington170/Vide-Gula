const express = require('express');
const { updateProfileRules } = require('../validators/clienteValidator');
const validateRequest = require('../middlewares/validateRequest');
const asyncHandler = require('../middlewares/asyncHandler');
const clienteController = require('../controllers/ClienteController');
const { verificarToken } = require('../middlewares/auth');

const router = express.Router();

router.get('/perfil', verificarToken, asyncHandler(clienteController.getProfile));
router.put('/perfil', verificarToken, updateProfileRules, validateRequest, asyncHandler(clienteController.updateProfile));

module.exports = router;
