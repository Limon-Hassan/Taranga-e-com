let mongoose = require('mongoose');

let CheckoutSchema = new mongoose.Schema(
  {
    cartId: {
      type: String,
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
        singleSubtotal: {
          type: Number,
        },
      },
    ],
    subTotal: {
      type: Number,
    },
    shippingCost: Number,
    totalPrice: Number,
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    uniqueOrderID: {
      type: String,
    },
    paymentMethod: {
      type: String,
      default: 'cash on delivery',
    },
    paymentStatus: { type: String, default: 'Pending' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('checkout', CheckoutSchema);
