const app = require('../src/app');
const request = require('supertest');
const Artwork = require('../models/artwork');
const {
  userOneId,
  userOne,
  userTwo,
  userTwoId,
  firstArtwork,
  setupDatabase,
} = require('./fixtures/db');

beforeEach(setupDatabase);

jest.setTimeout(10000);

test('Should upload artwork.', async () => {
  const response = await request(app)
    .post('/upload-artwork')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .field({ title: 'Testing', edition: 1 })
    .attach('image', 'tests/fixtures/test-image.jpg')
    .expect(201);
  const artwork = await Artwork.findById(response.body.artwork._id);
  expect(artwork).not.toBeNull();
});

test('Should get artworks for authorized user.', async () => {
  const response = await request(app)
    .get(`/artworks`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.artworks.length).toBe(2);
});

test('Should get artwork for authorized user.', async () => {
  const response = await request(app)
    .get(`/artwork/${firstArtwork._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const artwork = await Artwork.findById(response.body.artwork._id);
  expect(artwork).not.toBeNull();
});

test('Should not get artwork for unauthorized user.', async () => {
  await request(app)
    .get(`/artwork/${firstArtwork._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
});

test('Should update artwork for authorized user.', async () => {
  const response = await request(app)
    .patch(`/artwork/${firstArtwork._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      title: 'Artwork title has been altered.',
    })
    .expect(200);
  const artwork = await Artwork.findById(response.body.artwork._id);
  expect(artwork.title).toBe('Artwork title has been altered.');
});

test('Should not update artwork for unauthorized user.', async () => {
  await request(app)
    .patch(`/artwork/${firstArtwork._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send({ title: 'Artwork title should remain the same.' })
    .expect(404);
});

test('Should delete artwork for authorized user.', async () => {
  await request(app)
    .delete(`/artwork/${firstArtwork._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const artwork = await Artwork.findById(firstArtwork._id);
  expect(artwork).toBeNull();
});

test('Should not delete artwork for unauthorized user.', async () => {
  await request(app)
    .delete(`/artwork/${firstArtwork._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
});
