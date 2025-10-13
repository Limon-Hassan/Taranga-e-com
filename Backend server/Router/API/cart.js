let express = require('express');
const {
  addCart,
  readCart,
  IncrementCart,
  cartSummary,
  deleteSingleCartItem,
  FinalSummery,
} = require('../../AllHandler/cartHandler');
let router = express.Router();

router.post('/addCart', addCart);
router.get('/reatCart', readCart);
router.get('/CartSummery', cartSummary);
router.get('/FinalSummery', FinalSummery);
router.put('/IncrementCart', IncrementCart);
router.delete('/deleteCart', deleteSingleCartItem);

module.exports = router;
