module.exports = {
  development: {
    database: 'tiny_url_clone_development',
  },
  test: {
    database: 'tiny_url_clone_test',
  },
  production: {
    database: 'database_production',
  },
  PORT: process.env.PORT || 5000,
  PUBLIC_URL: process.env.PUBLIC_URL,
  IP_INFO_TOKEN: process.env.IP_INFO_TOKEN,
};
