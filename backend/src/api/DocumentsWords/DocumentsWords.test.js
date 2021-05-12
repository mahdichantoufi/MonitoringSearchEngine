const supertest = require('supertest');

const app = require('../../app');

describe('GET api/v1/DocumentsWords', () => {
  it('should respond with an array of DocumentsWords', async () => {
    const response = await supertest(app)
      .get('/api/v1/DocumentsWords')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe('GET api/v1/DocumentsWords/id/1', () => {
  it('should respond with a relation Document to Words', async () => {
    const response = await supertest(app)
      .get('/api/v1/DocumentsWords/id/1')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({
      id: 1,
      document_id: 1,
      next_id: 0,
      word_id: 298,
    });
  });
});
describe('GET api/v1/DocumentsWords/id/InvalidIdentifierExampl', () => {
  it('should respond with Error 422 Invalid Id', async () => {
    const response = await supertest(app)
      .get('/api/v1/DocumentsWords/id/InvalidIdentifierExampl')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).toEqual('Not a valid DocumentsWords identifier: InvalidIdentifierExampl');
  });
});
describe('GET api/v1/DocumentsWords/id/121212121212', () => {
  it('should respond with Error 422 Invalid Id', async () => {
    const response = await supertest(app)
      .get('/api/v1/DocumentsWords/id/121212121212')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).toEqual('Not a valid DocumentsWords identifier: 121212121212');
  });
});
describe('GET api/v1/DocumentsWords/id/123450', () => {
  it('should respond with Error 404 Id Not Found', async () => {
    const response = await supertest(app)
      .get('/api/v1/DocumentsWords/id/1212')
      .expect('Content-Type', /json/);
    expect(response.body.message).toEqual('Inexistant DocumentsWords identifier: 1212');
  });
});
