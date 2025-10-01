let express = require('express');
require('dotenv').config();
const Connection = require('./config/dbConfig');
let router = require('./Router/index');
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
Connection();
app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World !');
});

const PORT = process.env.PORT || 44044;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
