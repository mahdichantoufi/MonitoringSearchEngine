const supertest = require('supertest');

const app = require('../../app');

// GET requests Tests
describe('GET api/v1/CheckableKeywords', () => {
  it('should respond with an array of Checkable Keywords', async () => {
    const response = await supertest(app)
      .get('/api/v1/CheckableKeywords')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

// GET BY ID requests Tests
describe('GET api/v1/CheckableKeywords/id/1', () => {
  it('should respond with "thaï union" Checkable Keyword', async () => {
    const response = await supertest(app)
      .get('/api/v1/CheckableKeywords/id/1')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({
      id: 1,
      keyword: 'thaï union',
      Category_id: 1,
    });
  });
});
describe('GET api/v1/CheckableKeywords/id/121212121212', () => {
  it('should respond with Error 422 Invalid Id', async () => {
    const response = await supertest(app)
      .get('/api/v1/CheckableKeywords/id/121212121212')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).toEqual('Not a valid category identifier: 121212121212');
  });
});
describe('GET api/v1/CheckableKeywords/id/InvalidIdentifierExampl', () => {
  it('should respond with Error 422 Invalid Id', async () => {
    const response = await supertest(app)
      .get('/api/v1/CheckableKeywords/id/InvalidIdentifierExampl')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).toEqual('Not a valid category identifier: InvalidIdentifierExampl');
  });
});
describe('GET api/v1/CheckableKeywords/id/121212', () => {
  it('should respond with Error 404 Id Not Found', async () => {
    const response = await supertest(app)
      .get('/api/v1/CheckableKeywords/id/121212')
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body.message).toEqual('Inexistant category identifier: 121212');
  });
});

// GET By keyword
describe('GET api/v1/CheckableKeywords/keyword/Companies', () => {
  it('should respond with "companies" Checkable Keywords Category', async () => {
    const response = await supertest(app)
      .get('/api/v1/CheckableKeywords/keyword/thaï union')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({
      id: 1,
      keyword: 'thaï union',
      Category_id: 1,
    });
  });
});

// GET keywords By categoryId
describe('GET api/v1/CheckableKeywords/categoryId/1', () => {
  it('should respond with an array of Checkable Keywords listed under category 1', async () => {
    const response = await supertest(app)
      .get('/api/v1/CheckableKeywords/categoryId/1')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
describe('GET api/v1/CheckableKeywords/categoryId/InvalidIdentifierExampl', () => {
  it('should respond with Error 422 Invalid Id', async () => {
    const response = await supertest(app)
      .get('/api/v1/CheckableKeywords/categoryId/InvalidIdentifierExampl')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).toEqual('Not a valid category identifier: InvalidIdentifierExampl');
  });
});
describe('GET api/v1/CheckableKeywords/categoryId/121212', () => {
  it('should respond with Error 404 Id Not Found', async () => {
    const response = await supertest(app)
      .get('/api/v1/CheckableKeywords/categoryId/121212')
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body.message).toEqual('No Keywords are attached to the category identifier: 121212');
  });
});

// Set of tests using add and delete methode and
// relies on previous tests passing for checking results (GET routes)
describe('POST api/v1/CheckableKeywords/add/', () => {
  it('should respond with newly created Checkable Keyword', async () => {
    const response = await supertest(app)
      .post('/api/v1/CheckableKeywords/add')
      .send({
        keyword: 'New Keyword',
        Category_id: 1,
      })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ id: 85, keyword: 'new keyword', Category_id: 1 });
  });
});
// check for K
describe('GET api/v1/CheckableKeywords/id/85', () => {
  it('should respond with previously created Checkable Keyword', async () => {
    const response = await supertest(app)
      .get('/api/v1/CheckableKeywords/id/85')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ id: 85, keyword: 'new keyword', Category_id: 1 });
  });
});
// delete K (soft delete)
describe('DELETE api/v1/CheckableKeywords/delete/85', () => {
  it('should respond with deletedRowsNb = 1', async () => {
    const response = await supertest(app)
      .delete('/api/v1/CheckableKeywords/delete/85')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ deletedRowsNb: 1 });
  });
});
// check for K
describe('GET api/v1/CheckableKeywords/id/85', () => {
  it('should respond with an error 404', async () => {
    const response = await supertest(app)
      .get('/api/v1/CheckableKeywords/id/85')
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body.message).toEqual('Inexistant category identifier: 85');
  });
});
// add K (cancel the soft delete)
describe('POST api/v1/CheckableKeywords/add', () => {
  it('should respond with recreated Checkable Keyword', async () => {
    const response = await supertest(app)
      .post('/api/v1/CheckableKeywords/add')
      .send({
        keyword: 'New Keyword',
        Category_id: 1,
      })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ id: 85, keyword: 'new keyword', Category_id: 1 });
  });
});
// add K (!== Lower-Upper-Casing)
describe('POST api/v1/CheckableKeywords/add', () => {
  it('should respond with previously created Checkable Keyword', async () => {
    const response = await supertest(app)
      .post('/api/v1/CheckableKeywords/add')
      .send({
        keyword: 'NEW KeyWOrd',
        Category_id: 1,
      })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ id: 85, keyword: 'new keyword', Category_id: 1 });
  });
});
// check for K
describe('GET api/v1/CheckableKeywords/id/85', () => {
  it('should respond with previously created Checkable Keyword', async () => {
    const response = await supertest(app)
      .get('/api/v1/CheckableKeywords/id/85')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ id: 85, keyword: 'new keyword', Category_id: 1 });
  });
});
