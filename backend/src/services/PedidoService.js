const { Op } = require('sequelize');
const ApiError = require('../utils/ApiError');
const pedidoRepository = require('../repositories/PedidoRepository');
const produtoRepository = require('../repositories/ProdutoRepository');
const enderecoRepository = require('../repositories/EnderecoRepository');
const itemPedidoRepository = require('../repositories/ItemPedidoRepository');
const { FormasRecebimento, FormasPagamento, StatusPedido } = require('../utils/enums');

class PedidoService {
  async criarPedido(usuarioId, payload) {
    await this.validarPedidoEmAndamento(usuarioId);

    const { items, formaRecebimento, formaPagamento, enderecoId, taxaEntrega = 0, trocoPara = 0 } = payload;

    this.validarFormaRecebimento(formaRecebimento);
    this.validarFormaPagamento(formaPagamento);

    if (formaRecebimento === 'DELIVERY' && !enderecoId) {
      throw ApiError.badRequest('Pedidos delivery exigem um endereço cadastrado.');
    }

    if (formaRecebimento === 'RETIRADA' && enderecoId) {
      throw ApiError.badRequest('Pedido de retirada não deve informar endereço de entrega.');
    }

    if (formaPagamento !== 'DINHEIRO' && Number(trocoPara) > 0) {
      throw ApiError.badRequest('Troco só é permitido para pagamento em dinheiro.');
    }

    const itensValidados = await this.validarItens(items);
    const valorTotal = this.calcularTotal(itensValidados, formaRecebimento === 'DELIVERY' ? Number(taxaEntrega) : 0);

    if (valorTotal < 25) {
      throw ApiError.badRequest('Pedido mínimo de 25 reais.');
    }

    const endereco = formaRecebimento === 'DELIVERY'
      ? await enderecoRepository.findActiveByIdAndUser(enderecoId, usuarioId)
      : null;

    if (formaRecebimento === 'DELIVERY' && !endereco) {
      throw ApiError.badRequest('Endereço de entrega inválido.');
    }

    return pedidoRepository.createOrder({
      usuarioId,
      enderecoId: endereco ? endereco.id : null,
      formaRecebimento,
      formaPagamento,
      trocoPara: Number(trocoPara),
      taxaEntrega: formaRecebimento === 'DELIVERY' ? Number(taxaEntrega) : 0,
      valorTotal,
      status: StatusPedido[0],
      itens: itensValidados
    });
  }

  async listarPedidosCliente(usuarioId) {
    return pedidoRepository.findByUserId(usuarioId);
  }

  async atualizarPedidoCliente(usuarioId, pedidoId, payload) {
    const pedido = await pedidoRepository.findById(pedidoId);

    if (!pedido || pedido.usuarioId !== usuarioId) {
      throw ApiError.notFound('Pedido não encontrado.');
    }

    if (pedido.status !== 'RECEBIDO') {
      throw ApiError.badRequest('Este pedido não pode mais ser alterado.');
    }

    const { items, formaRecebimento, formaPagamento, enderecoId, taxaEntrega = pedido.taxaEntrega, trocoPara = pedido.trocoPara } = payload;
    let formaRecebimentoAtual = pedido.formaRecebimento;
    let enderecoAtualId = pedido.enderecoId;
    let taxaEntregaAtual = Number(pedido.taxaEntrega || 0);

    if (formaRecebimento) {
      this.validarFormaRecebimento(formaRecebimento);
      formaRecebimentoAtual = formaRecebimento;
      if (formaRecebimento === 'RETIRADA') {
        enderecoAtualId = null;
        taxaEntregaAtual = 0;
      }
    }

    if (formaPagamento) {
      this.validarFormaPagamento(formaPagamento);
    }

    if (formaRecebimentoAtual === 'DELIVERY' && enderecoId) {
      const endereco = await enderecoRepository.findActiveByIdAndUser(enderecoId, usuarioId);
      if (!endereco) {
        throw ApiError.badRequest('Endereço de entrega inválido.');
      }
      enderecoAtualId = endereco.id;
    }

    if (items && items.length > 0) {
      const itensValidados = await this.validarItens(items);
      const total = this.calcularTotal(itensValidados, formaRecebimentoAtual === 'DELIVERY' ? Number(taxaEntrega) : 0);
      if (total < 25) {
        throw ApiError.badRequest('Pedido mínimo de 25 reais.');
      }

      await itemPedidoRepository.deleteByOrderId(pedido.id);
      await itemPedidoRepository.bulkCreate(itensValidados.map((item) => ({
        pedidoId: pedido.id,
        ...item
      })));
      pedido.valorTotal = total;
      pedido.taxaEntrega = formaRecebimentoAtual === 'DELIVERY' ? Number(taxaEntrega) : 0;
    }

    if (formaPagamento) {
      pedido.formaPagamento = formaPagamento;
    }

    pedido.formaRecebimento = formaRecebimentoAtual;
    pedido.enderecoId = enderecoAtualId;
    pedido.trocoPara = Number(trocoPara);

    await pedido.save();

    return pedidoRepository.findByIdWithDetails(pedido.id);
  }

