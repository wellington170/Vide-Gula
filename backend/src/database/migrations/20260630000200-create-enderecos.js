module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('enderecos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      rua: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      numero: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      bairro: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      cidade: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      cep: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      complemento: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      ponto_referencia: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('enderecos');
  }
};
