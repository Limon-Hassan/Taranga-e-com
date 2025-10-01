let express = require('express');
const {
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
} = require('../../AllHandler/categoryHandler');
let cloudinary = require('../../Helper/Cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
let router = express.Router();
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Taranga_Category',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
  },
});

const categoryImage = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

router.post(
  '/createCategory',
  categoryImage.array('image', 12),
  createCategory
);
router.get('/getCategory', readCategory);
router.put('/updateCategory', categoryImage.array('image', 12), updateCategory);
router.delete('/deleteCategory', deleteCategory);

module.exports = router;
