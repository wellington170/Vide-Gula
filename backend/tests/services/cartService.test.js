jest.mock('../../src/repositories/PedidoRepository', () => ({
  createOrder: jest.fn(),
  findByUserId: jest.fn(),
  findById: jest.fn(),
  findByIdWithDetails: jest.fn(),
  findAllWithFilters: jest.fn(),
  findCartByUserId: jest.fn()
}));

jest.mock('../../src/repositories/ProdutoRepository', () => ({
  findAvailableById: jest.fn(),
  findAvailableByIds: jest.fn()
}));

jest.mock('../../src/repositories/ItemPedidoRepository', () => ({
  deleteByOrderId: jest.fn(),
  bulkCreate: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn()
}));

const pedidoRepository = require('../../src/repositories/PedidoRepository');
const produtoRepository = require('../../src/repositories/ProdutoRepository');
const itemPedidoRepository = require('../../src/repositories/ItemPedidoRepository');
const PedidoService = require('../../src/services/PedidoService');

describe('Cart (Pedido as cart)', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should create a cart when adding product and none exists', async () => {
    produtoRepository.findAvailableById.mockResolvedValue({ id: 1, precoBase: 10 });
    pedidoRepository.findCartByUserId.mockResolvedValue(null);
    pedidoRepository.createOrder.mockResolvedValue({ id: 5 });
    pedidoRepository.findByIdWithDetails.mockResolvedValue({ id: 5, itens: [{ produtoId:1, quantidade:2, precoUnitario:10, subtotal:20 }], taxaEntrega:0 });

    const result = await PedidoService.addProductToCart(2, 1, 2);

    expect(produtoRepository.findAvailableById).toHaveBeenCalledWith(1);
    expect(pedidoRepository.createOrder).toHaveBeenCalled();
    expect(result.id).toBe(5);
  });

  test('should increment quantity when same product added again', async () => {
    produtoRepository.findAvailableById.mockResolvedValue({ id: 1, precoBase: 10 });
    const cart = { id: 6 };
    pedidoRepository.findCartByUserId.mockResolvedValue(cart);
    itemPedidoRepository.findOne.mockResolvedValue({ pedidoId:6, produtoId:1, quantidade:2, precoUnitario:10, subtotal:20, update: jest.fn() });
    pedidoRepository.findByIdWithDetails.mockResolvedValue({ id:6, itens:[{produtoId:1, quantidade:4, precoUnitario:10, subtotal:40}], taxaEntrega:0 });

    const result = await PedidoService.addProductToCart(3,1,2);

    expect(itemPedidoRepository.findOne).toHaveBeenCalledWith({ where: { pedidoId: 6, produtoId: 1 } });
    expect(result.id).toBe(6);
  });

<<<<<<<<< Temporary merge branch 1
=========
  test('should not finalize cart while client already has an active order', async () => {
    pedidoRepository.findByUserId.mockResolvedValue([{ id: 10, status: 'RECEBIDO' }]);
    pedidoRepository.findCartByUserId.mockResolvedValue({ id: 7, itens: [{ produtoId: 1, subtotal: 10 }] });

    await expect(PedidoService.finalizeCart(4)).rejects.toMatchObject({
      status: 400,
      message: 'Você já possui um pedido em andamento. Finalize ou espere a entrega para realizar um novo pedido.'
    });
  });

>>>>>>>>> Temporary merge branch 2
  test('should not finalize empty cart', async () => {
    pedidoRepository.findCartByUserId.mockResolvedValue({ id: 7, itens: [] });

    await expect(PedidoService.finalizeCart(4)).rejects.toMatchObject({ status: 400 });
  });
});
