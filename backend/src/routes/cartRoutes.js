const express = require('express');
const { verificarToken } = require('../middlewares/auth');
const asyncHandler = require('../middlewares/asyncHandler');
const cartController = require('../controllers/CartController');

const router = express.Router();

router.post('/carrinho/produtos', verificarToken, asyncHandler(cartController.adicionarProduto));
router.get('/carrinho', verificarToken, asyncHandler(cartController.visualizarCarrinho));
router.patch('/carrinho/produtos/:produtoId', verificarToken, asyncHandler(cartController.alterarQuantidade));
router.delete('/carrinho/produtos/:produtoId', verificarToken, asyncHandler(cartController.removerProduto));
router.post('/carrinho/finalizar', verificarToken, asyncHandler(cartController.finalizar));

module.exports = router;
