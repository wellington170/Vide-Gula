require('dotenv').config();
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const senha = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'Admin@123', 10);
    await queryInterface.bulkInsert(
      'usuarios',
      [
        {
          id: require('crypto').randomUUID(),
          nome: 'Administrador Vide Gula',
          telefone: '00000000000',
          email: process.env.ADMIN_EMAIL || 'admin@videgula.local',
          senha,
          perfil: 'ADMINISTRADOR',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('usuarios', {
      email: process.env.ADMIN_EMAIL || 'admin@videgula.local'
    });
  }
};
