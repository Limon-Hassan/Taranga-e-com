let express = require('express');
let router = express.Router();
let product = require('./product');
let category = require('./category');
let cart = require('./cart');

router.use('/product', product);
router.use('/category', category);
router.use('/cart', cart);

module.exports = router;
