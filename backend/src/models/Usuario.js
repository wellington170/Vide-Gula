module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Usuario',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
      telefone: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      senha: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      perfil: {
        type: DataTypes.ENUM('CLIENTE', 'ADMINISTRADOR'),
        allowNull: false,
        defaultValue: 'CLIENTE'
      }
    },
    {
      tableName: 'usuarios'
    }
  );
};
