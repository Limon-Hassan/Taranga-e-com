let express = require('express');
const multer = require('multer');
const path = require('path');
let router = express.Router();
const {
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
} = require('../../AllHandler/categoryHandler');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + uniqueName + extension);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post('/createCategory', upload.array('image', 4), createCategory);
router.get('/getCategory', readCategory);
router.put('/updateCategory', upload.array('image', 4), updateCategory);
router.delete('/deleteCategory', deleteCategory);

module.exports = router;
