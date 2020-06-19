const app = require('../src/app');
const request = require('supertest');

test('Should register a new user.', async () => {
  await request(app)
    .post('/register')
    .send({
      name: 'Tarek',
      email: 'tarek@example.com',
      password: 'tarek123',
    })
    .expect(201);
});
