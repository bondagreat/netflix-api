const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'private/videos');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().getTime() +
        '' +
        Math.round(Math.random() * 1000000000) +
        '.' +
        file.mimetype.split('/')[1]
    );
  },
});

module.exports = multer({ storage });
