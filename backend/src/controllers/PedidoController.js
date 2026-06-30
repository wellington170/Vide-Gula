const pedidoService = require('../services/PedidoService');
const { sendSuccess } = require('../utils/responseFormatter');

const criarPedido = async (req, res) => {
  const pedido = await pedidoService.criarPedido(req.user.id, req.body);
  return sendSuccess(res, pedido, 'Pedido criado com sucesso.', 201);
};

const listarPedidosCliente = async (req, res) => {
  const pedidos = await pedidoService.listarPedidosCliente(req.user.id);
  return sendSuccess(res, pedidos);
};

const atualizarPedidoCliente = async (req, res) => {
  const pedido = await pedidoService.atualizarPedidoCliente(req.user.id, req.params.id, req.body);
  return sendSuccess(res, pedido, 'Pedido atualizado com sucesso.');
};

const cancelarPedidoCliente = async (req, res) => {
  const resultado = await pedidoService.cancelarPedidoCliente(req.user.id, req.params.id);
  return sendSuccess(res, resultado, 'Pedido cancelado com sucesso.');
};

const listarPedidosAdmin = async (req, res) => {
  const pedidos = await pedidoService.listarPedidosAdmin(req.query);
  return sendSuccess(res, pedidos);
};

const consultarPedidoAdmin = async (req, res) => {
  const pedido = await pedidoService.consultarPedidoAdmin(req.params.id);
  return sendSuccess(res, pedido);
};

const atualizarStatusPedido = async (req, res) => {
  const pedido = await pedidoService.atualizarStatusPedido(req.params.id, req.body.status);
  return sendSuccess(res, pedido, 'Status do pedido atualizado com sucesso.');
};

module.exports = {
  criarPedido,
  listarPedidosCliente,
  atualizarPedidoCliente,
  cancelarPedidoCliente,
  listarPedidosAdmin,
  consultarPedidoAdmin,
  atualizarStatusPedido
};
