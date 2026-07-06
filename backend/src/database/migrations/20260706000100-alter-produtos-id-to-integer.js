module.exports = {
  async up(queryInterface, Sequelize) {
    const [produtos] = await queryInterface.sequelize.query(
      'SELECT id FROM produtos ORDER BY created_at, id'
    );

    for (const [index, produto] of produtos.entries()) {
      const novoId = index + 1;

      await queryInterface.sequelize.query(
        'UPDATE item_pedidos SET produto_id = ? WHERE produto_id = ?',
        { replacements: [novoId, produto.id] }
      );

      await queryInterface.sequelize.query(
        'UPDATE produtos SET id = ? WHERE id = ?',
        { replacements: [novoId, produto.id] }
      );
    }

    await queryInterface.sequelize.query('ALTER TABLE item_pedidos MODIFY COLUMN produto_id INT NOT NULL');
    await queryInterface.sequelize.query('ALTER TABLE produtos MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT');
    await queryInterface.sequelize.query('ALTER TABLE item_pedidos ADD CONSTRAINT fk_item_pedidos_produto_id FOREIGN KEY (produto_id) REFERENCES produtos (id) ON UPDATE CASCADE ON DELETE RESTRICT');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('ALTER TABLE item_pedidos DROP FOREIGN KEY fk_item_pedidos_produto_id');
    await queryInterface.sequelize.query('ALTER TABLE item_pedidos MODIFY COLUMN produto_id CHAR(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL');
    await queryInterface.sequelize.query('ALTER TABLE produtos MODIFY COLUMN id CHAR(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL');
  }
};
