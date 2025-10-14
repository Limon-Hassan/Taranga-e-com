let express = require('express');
const {
  makeCheckout,
  AdminReadCheckout,
  deleteCheckout,
  getSavedInfo,
} = require('../../AllHandler/checkoutHandler');
let router = express.Router();

router.post('/makeCheckout', makeCheckout);
router.get('/AdminReadCheckout', AdminReadCheckout);
router.get('/getSavedInfo', getSavedInfo);
router.delete('/deleteChechout', deleteCheckout);

module.exports = router;
