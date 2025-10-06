let mongoose = require('mongoose');

let reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
    },

    comment: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('review', reviewSchema);
