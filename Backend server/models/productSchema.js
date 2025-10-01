let mongoose = require('mongoose');

let productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photo: [String],
    sold: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review',
      },
    ],
    Totoalreviews: {
      type: Number,
      default: 0,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
      },
    ],
    disCountPrice: {
      type: Number,
    },
    brand: {
      type: String,
    },
    weight: {
      type: Number,
      default: 0,
    },
    Accessories: {
      type: Number,
    },
    UseTime: {
      type: Number,
    },
    voltage: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('product', productSchema);
