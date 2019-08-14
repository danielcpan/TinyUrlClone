module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'tiny_url_clone_development',
    host: 'localhost',
    dialect: 'postgres',
    underscored: true,
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'tiny_url_clone_test',
    host: 'localhost',
    dialect: 'postgres',
    underscored: true,
  },
  production: {
    username: 'postgres',
    password: 'postgres',
    database: 'database_production',
    host: 'localhost',
    dialect: 'postgres',
    underscored: true,
  },
  PORT: process.env.PORT || 5000,
  PUBLIC_URL: process.env.PUBLIC_URL,
  IP_INFO_TOKEN: process.env.IP_INFO_TOKEN
};
