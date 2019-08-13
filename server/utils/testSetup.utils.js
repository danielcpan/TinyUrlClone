require('dotenv').config();
const { expect } = require('chai');
const request = require('supertest');

before(async () => {
  // await syncTestDatabase();

  global.isValid = isValid;
  global.expect = expect;
  global.request = request;
  global.factory = factory;
  global.truncateTables = truncateTables;
});
