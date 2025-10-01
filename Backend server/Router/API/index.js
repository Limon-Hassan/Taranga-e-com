let express = require('express');
let router = express.Router();
let product = require('./product');
let category = require('./category');

router.use('/product', product);
router.use('/category', category);

module.exports = router;
