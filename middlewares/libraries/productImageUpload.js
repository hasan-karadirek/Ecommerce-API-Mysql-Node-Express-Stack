const multer = require('multer');
const path = require('path');
const CustomError = require('../../helpers/error/CustomError.js');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    cb(null, path.join(rootDir, '/public/productImages'));
  },
  filename: function (req, file, cb) {
    req.productImages = req.productImages || [];
    const timestamp = Date.now();
    req.productImages.push({
      path:
        '/public/productImages/' +
        timestamp +
        file.originalname.replace(' ', '-'),
    });

    cb(null, timestamp + file.originalname.replace(' ', '-'));
  },
});
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    cb(new CustomError('Please provide a valid image file', 400), false);
  }
  return cb(null, true);
};
const limits = {
  fieldSize: 50 * 1024 * 1024, // 50MB (adjust as needed)
};

const productImagesUpload = multer({ storage, fileFilter, limits });

module.exports = { productImagesUpload };
