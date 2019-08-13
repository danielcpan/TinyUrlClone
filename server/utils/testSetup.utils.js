require('dotenv').config();
// const app = require('../app')
const { expect } = require('chai');
const request = require('supertest');
// const { clearDatabase } = require('./mongoose.utils')

before(async () => {
  // await clearDatabase();

  global.expect = expect;
  global.request = request;
});
