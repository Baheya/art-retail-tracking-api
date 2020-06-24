const multer = require('multer');
const multerS3 = require('multer-s3');
const { s3 } = require('./aws-s3');

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

const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: process.env['AWS_BUCKET_NAME'],
    key: function (req, file, cb) {
      const fileName = Date.now().toString();
      file.originalname = fileName;
      cb(null, fileName); //use Date.now() for unique file keys
      console.log(file);
    },
  }),
}).single('image');

module.exports = upload;
