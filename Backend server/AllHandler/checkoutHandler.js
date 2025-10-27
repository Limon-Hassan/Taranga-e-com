const cartSchema = require('../models/cartSchema');
const checkoutSchema = require('../models/checkoutSchema');
const productSchema = require('../models/productSchema');
const Save_info = require('../models/Save_info');
const { getIO } = require('../socket_server');
const { v4: uuidv4 } = require('uuid');

async function makeCheckout(req, res) {
  let { cartId, name, address, phone, paymentMethod, saveInfo } = req.body;
  try {
    let cartdata = await cartSchema
      .findOne({ cartId })
      .populate('items.productId');

    if (!cartdata) return res.status(404).json({ msg: 'Cart not Found' });

    cartdata.subTotal = cartdata.items.reduce(
      (acc, item) => acc + Number(item.singleSubtotal),
      0
    );
    cartdata.shippingCost = cartdata.items.reduce(
      (acc, item) => acc + Number(item.shippingCost),
      0
    );

    if (saveInfo) {
      await Save_info.findOneAndUpdate(
        { phone: Number(phone) },
        { name, address, phone: Number(phone) },
        { upsert: true, new: true }
      );
    }
    let oderId = `ODR-${uuidv4().split('-')[0].toUpperCase()}`;

    cartdata.totalPrice = cartdata.subTotal + cartdata.shippingCost;
    let checkout = new checkoutSchema({
      cartId,
      uniqueOrderID: oderId,
      items: cartdata.items,
      subTotal: cartdata.subTotal,
      shippingCost: cartdata.shippingCost,
      totalPrice: cartdata.totalPrice,
      name,
      address,
      phone: Number(phone),
      paymentMethod,
    });
    await checkout.save();
    getIO().to(cartId).emit('checkout', {
      cartId: checkout.cartId,
      name: checkout.name,
      phone: checkout.phone,
      address: checkout.address,
      paymentMethod: checkout.paymentMethod,
      subTotal: checkout.subTotal,
      shippingCost: checkout.shippingCost,
      totalPrice: checkout.totalPrice,
      items: checkout.items,
      status: 'success',
    });
    await cartSchema.findOneAndDelete({ cartId });
    getIO().to(cartId).emit('deletedCart', { cartId });
    return res.status(200).json({
      msg: 'Checkout successful',
      data: checkout,
    });
  } catch (error) {
    console.log(error.message);
    console.error(error.message);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
}

async function directCheckout(req, res) {
  let { productId, area } = req.query;
  let { name, address, phone, paymentMethod, saveInfo } = req.body;
  try {
    if (!productId || !name || !address || !phone) {
      return res.status(400).json({ msg: 'All fields are required ' });
    }
    let product = await productSchema.findById(productId);

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    let subTotal = Number(product.price || 0);
    let disCountPrice = Number(product.disCountPrice || 0);
    let weight = Number(product.weight || 0);
    let shippingCost = 0;

    if (weight > 0) {
      if (area === 'insideDhaka') {
        if (weight <= 1) shippingCost = 60;
        else if (weight <= 2) shippingCost = 80;
        else shippingCost = 100;
      } else if (area === 'outsideDhaka') {
        if (weight <= 1) shippingCost = 120;
        else if (weight <= 2) shippingCost = 150;
        else shippingCost = 200;
      }
    }

    let discountAmount = (subTotal * disCountPrice) / 100;
    let totalPrice = subTotal - discountAmount + shippingCost;
    let oderId = `ODR-${uuidv4().split('-')[0].toUpperCase()}`;
    if (saveInfo) {
      await Save_info.findOneAndUpdate(
        { phone: Number(phone) },
        { name, address, phone: Number(phone) },
        { upsert: true, new: true }
      );
    }

    let directCheckout = new checkoutSchema({
      uniqueOrderID: oderId,
      subTotal,
      shippingCost,
      totalPrice,
      disCountPrice: discountAmount,
      name,
      address,
      phone: Number(phone),
      paymentMethod,
      items: [
        {
          productId: productId,
          quantity: 1,
          price: product.price,
        },
      ],
    });

    await directCheckout.save();
    return res.status(200).json({
      msg: 'Checkout successful',
      data: directCheckout,
    });
  } catch (error) {
    console.log(error.message);
    console.error(error.message);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
}

async function getSavedInfo(req, res) {
  try {
    const { phone } = req.query;
    if (!phone) return res.status(400).json({ msg: 'Phone number required' });

    const info = await Save_info.findOne({ phone: Number(phone) });

    if (!info)
      return res
        .status(404)
        .json({ msg: 'No saved info found for this number' });

    return res.status(200).json({ msg: 'Saved info found', data: info });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
}

async function AdminReadCheckout(req, res) {
  try {
    let allCheckout = await checkoutSchema.find({}).populate('items.productId');
    if (!allCheckout) {
      return res.status(404).json({ msg: 'checkout not found !' });
    } else {
      return res.json({
        msg: 'all product found successfully !',
        data: allCheckout,
      });
    }
  } catch (error) {
    console.log(error.message);
    console.error(error.message);
    return res
      .status(500)
      .json({ msg: 'server error !', error: error.message });
  }
}

async function deleteCheckout(req, res) {
  let { id } = req.query;
  try {
    let checkout = await checkoutSchema.findById(id);
    if (!checkout) return res.json({ msg: ' checkout not found' });
    await checkout.deleteOne();
    return res.json({ msg: 'checkout deleted successfully' });
  } catch (error) {
    console.log(error.message);
    console.error(error.message);
    return res
      .status(500)
      .json({ msg: 'server error !', error: error.message });
  }
}

module.exports = {
  makeCheckout,
  AdminReadCheckout,
  deleteCheckout,
  getSavedInfo,
  directCheckout,
};
