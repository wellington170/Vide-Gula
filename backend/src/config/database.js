require('dotenv').config();

const common = {
  host: process.env.HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  dialect: process.env.DIALECT || 'mysql',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.PASSWORD || null,
    database: process.env.DATABASE || 'vide_gula',
    ...common
  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.PASSWORD || null,
    database: process.env.DATABASE || 'vide_gula_test',
    ...common
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    ...common
  }
};
