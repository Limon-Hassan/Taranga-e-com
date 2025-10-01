const { default: mongoose } = require('mongoose');

async function Connection() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log('Database Connected!');
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = Connection;
