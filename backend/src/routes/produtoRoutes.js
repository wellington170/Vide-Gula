const express = require('express');
const { verificarToken } = require('../middlewares/auth');
const asyncHandler = require('../middlewares/asyncHandler');
const produtoController = require('../controllers/ProdutoController');

const router = express.Router();

router.get('/cardapio', verificarToken, asyncHandler(produtoController.listarCardapio));
router.get('/produtos/:id', verificarToken, asyncHandler(produtoController.consultarProduto));

module.exports = router;
