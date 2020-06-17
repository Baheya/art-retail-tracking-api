const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const s3 = new AWS.S3({
  accessKeyId: process.env['AWS_ID'],
  secretAccessKey: process.env['AWS_SECRET'],
});

const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: process.env['AWS_BUCKET_NAME'],
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname); //use Date.now() for unique file keys
    },
  }),
}).single('image');

module.exports = upload;
