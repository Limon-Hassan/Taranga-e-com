let express = require('express');
let cloudinary = require('../../Helper/Cloudinary');
const multer = require('multer');
let router = express.Router();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const {
  createProduct,
  getProduct,
  topProduct,
  updateProduct,
  deleteProduct,
} = require('../../AllHandler/productHandler');
const { makeReviews, getReviews } = require('../../AllHandler/reviewHandler');
const { searchProduct } = require('../../AllHandler/searchHandler');
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
router.get('/product/searchProduct', searchProduct);
router.post('/CreateReviews', makeReviews);
router.get('/getReviews', getReviews);
router.get('/topProduct', topProduct);
router.put('/updateProduct', ProductPhoto.array('photo', 12), updateProduct);
router.delete('/deleteProduct', deleteProduct);

module.exports = router;
