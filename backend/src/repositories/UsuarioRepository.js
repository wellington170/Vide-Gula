const BaseRepository = require('./BaseRepository');
const { Usuario, Endereco } = require('../models');

class UsuarioRepository extends BaseRepository {
  constructor() {
    super(Usuario);
  }

  findByEmail(email) {
    return this.findOne({ where: { email } });
  }

  findByIdWithAddresses(id) {
    return this.findById(id, {
      attributes: { exclude: ['senha'] },
      include: [{ model: Endereco, as: 'enderecos' }]
    });
  }
}

module.exports = new UsuarioRepository();
