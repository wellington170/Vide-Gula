const produtoService = require('../services/ProdutoService');
const { sendSuccess } = require('../utils/responseFormatter');

const cadastrarProduto = async (req, res) => {
  const produto = await produtoService.cadastrarProduto(req.body);
  return sendSuccess(res, produto, 'Produto cadastrado com sucesso.', 201);
};

const listarProdutosAdmin = async (req, res) => {
  const produtos = await produtoService.listarProdutosAdmin();
  return sendSuccess(res, produtos);
};

const alterarProduto = async (req, res) => {
  const produto = await produtoService.alterarProduto(req.params.id, req.body);
  return sendSuccess(res, produto, 'Produto atualizado com sucesso.');
};

const excluirProduto = async (req, res) => {
  const result = await produtoService.excluirProduto(req.params.id);
  return sendSuccess(res, result, 'Produto excluído com sucesso.');
};

const listarCardapio = async (req, res) => {
  const produtos = await produtoService.listarCardapio();
  return sendSuccess(res, produtos);
};

const consultarProduto = async (req, res) => {
  const produto = await produtoService.consultarProduto(req.params.id);
  return sendSuccess(res, produto);
};

module.exports = {
  cadastrarProduto,
  listarProdutosAdmin,
  alterarProduto,
  excluirProduto,
  listarCardapio,
  consultarProduto
};
