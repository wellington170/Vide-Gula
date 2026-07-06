module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      telefone: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },
      senha: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      perfil: {
        type: Sequelize.ENUM('CLIENTE', 'ADMINISTRADOR'),
        allowNull: false,
        defaultValue: 'CLIENTE'
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
    await queryInterface.dropTable('usuarios');
  }
};
