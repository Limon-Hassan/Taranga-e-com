let mongoose = require('mongoose');
let CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    Product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
      },
    ],
    totalproducts: {
      type: Number,
      default: 0,
    },
    image: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('category', CategorySchema);
