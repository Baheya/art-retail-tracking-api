const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { s3 } = require('../../helpers/aws-s3');
const Artwork = require('../../models/artwork');
const fs = require('fs');

async function emptyS3Directory(bucket) {
  const listParams = {
    Bucket: bucket,
  };

  const listedObjects = await s3.listObjectsV2(listParams).promise();

  if (listedObjects.Contents.length === 0) return;

  const deleteParams = {
    Bucket: bucket,
    Delete: { Objects: [] },
  };

  listedObjects.Contents.forEach(({ Key }) => {
    deleteParams.Delete.Objects.push({ Key });
  });

  await s3.deleteObjects(deleteParams).promise();

  if (listedObjects.IsTruncated) await emptyS3Directory(bucket);
}

const uploadFile = (filePath, fileName) => {
  const fileContent = fs.readFileSync(filePath);
  const params = {
    Bucket: process.env['AWS_BUCKET_NAME'],
    Key: fileName,
    Body: fileContent,
  };
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
  });
};

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Heddy',
  email: 'heddy@example.com',
  password: 'heddy123',
  tokens: [
    {
      token: jwt.sign({ id: userOneId }, process.env['JWT_SECRET']),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'Tarek',
  email: 'tarek@example.com',
  password: 'tarek123',
  tokens: [
    {
      token: jwt.sign({ id: userTwoId }, process.env['JWT_SECRET']),
    },
  ],
};

const firstArtwork = {
  _id: new mongoose.Types.ObjectId(),
  title: 'Test Image 2',
  imageURL: `https://${process.env['AWS_BUCKET_NAME']}.s3.ap-south-1.amazonaws.com/test-image2.jpg`,
  artist: userOneId,
};

const secondArtwork = {
  _id: new mongoose.Types.ObjectId(),
  title: 'Test Image 3',
  imageURL: `https://${process.env['AWS_BUCKET_NAME']}.s3.ap-south-1.amazonaws.com/test-image3.jpg`,
  artist: userOneId,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Artwork.deleteMany();
  await emptyS3Directory(process.env['AWS_BUCKET_NAME']);

  await new User(userOne).save();
  await new User(userTwo).save();
  await uploadFile(
    require('path').resolve(__dirname, 'test-image2.jpg'),
    'test-image2.jpg'
  );
  await uploadFile(
    require('path').resolve(__dirname, 'test-image3.jpg'),
    'test-image3.jpg'
  );
  await new Artwork(firstArtwork).save();
  await new Artwork(secondArtwork).save();
};

module.exports = {
  userOne,
  userOneId,
  userTwo,
  userTwoId,
  firstArtwork,
  secondArtwork,
  setupDatabase,
};
