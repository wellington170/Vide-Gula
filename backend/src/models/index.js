const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  define: config.define,
  logging: false
});

const Usuario = require('./Usuario')(sequelize, DataTypes);
const Endereco = require('./Endereco')(sequelize, DataTypes);
const Produto = require('./Produto')(sequelize, DataTypes);
const Pedido = require('./Pedido')(sequelize, DataTypes);
const ItemPedido = require('./ItemPedido')(sequelize, DataTypes);

Usuario.hasMany(Endereco, { as: 'enderecos', foreignKey: 'usuarioId' });
Endereco.belongsTo(Usuario, { as: 'usuario', foreignKey: 'usuarioId' });

Usuario.hasMany(Pedido, { as: 'pedidos', foreignKey: 'usuarioId' });
Pedido.belongsTo(Usuario, { as: 'usuario', foreignKey: 'usuarioId' });

Endereco.hasMany(Pedido, { as: 'pedidos', foreignKey: 'enderecoId' });
Pedido.belongsTo(Endereco, { as: 'endereco', foreignKey: 'enderecoId' });

Pedido.hasMany(ItemPedido, { as: 'itens', foreignKey: 'pedidoId', onDelete: 'CASCADE' });
ItemPedido.belongsTo(Pedido, { as: 'pedido', foreignKey: 'pedidoId' });

Produto.hasMany(ItemPedido, { as: 'itens', foreignKey: 'produtoId' });
ItemPedido.belongsTo(Produto, { as: 'produto', foreignKey: 'produtoId' });

module.exports = {
  sequelize,
  Sequelize,
  Usuario,
  Endereco,
  Produto,
  Pedido,
  ItemPedido
};
