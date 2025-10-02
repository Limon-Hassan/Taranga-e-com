const cartSchema = require('../models/cartSchema');
const productSchema = require('../models/productSchema');

async function addCart(req, res) {
  let { cartId, productId, area } = req.body;

  try {
    const product = await productSchema.findById(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    let cart = await cartSchema.findOne({ cartId });
    if (!cart) {
      cart = new cartSchema({
        cartId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      item => item.productId.toString() === productId
    );
    if (existingItem)
      return res
        .status(400)
        .json({ msg: 'This product is already in your cart' });

    const qty = 1;
    const price = Number(product.price) || 0;
    const weight = Number(product.weight) || 1;

    const shippingCost =
      weight <= 1
        ? area === 'inside'
          ? 60
          : 120
        : weight <= 2
        ? area === 'inside'
          ? 80
          : 150
        : area === 'inside'
        ? 100
        : 200;

    cart.items.push({
      productId,
      quantity: qty,
      price,
      weight,
      singleSubtotal: price * qty,
      shippingCost,
    });

    cart.subTotal = cart.items.reduce(
      (acc, item) => acc + Number(item.singleSubtotal),
      0
    );

    cart.shippingCost = cart.items.reduce(
      (acc, item) => acc + Number(item.shippingCost),
      0
    );
    cart.totalPrice = cart.subTotal + cart.shippingCost;

    await cart.save();
    return res.status(200).json({ msg: 'Product added to cart!', data: cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error', error: String(error) });
  }
}

async function readCart(req, res) {
  let { cartId } = req.query;
  try {
    let getCart = await cartSchema
      .findOne({ cartId })
      .populate('items.productId');

    if (!getCart) {
      return res.status(404).json({ msg: 'cart not found !' });
    }
    let item = getCart.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      singleSubtotal: item.price * item.quantity,
    }));
    let subTotal = item.reduce(
      (acc, item) => acc + Number(item.singleSubtotal),
      0
    );

    return res.status(200).json({
      msg: 'Cart fetched successfully',
      data: {
        cartId: getCart.cartId,
        item,
        subTotal,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function cartSummary(req, res) {
  try {
    const { cartId } = req.query;

    const cart = await cartSchema
      .findOne({ cartId })
      .populate('items.productId');

    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    cart.items = cart.items.map(item => {
      item.singleSubtotal = item.productId.price * item.quantity;
      return item;
    });

    cart.subTotal = cart.items.reduce(
      (acc, item) => acc + item.singleSubtotal,
      0
    );

    cart.shippingCost = cart.items.reduce(
      (acc, item) => acc + (item.shippingCost || 0),
      0
    );

    cart.totalPrice = cart.subTotal + cart.shippingCost;

    return res.status(200).json({
      msg: 'Cart summary fetched successfully',
      data: {
        cartId: cart.cartId,
        subTotal: cart.subTotal,
        shippingCost: cart.shippingCost,
        totalPrice: cart.totalPrice,
        items: cart.items,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error', error: String(error) });
  }
}

async function IncrementCart(req, res) {
  let { cartId, action } = req.query;
  try {
    let cartItems = await cartSchema
      .findOne({ cartId })
      .populate('items.productId');

    if (!cartItems) {
      return res.status(404).json({ msg: 'cart not found!' });
    }

    if (action === 'Increment') {
      if (cartItems.items[0].quantity >= 20) {
        return res.status(400).json({ msg: 'Max quantity of 20 reached' });
      } else if (
        cartItems.items[0].productId.stock <= cartItems.items[0].quantity
      ) {
        return res.status(400).json({ msg: 'Not enough stock available' });
      } else {
        cartItems.items[0].quantity += 1;
      }
    } else if (action === 'Decrement') {
      if (cartItems.items[0].quantity <= 1) {
        return res.status(400).json({ msg: 'Quantity cannot go below 1' });
      } else {
        cartItems.items[0].quantity -= 1;
      }
    } else {
      return res
        .status(400)
        .json({ msg: 'Invalid action or quantity cannot go below 1' });
    }

    cartItems.items = cartItems.items.map(item => {
      item.singleSubtotal = item.productId.price * item.quantity;
      return item;
    });

    cartItems.subTotal = cartItems.items.reduce(
      (acc, item) => acc + item.singleSubtotal,
      0
    );

    cartItems.shippingCost = cartItems.items.reduce(
      (acc, item) => acc + (item.shippingCost || 0),
      0
    );

    cartItems.totalPrice = cartItems.subTotal + cartItems.shippingCost;

    await cartItems.save();
    return res.status(200).json({
      msg: `Cart ${
        action === 'Increment' ? 'Incremented' : 'Decremented'
      } successfully`,
      data: cartItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
}

async function deletedcart(req, res) {
  let { cartId } = req.query;
  try {
    let deleteCart = await cartSchema.findOneAndDelete({ cartId });
    return res
      .status(200)
      .json({ msg: 'cart delete Successfully !', data: deleteCart });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addCart, readCart, cartSummary, IncrementCart, deletedcart };
