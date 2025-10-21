let express = require('express');
let router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  createProduct,
  getProduct,
  topProduct,
  updateProduct,
  deleteProduct,
} = require('../../AllHandler/productHandler');
const { makeReviews, getReviews } = require('../../AllHandler/reviewHandler');
const { searchProduct } = require('../../AllHandler/searchHandler');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../productImage');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    let extencion = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueName + extencion);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/AddProduct', upload.array('photo', 12), createProduct);
router.get('/getProduct', getProduct);
router.get('/product/searchProduct', searchProduct);
router.post('/CreateReviews', makeReviews);
router.get('/getReviews', getReviews);
router.get('/topProduct', topProduct);
router.put('/updateProduct', upload.array('photo', 12), updateProduct);
router.delete('/deleteProduct', deleteProduct);

module.exports = router;
