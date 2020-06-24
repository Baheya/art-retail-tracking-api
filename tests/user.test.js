const app = require('../src/app');
const request = require('supertest');
const User = require('../models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should register a new user.', async () => {
  const response = await request(app)
    .post('/register')
    .send({
      name: 'Beya',
      email: 'beya@example.com',
      password: 'beya123',
    })
    .expect(201);

  const user = await User.findById({ _id: response.body.user._id });
  expect(user).not.toBe(null);
  expect(response.body).toMatchObject({
    user: {
      name: 'Beya',
      email: 'beya@example.com',
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe('beya123');
});

test('Should login user.', async () => {
  const response = await request(app)
    .post('/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexistent user.', async () => {
  await request(app)
    .post('/login')
    .send({
      email: userOne.email,
      password: 'anonymous123',
    })
    .expect(400);
});

test('Should get user profile.', async () => {
  await request(app)
    .get('/profile')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get profile for unauthorized user.', async () => {
  await request(app).get('/profile').send().expect(401);
});

test('Should delete user profile for authenticated user.', async () => {
  await request(app)
    .delete('/profile')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test('Should fail to delete user profile for unauthenticated user.', async () => {
  await request(app).delete('/profile').send().expect(401);
});

test('Should update valid profile fields for authenticated user', async () => {
  await request(app)
    .patch('/profile')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ name: 'Heddyyy' })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toBe('Heddyyy');
});
