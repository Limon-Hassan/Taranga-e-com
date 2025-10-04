let mongoose = require('mongoose');

let CheckoutSchema = new mongoose.Schema({
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
  name: String,
  
  paymentMethod: String,
  paymentStatus: { type: String, default: 'Pending' },
});
