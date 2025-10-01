let express = require('express');
let router = express.Router();
let API = require('./API/index');

let BaseURL = process.env.BASEURL;

router.use(BaseURL, API);
router.use(BaseURL, (req, res) => {
  res.status(404).send('No Api Route Found');
});

module.exports = router;
