const express = require('express');
const { loginRules, registerClienteRules } = require('../validators/authValidator');
const validateRequest = require('../middlewares/validateRequest');
const asyncHandler = require('../middlewares/asyncHandler');
const authController = require('../controllers/AuthController');

const router = express.Router();

router.post('/login', loginRules, validateRequest, asyncHandler(authController.login));
router.post('/clientes/cadastro', registerClienteRules, validateRequest, asyncHandler(authController.registerCliente));

module.exports = router;
