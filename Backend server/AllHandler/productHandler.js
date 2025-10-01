const categorySchema = require('../models/categorySchema');
const productSchema = require('../models/productSchema');

async function createProduct(req, res) {
  let { name, description, price, category, stock, brand, weight } = req.body;
  if (!name || !description || !price) {
    return res.status(400).send({ msg: 'please fill all the fields' });
  }
  try {
    let photo =
      req.files && req.files.length > 0 ? req.files.map(file => file.path) : [];

    let product = new productSchema({
      name,
      description,
      price,
      photo,
      category,
      stock,
      brand,
      weight,
    });

    await product.save();

    if (category && category.length > 0) {
      await categorySchema.updateMany(
        { _id: { $in: category } },
        {
          $push: { product: product._id },
        }
      );
    }

    return res
      .status(200)
      .send({ msg: 'product added successfully', data: product });
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(req, res) {
  res.send('wdnadiandwad');
}

module.exports = { createProduct, getProduct };
