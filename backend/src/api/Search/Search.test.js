const supertest = require('supertest');

const app = require('../../app');

describe('POST api/v1/Search/', () => {
  it('should respond with array of 2 docs', async () => {
    const response = await supertest(app)
      .post('/api/v1/Search/')
      .send([
        {
          row: '1',
          rowPosition: 1,
          SearchSelector: null,
          SearchType: 'Titre',
          Keywords: 'Daddy change',
        },
        {
          row: '2',
          rowPosition: 2,
          SearchSelector: 'ou',
          SearchType: 'Titre',
          Keywords: 'ocean',
        },
      ])
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.length)
      .toEqual(2);
  });
  it('should respond with array of 1 docs', async () => {
    const response = await supertest(app)
      .post('/api/v1/Search/')
      .send([
        {
          row: '1',
          rowPosition: 1,
          SearchSelector: null,
          SearchType: 'Titre',
          Keywords: 'ocean',
        },
        {
          row: '2',
          rowPosition: 2,
          SearchSelector: 'ou',
          SearchType: 'Titre',
          Keywords: 'Daddy',
        },
        {
          row: '3',
          rowPosition: 3,
          SearchSelector: 'et',
          SearchType: 'Titre',
          Keywords: 'change',
        },
      ])
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.length)
      .toEqual(1);
  });
  it('should respond with 404 not found', async () => {
    const response = await supertest(app)
      .post('/api/v1/Search/')
      .send([
        {
          row: '1',
          rowPosition: 1,
          SearchSelector: null,
          SearchType: 'Titre',
          Keywords: 'ocean',
        },
        {
          row: '2',
          rowPosition: 2,
          SearchSelector: 'et',
          SearchType: 'Titre',
          Keywords: 'Daddy',
        },
        {
          row: '3',
          rowPosition: 3,
          SearchSelector: 'et',
          SearchType: 'Titre',
          Keywords: 'change',
        },
      ])
      .expect('Content-Type', /json/)
      .expect(404);
  });
});
