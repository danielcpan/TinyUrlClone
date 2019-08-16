module.exports = {
  development: {
    database: 'tiny_url_clone_development',
  },
  test: {
    database: 'tiny_url_clone_test',
  },
  production: {
    database: 'mongodb://heroku_j3npvbjk:clh9dgs21qhlns7g4fcpv1vujc@ds163757.mlab.com:63757/heroku_j3npvbjk',
  },
  PORT: process.env.PORT || 5000,
  PUBLIC_URL: process.env.PUBLIC_URL,
  IP_INFO_TOKEN: process.env.IP_INFO_TOKEN,
};