  async cancelarPedidoCliente(usuarioId, pedidoId) {
    const pedido = await pedidoRepository.findById(pedidoId);

    if (!pedido || pedido.usuarioId !== usuarioId) {
      throw ApiError.notFound('Pedido não encontrado.');
    }

    if (pedido.status !== 'RECEBIDO') {
      throw ApiError.badRequest('Este pedido não pode mais ser cancelado.');
    }

    pedido.status = 'CANCELADO';
    await pedido.save();

    return { message: 'Pedido cancelado com sucesso.' };
  }

  async listarPedidosAdmin(query) {
    const filters = {};

    if (query.status) {
      filters.status = query.status;
    }

    if (query.clienteId) {
      filters.usuarioId = query.clienteId;
    }

    if (query.formaRecebimento) {
      filters.formaRecebimento = query.formaRecebimento;
    }

    if (query.startDate || query.endDate) {
      filters.createdAt = {};
      if (query.startDate) {
        filters.createdAt[Op.gte] = new Date(query.startDate);
      }
      if (query.endDate) {
        filters.createdAt[Op.lte] = new Date(query.endDate);
      }
    }

    return pedidoRepository.findAllWithFilters(filters);
  }

  async consultarPedidoAdmin(pedidoId) {
    const pedido = await pedidoRepository.findByIdWithDetails(pedidoId);

    if (!pedido) {
      throw ApiError.notFound('Pedido não encontrado.');
    }

    return pedido;
  }

  async atualizarStatusPedido(pedidoId, status) {
    const pedido = await pedidoRepository.findById(pedidoId);

    if (!pedido) {
      throw ApiError.notFound('Pedido não encontrado.');
    }

    if (['CANCELADO', 'ENTREGUE'].includes(pedido.status)) {
      throw ApiError.badRequest('Não é possível alterar o status deste pedido.');
    }

    if (!StatusPedido.includes(status)) {
      throw ApiError.badRequest('Status inválido.');
    }

    const fluxo = ['RECEBIDO', 'EM_PREPARO', 'SAIU_PARA_ENTREGA', 'ENTREGUE'];
    const atualIndex = fluxo.indexOf(pedido.status);
    const novoIndex = fluxo.indexOf(status);

    if (status === 'CANCELADO') {
      pedido.status = status;
    } else if (novoIndex === -1 || novoIndex <= atualIndex) {
      throw ApiError.badRequest('Não é permitido retornar para um status anterior.');
    } else {
      pedido.status = status;
    }

    await pedido.save();
    return pedido;
  }

