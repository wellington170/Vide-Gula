const ApiError = require('../utils/ApiError');
const produtoRepository = require('../repositories/ProdutoRepository');
const { ProdutoTipos } = require('../utils/enums');

class ProdutoService {
  async cadastrarProduto({ nome, descricao, tipo, precoBase, imagem, ativo, disponivel }) {
    if (!ProdutoTipos.includes(tipo)) {
      throw ApiError.badRequest('Tipo de produto inválido.');
    }

    if (Number(precoBase) <= 0) {
      throw ApiError.badRequest('O preço do produto deve ser maior que zero.');
    }

    return produtoRepository.create({
      nome,
      descricao,
      tipo,
      precoBase,
      imagem: imagem || null,
      ativo: ativo !== undefined ? ativo : true,
      disponivel: disponivel !== undefined ? disponivel : true
    });
  }

  async listarProdutosAdmin() {
    return produtoRepository.findAll({ order: [['createdAt', 'DESC']] });
  }

  async alterarProduto(id, updates) {
    const produto = await produtoRepository.findById(id);

    if (!produto) {
      throw ApiError.notFound('Produto não encontrado.');
    }

    if (updates.precoBase !== undefined && Number(updates.precoBase) <= 0) {
      throw ApiError.badRequest('O preço do produto deve ser maior que zero.');
    }

    return produtoRepository.update(produto, {
      ...updates,
      imagem: updates.imagem !== undefined ? updates.imagem : produto.imagem
    });
  }

  async excluirProduto(id) {
    const produto = await produtoRepository.findById(id);

    if (!produto) {
      throw ApiError.notFound('Produto não encontrado.');
    }

    const vinculacoes = await produtoRepository.countLinkedOrders(id);

    if (vinculacoes > 0) {
      return produtoRepository.update(produto, {
        ativo: false,
        disponivel: false
      });
    }

    await produtoRepository.delete(produto);
    return { message: 'Produto removido com sucesso.' };
  }

  async listarCardapio() {
    return produtoRepository.findAll({
      where: {
        ativo: true,
        disponivel: true
      },
      order: [['tipo', 'ASC'], ['nome', 'ASC']]
    });
  }

  async consultarProduto(id) {
    const produto = await produtoRepository.findAvailableById(id);

    if (!produto) {
      throw ApiError.notFound('Produto não encontrado.');
    }

    return produto;
  }
}

module.exports = new ProdutoService();
