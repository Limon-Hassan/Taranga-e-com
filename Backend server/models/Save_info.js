const mongoose = require('mongoose');

const savedInfoSchema = new mongoose.Schema({
  phone: { type: Number, required: true, unique: true },
  name: String,
  address: String,
});

module.exports = mongoose.model('savedInfo', savedInfoSchema);
