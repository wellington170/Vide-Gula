const express = require('express');
const { verificarToken } = require('../middlewares/auth');
const asyncHandler = require('../middlewares/asyncHandler');
const validateRequest = require('../middlewares/validateRequest');
const pedidoController = require('../controllers/PedidoController');
const { createOrderRules, updateOrderRules } = require('../validators/pedidoValidator');

const router = express.Router();

router.post('/pedidos', verificarToken, createOrderRules, validateRequest, asyncHandler(pedidoController.criarPedido));
router.get('/pedidos', verificarToken, asyncHandler(pedidoController.listarPedidosCliente));
router.patch('/pedidos/:id', verificarToken, updateOrderRules, validateRequest, asyncHandler(pedidoController.atualizarPedidoCliente));
router.patch('/pedidos/:id/cancelar', verificarToken, asyncHandler(pedidoController.cancelarPedidoCliente));

module.exports = router;
