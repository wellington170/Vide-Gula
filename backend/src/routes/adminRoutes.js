const express = require('express');
const { verificarToken, verificarAdmin } = require('../middlewares/auth');
const asyncHandler = require('../middlewares/asyncHandler');
const validateRequest = require('../middlewares/validateRequest');
const produtoController = require('../controllers/ProdutoController');
const pedidoController = require('../controllers/PedidoController');
const { createProductRules, updateProductRules } = require('../validators/produtoValidator');
const { updateStatusRules } = require('../validators/pedidoValidator');

const router = express.Router();

router.post('/admin/produtos', verificarToken, verificarAdmin, createProductRules, validateRequest, asyncHandler(produtoController.cadastrarProduto));
router.get('/admin/produtos', verificarToken, verificarAdmin, asyncHandler(produtoController.listarProdutosAdmin));
router.put('/admin/produtos/:id', verificarToken, verificarAdmin, updateProductRules, validateRequest, asyncHandler(produtoController.alterarProduto));
router.delete('/admin/produtos/:id', verificarToken, verificarAdmin, asyncHandler(produtoController.excluirProduto));

router.get('/admin/pedidos', verificarToken, verificarAdmin, asyncHandler(pedidoController.listarPedidosAdmin));
router.get('/admin/pedidos/:id', verificarToken, verificarAdmin, asyncHandler(pedidoController.consultarPedidoAdmin));
router.patch('/admin/pedidos/:id/status', verificarToken, verificarAdmin, updateStatusRules, validateRequest, asyncHandler(pedidoController.atualizarStatusPedido));

module.exports = router;
