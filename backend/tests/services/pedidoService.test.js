jest.mock('../../src/repositories/PedidoRepository', () => ({
  createOrder: jest.fn(),
  findByUserId: jest.fn(),
  findById: jest.fn(),
  findByIdWithDetails: jest.fn(),
  findAllWithFilters: jest.fn()
}));

jest.mock('../../src/repositories/ProdutoRepository', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  countLinkedOrders: jest.fn(),
  findAvailableByIds: jest.fn(),
  findAvailableById: jest.fn()
}));

jest.mock('../../src/repositories/EnderecoRepository', () => ({
  findActiveByIdAndUser: jest.fn(),
  update: jest.fn(),
  create: jest.fn()
}));

jest.mock('../../src/repositories/ItemPedidoRepository', () => ({
  deleteByOrderId: jest.fn(),
  bulkCreate: jest.fn()
}));

const pedidoRepository = require('../../src/repositories/PedidoRepository');
const produtoRepository = require('../../src/repositories/ProdutoRepository');
const enderecoRepository = require('../../src/repositories/EnderecoRepository');
const PedidoService = require('../../src/services/PedidoService');

describe('PedidoService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('deve criar um pedido com sucesso para delivery', async () => {
    const pedidoCriado = { id: 99, valorTotal: 45 };

    produtoRepository.findAvailableByIds.mockResolvedValue([{ id: 1, precoBase: 20 }]);
    enderecoRepository.findActiveByIdAndUser.mockResolvedValue({ id: 7 });
    pedidoRepository.createOrder.mockResolvedValue(pedidoCriado);

    const result = await PedidoService.criarPedido(10, {
      items: [{ produtoId: 1, quantidade: 2 }],
      formaRecebimento: 'DELIVERY',
      formaPagamento: 'DINHEIRO',
      enderecoId: 7,
      taxaEntrega: 5,
      trocoPara: 0
    });

    expect(produtoRepository.findAvailableByIds).toHaveBeenCalledTimes(1);
    expect(produtoRepository.findAvailableByIds).toHaveBeenCalledWith([1]);
    expect(enderecoRepository.findActiveByIdAndUser).toHaveBeenCalledTimes(1);
    expect(enderecoRepository.findActiveByIdAndUser).toHaveBeenCalledWith(7, 10);
    expect(pedidoRepository.createOrder).toHaveBeenCalledTimes(1);
    expect(pedidoRepository.createOrder).toHaveBeenCalledWith(expect.objectContaining({
      usuarioId: 10,
      enderecoId: 7,
      formaRecebimento: 'DELIVERY',
      formaPagamento: 'DINHEIRO',
      trocoPara: 0,
      taxaEntrega: 5,
      valorTotal: 45,
      status: 'RECEBIDO'
    }));
    expect(result).toEqual(pedidoCriado);
  });

  test('deve rejeitar pedido delivery sem endereço', async () => {
    await expect(PedidoService.criarPedido(10, {
      items: [{ produtoId: 1, quantidade: 1 }],
      formaRecebimento: 'DELIVERY',
      formaPagamento: 'PIX'
    })).rejects.toMatchObject({ status: 400, message: 'Pedidos delivery exigem um endereço cadastrado.' });

    expect(produtoRepository.findAvailableByIds).not.toHaveBeenCalled();
    expect(pedidoRepository.createOrder).not.toHaveBeenCalled();
  });

  test('deve rejeitar troca para pagamento não em dinheiro', async () => {
    await expect(PedidoService.criarPedido(10, {
      items: [{ produtoId: 1, quantidade: 1 }],
      formaRecebimento: 'RETIRADA',
      formaPagamento: 'PIX',
      trocoPara: 10
    })).rejects.toMatchObject({ status: 400, message: 'Troco só é permitido para pagamento em dinheiro.' });

    expect(produtoRepository.findAvailableByIds).not.toHaveBeenCalled();
  });

  test('deve impedir novo pedido enquanto houver outro pedido em andamento', async () => {
    produtoRepository.findAvailableByIds.mockResolvedValue([{ id: 1, precoBase: 20 }]);
    pedidoRepository.findByUserId.mockResolvedValue([{ id: 5, status: 'RECEBIDO' }]);

    await expect(PedidoService.criarPedido(10, {
      items: [{ produtoId: 1, quantidade: 1 }],
      formaRecebimento: 'RETIRADA',
      formaPagamento: 'DINHEIRO'
    })).rejects.toMatchObject({
      status: 400,
      message: 'Você já possui um pedido em andamento. Finalize ou espere a entrega para realizar um novo pedido.'
    });

    expect(pedidoRepository.createOrder).not.toHaveBeenCalled();
  });

  test('deve rejeitar itens vazios', async () => {
    await expect(PedidoService.criarPedido(10, {
      items: [],
      formaRecebimento: 'RETIRADA',
      formaPagamento: 'DINHEIRO'
    })).rejects.toMatchObject({ status: 400, message: 'O pedido deve possuir pelo menos um item.' });

    expect(produtoRepository.findAvailableByIds).not.toHaveBeenCalled();
  });

  test('deve propagar exceções vindas do repository', async () => {
    produtoRepository.findAvailableByIds.mockRejectedValue(new Error('Falha ao consultar produtos'));

    await expect(PedidoService.criarPedido(10, {
      items: [{ produtoId: 1, quantidade: 1 }],
      formaRecebimento: 'RETIRADA',
      formaPagamento: 'DINHEIRO'
    })).rejects.toThrow('Falha ao consultar produtos');
  });

  test('deve excluir pedido admin quando o status estiver cancelado ou entregue', async () => {
    const pedido = { id: 7, status: 'ENTREGUE', destroy: jest.fn().mockResolvedValue(true) };
    pedidoRepository.findById.mockResolvedValue(pedido);

    const result = await PedidoService.excluirPedidoAdmin(7);

    expect(pedidoRepository.findById).toHaveBeenCalledWith(7);
    expect(pedido.destroy).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ message: 'Pedido excluído com sucesso.' });
  });

  test('deve rejeitar exclusão admin de pedido com status diferente de cancelado ou entregue', async () => {
    const pedido = { id: 8, status: 'RECEBIDO', destroy: jest.fn() };
    pedidoRepository.findById.mockResolvedValue(pedido);

    await expect(PedidoService.excluirPedidoAdmin(8)).rejects.toMatchObject({
      status: 400,
      message: 'Só é possível excluir pedidos com status CANCELADO ou ENTREGUE.'
    });

    expect(pedido.destroy).not.toHaveBeenCalled();
  });
});
