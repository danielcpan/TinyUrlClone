const httpStatus = require('http-status');
const app = require('../app');
const Link = require('../models/link.model');
const { clearDatabase } = require('../utils/mongoose.utils');

describe('## TinyUrl APIs', () => {
  let link;

  before(async () => {
    await clearDatabase();

    const data = {
      originalUrl: 'https://www.google.com/maps/place/California+State+University+Long+Beach/@33.7838235,-118.1162844,17z/data=!3m1!4b1!4m5!3m4!1s0x80dd31d82982f643:0x1fdc7f26cec72dab!8m2!3d33.7838235!4d-118.1140904',
    };
    const response = await request(app).post('/api/links').send(data);
    link = response.body;
  });

  describe('# GET /:tinyUrl', () => {
    it('should redirect to original link', async () => {
      const response = await request(app).get(`/${Link.getTinyUrlEndPoint(link.index)}`);

      expect(response.status).to.equal(httpStatus.FOUND);
    });
  });
});
