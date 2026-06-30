module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Produto',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      nome: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      tipo: {
        type: DataTypes.ENUM('PIZZA', 'LANCHE', 'BEBIDA', 'PORCAO'),
        allowNull: false
      },
      precoBase: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'preco_base'
      },
      imagem: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      disponivel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      tableName: 'produtos'
    }
  );
};
