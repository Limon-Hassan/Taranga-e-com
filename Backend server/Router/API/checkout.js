let express = require('express');
const {
  makeCheckout,
  AdminReadCheckout,
  deleteCheckout,
} = require('../../AllHandler/checkoutHandler');
let router = express.Router();

router.post('/makeCheckout', makeCheckout);
router.get('/AdminReadCheckout', AdminReadCheckout);
router.delete('/deleteChechout', deleteCheckout);

module.exports = router;
