const AWS = require('aws-sdk');
const { ErrorHandler } = require('./error');

const s3 = new AWS.S3({
  accessKeyId: process.env['AWS_ID'],
  secretAccessKey: process.env['AWS_SECRET'],
  signatureVersion: 'v4',
  region: 'ap-south-1',
});

const deleteS3Artwork = async (fileName) => {
  const deleteParams = {
    Bucket: process.env['AWS_BUCKET_NAME'],
    Key: fileName,
  };
  try {
    await s3
      .deleteObject(deleteParams, (error, data) => {
        if (error) {
          console.log(error);
        }
      })
      .promise();
  } catch (error) {
    console.log(error);
  }
};

const generateGetUrl = (artwork) => {
  const params = {
    Bucket: process.env['AWS_BUCKET_NAME'],
    Key: artwork,
    Expires: 120, // 2 minutes
  };
  // Note operation in this case is getObject
  const data = s3.getSignedUrl('getObject', params);
  return data;
};

module.exports = { s3, deleteS3Artwork, generateGetUrl };
