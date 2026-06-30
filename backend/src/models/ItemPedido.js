module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'ItemPedido',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      pedidoId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'pedido_id'
      },
      produtoId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'produto_id'
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      precoUnitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'preco_unitario'
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      observacao: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: 'item_pedidos'
    }
  );
};
