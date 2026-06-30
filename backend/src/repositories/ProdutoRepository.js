const BaseRepository = require('./BaseRepository');
const { Produto, ItemPedido } = require('../models');

class ProdutoRepository extends BaseRepository {
  constructor() {
    super(Produto);
  }

  findAvailableById(id) {
    return this.findOne({
      where: {
        id,
        ativo: true,
        disponivel: true
      }
    });
  }

  findAvailableByIds(ids) {
    return this.findAll({
      where: {
        id: ids,
        ativo: true,
        disponivel: true
      }
    });
  }

  countLinkedOrders(id) {
    return ItemPedido.count({ where: { produtoId: id } });
  }
}

module.exports = new ProdutoRepository();
