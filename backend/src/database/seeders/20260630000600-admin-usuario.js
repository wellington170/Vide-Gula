require('dotenv').config();
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@videgula.local';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

    const existingAdmin = await queryInterface.rawSelect(
      'usuarios',
      {
        where: { perfil: 'ADMINISTRADOR' }
      },
      ['id']
    );

    if (existingAdmin) {
      return;
    }

    const senha = bcrypt.hashSync(adminPassword, 10);
    await queryInterface.bulkInsert(
      'usuarios',
      [
        {
          nome: 'Administrador Vide Gula',
          telefone: '00000000000',
          email: adminEmail,
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
