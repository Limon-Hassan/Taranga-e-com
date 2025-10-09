const productSchema = require('../models/productSchema');
const reviewSchema = require('../models/reviewSchema');
const { getIO } = require('../socket_server');

async function makeReviews(req, res) {
  let { name, productId, rating, comment } = req.body;
  try {
    let reviews = await reviewSchema.create({
      name,
      product: productId,
      comment,
      rating,
    });
    await productSchema.findByIdAndUpdate(
      productId,
      {
        $push: { reviews: reviews._id },
        $inc: { Totalreviews: 1 },
      },
      { new: true }
    );
    getIO().to(productId).emit('reviewAdded', {
      productId,
      review: reviews,
      Totalreviews: updatedProduct.Totalreviews,
    });
    res.status(200).json({
      msg: 'review added successfully',
      data: reviews,
    });
  } catch (error) {
    console.log(error.message);
    console.error(error.message);
  }
}

async function getReviews(req, res) {
  let productId = req.query.productId;
  try {
    let GetReviews = await reviewSchema
      .find({ product: productId })
      .populate('name');

    res.json({ msg: 'reviews found', data: GetReviews });
  } catch (error) {
    console.log(error.message);
    console.error(error.message);
  }
}

module.exports = { makeReviews, getReviews };
