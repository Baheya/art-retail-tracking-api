const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env['AWS_ID'],
  secretAccessKey: process.env['AWS_SECRET'],
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

module.exports = { s3, deleteS3Artwork };
