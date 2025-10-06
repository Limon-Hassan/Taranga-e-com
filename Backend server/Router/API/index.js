let express = require('express');
let router = express.Router();
let product = require('./product');
let category = require('./category');
let cart = require('./cart');
let checkout = require('./checkout');

router.use('/product', product);
router.use('/category', category);
router.use('/cart', cart);
router.use('/checkout', checkout);

module.exports = router;
