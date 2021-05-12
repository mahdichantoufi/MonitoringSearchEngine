const supertest = require('supertest');
const app = require('./app');

const url = 'lk/jjdhh';
describe('GET /'.concat(url), () => {
  it('should response with an error 404!', async () => {
    const response = await supertest(app)
      .get('/'.concat(url))
      .expect('Content-type', /json/)
      .expect(404);
    expect(response.body.message)
      .toEqual('Not found - /'.concat(url));
  });
});
