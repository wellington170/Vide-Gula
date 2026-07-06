const pedidoService = require('../services/PedidoService');
const { sendSuccess } = require('../utils/responseFormatter');

const adicionarProduto = async (req, res) => {
  const { produtoId, quantidade } = req.body;
  const cart = await pedidoService.addProductToCart(req.user.id, produtoId, quantidade);
  return sendSuccess(res, cart, 'Produto adicionado ao carrinho.');
};

const visualizarCarrinho = async (req, res) => {
  const cart = await pedidoService.getCart(req.user.id);
  return sendSuccess(res, cart || {}, 'Carrinho recuperado.');
};

const alterarQuantidade = async (req, res) => {
  const produtoId = req.params.produtoId;
  const { quantidade } = req.body;
  const cart = await pedidoService.updateCartItemQuantity(req.user.id, produtoId, quantidade);
  return sendSuccess(res, cart, 'Quantidade atualizada.');
};

const removerProduto = async (req, res) => {
  const produtoId = req.params.produtoId;
  const cart = await pedidoService.removeProductFromCart(req.user.id, produtoId);
  return sendSuccess(res, cart, 'Produto removido do carrinho.');
};

const finalizar = async (req, res) => {
  const pedido = await pedidoService.finalizeCart(req.user.id);
  return sendSuccess(res, pedido, 'Pedido finalizado com sucesso.');
};

module.exports = {
  adicionarProduto,
  visualizarCarrinho,
  alterarQuantidade,
  removerProduto,
  finalizar
};
