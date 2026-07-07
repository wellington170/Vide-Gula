const express = require('express');
const { verificarToken, verificarAdmin } = require('../middlewares/auth');
const asyncHandler = require('../middlewares/asyncHandler');
const validateRequest = require('../middlewares/validateRequest');
const produtoController = require('../controllers/ProdutoController');
const { createProductRules, updateProductRules } = require('../validators/produtoValidator');

const router = express.Router();

router.get('/cardapio', verificarToken, asyncHandler(produtoController.listarCardapio));
router.get('/produtos/:id', verificarToken, asyncHandler(produtoController.consultarProduto));

router.get('/produtos', verificarToken, verificarAdmin, asyncHandler(produtoController.listarProdutosAdmin));
router.post('/produtos', verificarToken, verificarAdmin, createProductRules, validateRequest, asyncHandler(produtoController.cadastrarProduto));
router.patch('/produtos/:id', verificarToken, verificarAdmin, updateProductRules, validateRequest, asyncHandler(produtoController.alterarProduto));
router.delete('/produtos/:id', verificarToken, verificarAdmin, asyncHandler(produtoController.excluirProduto));

module.exports = router;
