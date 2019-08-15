const httpStatus = require('http-status');
const app = require('../app');
const Link = require('../models/link.model');
const { getNextSequence, clearDatabase } = require('../utils/mongoose.utils');

describe('## Link APIs', () => {
  let link;

  before(async () => {
    await clearDatabase();

    // link = await Link.create({
    //   index: await getNextSequence('linkId'),
    //   originalUrl: 'https://iAmaReallyLongTestUrl.com/',
    // });
    const data = {
      index: await getNextSequence('linkId'),
      originalUrl: 'https://iAmaReallyLongTestUrl.com/',
    };
    const response = await request(app).post('/api/links').send(data);
    link = response.body;

  });

  describe('# GET /api/links/:linkId', () => {
    it('should get link details', async () => {
      const response = await request(app).get(`/api/links/${link._id}`);

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body.originalUrl).to.equal(link.originalUrl);
    });
  });

  describe('# GET /api/links', () => {
    it('should get all links', async () => {
      const response = await request(app).get('/api/links');

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body).to.have.lengthOf(1);
    });
  });

  describe('# GET /api/links?tinyUrlId=', () => {
    it('should get all links', async () => {
      const response = await request(app).get(`/api/links?tinyUrlId=${link.tinyUrlId}`);

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body).to.have.lengthOf(1);
    });
  });  

  describe('# POST /api/links', () => {
    it('should create new link', async () => {
      const data = {
        originalUrl: 'https://foobar.com/',
      };
      const response = await request(app).post('/api/links').send(data);

      expect(response.status).to.equal(httpStatus.CREATED);
      expect(response.body.originalUrl).to.equal(data.originalUrl);
    });

    it('should return existing link if already exists', async () => {
      const data = {
        originalUrl: 'https://foobar.com/',
      };
      const response = await request(app).post('/api/links').send(data);

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body.originalUrl).to.equal(data.originalUrl);
    });    
  });

  describe('# PUT /api/links/:linkId', () => {
    it('should update a link', async () => {
      const data = {
        originalUrl: 'https://iAmaReallyLongTestUrlAndNowEvenLonger.com/',
      };
      const response = await request(app).put(`/api/links/${link._id}`).send(data);

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body.originalUrl).to.equal(data.originalUrl);
    });
  });

  describe('# DELETE /api/links/:linkId', () => {
    it('should delete a link', async () => {
      const response = await request(app).delete(`/api/links/${link._id}`);

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body.deleted).to.equal(true);
    });
  });
});
