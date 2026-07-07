const BaseRepository = require('./BaseRepository');
const { ItemPedido } = require('../models');

class ItemPedidoRepository extends BaseRepository {
  constructor() {
    super(ItemPedido);
  }

  deleteByOrderId(pedidoId) {
    return this.model.destroy({ where: { pedidoId } });
  }
}

module.exports = new ItemPedidoRepository();
