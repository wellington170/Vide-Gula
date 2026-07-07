class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  findById(id, options = {}) {
    return this.model.findByPk(id, options);
  }

  findOne(options = {}) {
    return this.model.findOne(options);
  }

  findAll(options = {}) {
    return this.model.findAll(options);
  }

  create(attributes, options = {}) {
    return this.model.create(attributes, options);
  }

  bulkCreate(records, options = {}) {
    return this.model.bulkCreate(records, options);
  }

  update(instance, attributes) {
    return instance.update(attributes);
  }

  delete(instance) {
    return instance.destroy();
  }
}

module.exports = BaseRepository;
