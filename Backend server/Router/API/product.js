let express = require('express');
let cloudinary = require('../../Helper/Cloudinary');
const multer = require('multer');
let router = express.Router();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const {
  createProduct,
  getProduct,
} = require('../../AllHandler/productHandler');
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Taranga_Photos',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
  },
});

const ProductPhoto = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

router.post('/AddProduct', ProductPhoto.array('photo', 12), createProduct);
router.get('/getProduct', getProduct);

module.exports = router;
