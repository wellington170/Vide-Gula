const BaseRepository = require('./BaseRepository');
const { Pedido, ItemPedido, Produto, Endereco } = require('../models');

class PedidoRepository extends BaseRepository {
  constructor() {
    super(Pedido);
  }

  findByUserId(usuarioId) {
    return this.findAll({
      where: { usuarioId },
      include: [
        {
          model: ItemPedido,
          as: 'itens',
          include: [{ model: Produto, as: 'produto' }]
        },
        { model: Endereco, as: 'endereco' }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  findByIdWithDetails(id) {
    return this.findById(id, {
      include: [
        {
          model: ItemPedido,
          as: 'itens',
          include: [{ model: Produto, as: 'produto' }]
        },
        { model: Endereco, as: 'endereco' }
      ]
    });
  }

  findAllWithFilters(filters) {
    return this.findAll({
      where: filters,
      include: [
        {
          model: ItemPedido,
          as: 'itens',
          include: [{ model: Produto, as: 'produto' }]
        },
        { model: Endereco, as: 'endereco' }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  createOrder(orderAttributes) {
    return this.create(orderAttributes, {
      include: [{ model: ItemPedido, as: 'itens' }]
    });
  }
}

module.exports = new PedidoRepository();
