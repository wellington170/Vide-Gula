module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Pedido',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'usuario_id'
      },
      enderecoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'endereco_id'
      },
      status: {
        type: DataTypes.ENUM('CARRINHO','RECEBIDO', 'EM_PREPARO', 'SAIU_PARA_ENTREGA', 'ENTREGUE', 'CANCELADO'),
        allowNull: false,
        defaultValue: 'RECEBIDO'
      },
      formaRecebimento: {
        type: DataTypes.ENUM('DELIVERY', 'RETIRADA'),
        allowNull: false,
        field: 'forma_recebimento'
      },
      formaPagamento: {
        type: DataTypes.ENUM('DINHEIRO', 'PIX', 'CARTAO_CREDITO', 'CARTAO_DEBITO'),
        allowNull: false,
        field: 'forma_pagamento'
      },
      trocoPara: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        field: 'troco_para'
      },
      taxaEntrega: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        field: 'taxa_entrega'
      },
      valorTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'valor_total'
      }
    },
    {
      tableName: 'pedidos'
    }
  );
};
