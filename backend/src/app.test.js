const supertest = require('supertest');
const project = require('./constants/project');
const app = require('./app');

describe('GET /', () => {
  it('Should response with a message !', async () => {
    const response = await supertest(app)
      .get('/')
      .expect('Content-type', /json/)
      .expect(200);
    expect(response.body.message)
      .toEqual(project.message);
  });
});
