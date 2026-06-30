const { body, param } = require('express-validator');
const { ProdutoTipos } = require('../utils/enums');

const createProductRules = [
  body('nome').isString().notEmpty().withMessage('Nome é obrigatório.'),
  body('descricao').isString().notEmpty().withMessage('Descrição é obrigatória.'),
  body('tipo').isIn(ProdutoTipos).withMessage('Tipo de produto inválido.'),
  body('precoBase').isFloat({ gt: 0 }).withMessage('O preço do produto deve ser maior que zero.'),
  body('imagem').optional().isString(),
  body('ativo').optional().isBoolean(),
  body('disponivel').optional().isBoolean()
];

const updateProductRules = [
  param('id').isUUID().withMessage('ID do produto inválido.'),
  body('nome').optional().isString(),
  body('descricao').optional().isString(),
  body('tipo').optional().isIn(ProdutoTipos).withMessage('Tipo de produto inválido.'),
  body('precoBase').optional().isFloat({ gt: 0 }).withMessage('O preço do produto deve ser maior que zero.'),
  body('imagem').optional().isString(),
  body('ativo').optional().isBoolean(),
  body('disponivel').optional().isBoolean()
];

module.exports = {
  createProductRules,
  updateProductRules
};