  async excluirPedidoAdmin(pedidoId) {
    const pedido = await pedidoRepository.findById(pedidoId);

    if (!pedido) {
      throw ApiError.notFound('Pedido não encontrado.');
    }

    if (!['CANCELADO', 'ENTREGUE'].includes(pedido.status)) {
      throw ApiError.badRequest('Só é possível excluir pedidos com status CANCELADO ou ENTREGUE.');
    }

    await pedido.destroy();
    return { message: 'Pedido excluído com sucesso.' };
  }

  /* CART (Pedido with status 'CARRINHO') */

  async getOrCreateCart(usuarioId) {
    await this.validarPedidoEmAndamento(usuarioId);

    let cart = await pedidoRepository.findCartByUserId(usuarioId);
    if (cart) return cart;

    // create empty cart
    const newCart = await pedidoRepository.createOrder({
      usuarioId,
      enderecoId: null,
      formaRecebimento: 'RETIRADA',
      formaPagamento: 'PIX',
      trocoPara: 0,
      taxaEntrega: 0,
      valorTotal: 0,
      status: 'CARRINHO',
      itens: []
    });

    return pedidoRepository.findByIdWithDetails(newCart.id);
  }

  async addProductToCart(usuarioId, produtoId, quantidade) {
    const produto = await produtoRepository.findAvailableById(produtoId);
    if (!produto) {
      throw ApiError.badRequest('Produto não encontrado ou indisponível.');
    }

    const cart = await this.getOrCreateCart(usuarioId);

    // check existing item
    let item = await itemPedidoRepository.findOne({ where: { pedidoId: cart.id, produtoId } });

    const quantidadeNum = Number(quantidade);
    if (!Number.isInteger(quantidadeNum) || quantidadeNum <= 0) {
      throw ApiError.badRequest('Quantidade inválida.');
    }

    if (!item) {
      // create item
      const newItem = await itemPedidoRepository.create({
        pedidoId: cart.id,
        produtoId: produto.id,
        quantidade: quantidadeNum,
        precoUnitario: Number(produto.precoBase),
        subtotal: Number(produto.precoBase) * quantidadeNum
      });
    } else {
      // increment quantity
      const novaQuantidade = Number(item.quantidade) + quantidadeNum;
      await item.update({ quantidade: novaQuantidade, subtotal: Number(item.precoUnitario) * novaQuantidade });
    }

    // recalculate total
    const updated = await pedidoRepository.findByIdWithDetails(cart.id);
    const total = this.calcularTotal(updated.itens, updated.taxaEntrega);
    updated.valorTotal = total;
    if (updated && typeof updated.save === 'function') {
      await updated.save();
    }

    return pedidoRepository.findByIdWithDetails(cart.id);
  }

  async getCart(usuarioId) {
    const cart = await pedidoRepository.findCartByUserId(usuarioId);
    if (!cart) {
      return null;
    }
    return cart;
  }

  async updateCartItemQuantity(usuarioId, produtoId, quantidade) {
    const cart = await pedidoRepository.findCartByUserId(usuarioId);
    if (!cart) {
      throw ApiError.notFound('Carrinho não encontrado.');
    }

    const item = await itemPedidoRepository.findOne({ where: { pedidoId: cart.id, produtoId } });
    if (!item) {
      throw ApiError.notFound('Item não encontrado no carrinho.');
    }

    const quantidadeNum = Number(quantidade);
    if (!Number.isInteger(quantidadeNum)) {
      throw ApiError.badRequest('Quantidade inválida.');
    }

    if (quantidadeNum <= 0) {
      await item.destroy();
    } else {
      await item.update({ quantidade: quantidadeNum, subtotal: Number(item.precoUnitario) * quantidadeNum });
    }

    const updated = await pedidoRepository.findByIdWithDetails(cart.id);
    updated.valorTotal = this.calcularTotal(updated.itens, updated.taxaEntrega);
    if (updated && typeof updated.save === 'function') {
      await updated.save();
    }

    return pedidoRepository.findByIdWithDetails(cart.id);
  }

