const supertest = require('supertest');

const app = require('../../app');

describe('GET api/v1/CKCategories', () => {
  it('should respond with an array of Checkable Keywords Categories', async () => {
    const response = await supertest(app)
      .get('/api/v1/CKCategories')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
describe('GET api/v1/CKCategories/id/1', () => {
  it('should respond with "companies" Checkable Keywords Category', async () => {
    const response = await supertest(app)
      .get('/api/v1/CKCategories/id/1')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ id: 1, name: 'companies' });
  });
});
describe('GET api/v1/CKCategories/id/InvalidIdentifierExampl', () => {
  it('should respond with Error 422 Invalid Id', async () => {
    const response = await supertest(app)
      .get('/api/v1/CKCategories/id/InvalidIdentifierExampl')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).toEqual('Not a valid category identifier: InvalidIdentifierExampl');
  });
});
describe('GET api/v1/CKCategories/id/1212121212', () => {
  it('should respond with Error 422 Invalid Id', async () => {
    const response = await supertest(app)
      .get('/api/v1/CKCategories/id/1212121212')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).toEqual('Not a valid category identifier: 1212121212');
  });
});
describe('GET api/v1/CKCategories/id/121212', () => {
  it('should respond with Error 404 Id Not Found', async () => {
    const response = await supertest(app)
      .get('/api/v1/CKCategories/id/121212')
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body.message).toEqual('Inexistant category identifier: 121212');
  });
});
describe('GET api/v1/CKCategories/name/Companies', () => {
  it('should respond with "companies" Checkable Keywords Category', async () => {
    const response = await supertest(app)
      .get('/api/v1/CKCategories/name/Companies')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ id: 1, name: 'companies' });
  });
});
// add C
describe('POST api/v1/CKCategories/add/New Category', () => {
  it('should respond with newly created Checkable Keywords Category', async () => {
    const response = await supertest(app)
      .post('/api/v1/CKCategories/add/New Category')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ id: 9, name: 'new category' });
  });
});
// check for C
describe('GET api/v1/CKCategories/id/9', () => {
  it('should respond with previously created Checkable Keywords Category', async () => {
    const response = await supertest(app)
      .get('/api/v1/CKCategories/id/9')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ id: 9, name: 'new category' });
  });
});
// delete C (soft delete)
describe('DELETE api/v1/CKCategories/delete/9', () => {
  it('should respond with previously created Checkable Keywords Category', async () => {
    const response = await supertest(app)
      .delete('/api/v1/CKCategories/delete/9')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ deletedRowsNb: 1 });
  });
});
// check for C
describe('GET api/v1/CKCategories/id/9', () => {
  it('should respond with an error 404', async () => {
    const response = await supertest(app)
      .get('/api/v1/CKCategories/id/9')
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body.message).toEqual('Inexistant category identifier: 9');
  });
});
// add C (cancel the soft delete)
describe('POST api/v1/CKCategories/add/new category', () => {
  it('should respond with recreated Checkable Keywords Category', async () => {
    const response = await supertest(app)
      .post('/api/v1/CKCategories/add/new category')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ id: 9, name: 'new category' });
  });
});
// add C (with !== L/U casing)
describe('POST api/v1/CKCategories/add/New Category', () => {
  it('should respond with previously created Checkable Keywords Category', async () => {
    const response = await supertest(app)
      .post('/api/v1/CKCategories/add/NEW CATEGORY')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ id: 9, name: 'new category' });
  });
});
// check for C
describe('GET api/v1/CKCategories/id/9', () => {
  it('should respond with previously created Checkable Keywords Category', async () => {
    const response = await supertest(app)
      .get('/api/v1/CKCategories/id/9')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ id: 9, name: 'new category' });
  });
});
