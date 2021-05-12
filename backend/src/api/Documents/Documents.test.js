const supertest = require('supertest');

const app = require('../../app');

describe('GET api/v1/Documents', () => {
  it('should respond with an array of Documents', async () => {
    const response = await supertest(app)
      .get('/api/v1/Documents')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe('GET api/v1/Documents/id/1', () => {
  it('should respond with "Daddy-changes-for-kraft-paper" Document', async () => {
    const response = await supertest(app)
      .get('/api/v1/Documents/id/1')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ id: 1, title: 'daddy-changes-for-kraft-paper', url: 'Files/Original_PDFs/Daddy-changes-for-kraft-paper.pdf' });
  });
});
describe('GET api/v1/Documents/id/InvalidIdentifierExampl', () => {
  it('should respond with Error 422 Invalid Id', async () => {
    const response = await supertest(app)
      .get('/api/v1/Documents/id/InvalidIdentifierExampl')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).toEqual('Not a valid document identifier: InvalidIdentifierExampl');
  });
});
describe('GET api/v1/Documents/id/121212121212', () => {
  it('should respond with Error 422 Invalid Id', async () => {
    const response = await supertest(app)
      .get('/api/v1/Documents/id/121212121212')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).toEqual('Not a valid document identifier: 121212121212');
  });
});
describe('GET api/v1/Documents/id/1212', () => {
  it('should respond with Error 404 Id Not Found', async () => {
    const response = await supertest(app)
      .get('/api/v1/Documents/id/1212')
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body.message).toEqual('Inexistant document identifier: 1212');
  });
});