  async removeProductFromCart(usuarioId, produtoId) {
    const cart = await pedidoRepository.findCartByUserId(usuarioId);
    if (!cart) {
      throw ApiError.notFound('Carrinho não encontrado.');
    }

    const item = await itemPedidoRepository.findOne({ where: { pedidoId: cart.id, produtoId } });
    if (!item) {
      throw ApiError.notFound('Item não encontrado no carrinho.');
    }

    await item.destroy();

    const updated = await pedidoRepository.findByIdWithDetails(cart.id);
    updated.valorTotal = this.calcularTotal(updated.itens, updated.taxaEntrega);
    if (updated && typeof updated.save === 'function') {
      await updated.save();
    }

    return pedidoRepository.findByIdWithDetails(cart.id);
  }

  async finalizeCart(usuarioId) {
    await this.validarPedidoEmAndamento(usuarioId);

    const cart = await pedidoRepository.findCartByUserId(usuarioId);
    if (!cart) {
      throw ApiError.notFound('Carrinho não encontrado.');
    }

    if (!cart.itens || cart.itens.length === 0) {
      throw ApiError.badRequest('Não é possível finalizar um carrinho vazio.');
    }

    // reuse existing 'RECEBIDO' as finalized status
    cart.status = 'RECEBIDO';
    cart.valorTotal = this.calcularTotal(cart.itens, cart.taxaEntrega);
    if (cart && typeof cart.save === 'function') {
      await cart.save();
    }

    return pedidoRepository.findByIdWithDetails(cart.id);
  }

  async validarPedidoEmAndamento(usuarioId) {
    const pedidosDoCliente = await pedidoRepository.findByUserId(usuarioId);
    const possuiPedidoAtivo = (pedidosDoCliente || []).some((pedido) => !['ENTREGUE', 'CANCELADO'].includes(pedido.status));

    if (possuiPedidoAtivo) {
      throw ApiError.badRequest('Você já possui um pedido em andamento. Finalize ou espere a entrega para realizar um novo pedido.');
    }
  }

  validarFormaRecebimento(formaRecebimento) {
    if (!FormasRecebimento.includes(formaRecebimento)) {
      throw ApiError.badRequest('Forma de recebimento inválida.');
    }
  }

  validarFormaPagamento(formaPagamento) {
    if (!FormasPagamento.includes(formaPagamento)) {
      throw ApiError.badRequest('Forma de pagamento inválida.');
    }
  }

  async validarItens(itens = []) {
    if (!Array.isArray(itens) || itens.length === 0) {
      throw ApiError.badRequest('O pedido deve possuir pelo menos um item.');
    }

    const ids = itens.map((item) => item.produtoId);
    const produtos = await produtoRepository.findAvailableByIds(ids);
    const produtosPorId = produtos.reduce((map, produto) => {
      map[produto.id] = produto;
      return map;
    }, {});

    return itens.map((item, index) => {
      const produto = produtosPorId[item.produtoId];

      if (!produto) {
        throw ApiError.badRequest(`O produto informado no item ${index + 1} não está disponível.`);
      }

      const quantidade = Number(item.quantidade);

      if (!Number.isInteger(quantidade) || quantidade <= 0) {
        throw ApiError.badRequest(`A quantidade do item ${index + 1} deve ser um número inteiro maior que zero.`);
      }

      const precoUnitario = Number(produto.precoBase);
      const subtotal = precoUnitario * quantidade;

      return {
        produtoId: produto.id,
        quantidade,
        precoUnitario,
        subtotal,
        observacao: item.observacao || null
      };
    });
  }

  calcularTotal(itens = [], taxaEntrega = 0) {
    const subtotal = itens.reduce((total, item) => total + Number(item.subtotal), 0);
    return Number(subtotal) + Number(taxaEntrega || 0);
  }
}

module.exports = new PedidoService();
