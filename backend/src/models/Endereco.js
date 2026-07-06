module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Endereco',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        field: 'usuario_id'
      },
      rua: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      numero: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      bairro: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      cidade: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      estado: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      cep: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      complemento: {
        type: DataTypes.STRING(150),
        allowNull: true
      },
      pontoReferencia: {
        type: DataTypes.STRING(200),
        allowNull: true,
        field: 'ponto_referencia'
      },
      ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      tableName: 'enderecos'
    }
  );
};
