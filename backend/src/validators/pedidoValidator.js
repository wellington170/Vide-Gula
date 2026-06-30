const { body, param } = require('express-validator');
const { FormasRecebimento, FormasPagamento, StatusPedido } = require('../utils/enums');

const createOrderRules = [
  body('items').isArray({ min: 1 }).withMessage('O pedido deve possuir pelo menos um item.'),
  body('items.*.produtoId').isUUID().withMessage('ID do produto inválido.'),
  body('items.*.quantidade').isInt({ min: 1 }).withMessage('A quantidade deve ser um número inteiro maior que zero.'),
  body('formaRecebimento').isIn(FormasRecebimento).withMessage('Forma de recebimento inválida.'),
  body('formaPagamento').isIn(FormasPagamento).withMessage('Forma de pagamento inválida.'),
  body('taxaEntrega').optional().isFloat({ min: 0 }).withMessage('Taxa de entrega inválida.'),
  body('trocoPara').optional().isFloat({ min: 0 }).withMessage('Troco inválido.'),
  body('enderecoId').optional().isUUID().withMessage('ID do endereço inválido.')
];

const updateOrderRules = [
  param('id').isUUID().withMessage('ID do pedido inválido.'),
  body('items').optional().isArray({ min: 1 }).withMessage('O pedido deve possuir pelo menos um item.'),
  body('items.*.produtoId').optional().isUUID().withMessage('ID do produto inválido.'),
  body('items.*.quantidade').optional().isInt({ min: 1 }).withMessage('A quantidade deve ser um número inteiro maior que zero.'),
  body('formaRecebimento').optional().isIn(FormasRecebimento).withMessage('Forma de recebimento inválida.'),
  body('formaPagamento').optional().isIn(FormasPagamento).withMessage('Forma de pagamento inválida.'),
  body('taxaEntrega').optional().isFloat({ min: 0 }).withMessage('Taxa de entrega inválida.'),
  body('trocoPara').optional().isFloat({ min: 0 }).withMessage('Troco inválido.'),
  body('enderecoId').optional().isUUID().withMessage('ID do endereço inválido.')
];

const updateStatusRules = [
  param('id').isUUID().withMessage('ID do pedido inválido.'),
  body('status').isIn(StatusPedido).withMessage('Status inválido.')
];

module.exports = {
  createOrderRules,
  updateOrderRules,
  updateStatusRules
};
