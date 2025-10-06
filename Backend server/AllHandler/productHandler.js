const { cloudinary } = require('../Helper/Cloudinary');
const categorySchema = require('../models/categorySchema');
const productSchema = require('../models/productSchema');
let { getIO } = require('../socket_server');

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
    getIO().emit('productCreated', product);
    return res
      .status(200)
      .send({ msg: 'product added successfully', data: product });
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(req, res) {
  let { id } = req.query;
  try {
    if (id) {
      let singleProduct = await productSchema
        .findById(id)
        .populate('category')
        .populate({
          path: 'reviews',
          populate: { path: 'user', select: 'name' },
        });

      let totalReview = singleProduct.reviews.length;
      let relatedProduct = await productSchema
        .find({
          category: { $in: singleProduct.category },
          _id: { $ne: id },
        })
        .limit(8);
      return res.json({
        product: {
          ...singleProduct.toObject(),
          Totoalreviews: totalReview,
        },
        relatedProduct,
      });
    } else {
      let product = await productSchema.find().populate('category');
      return res.json(product);
    }
  } catch (error) {
    console.log(error);
  }
}

async function topProduct(req, res) {
  try {
    let topProduct = await productSchema
      .find()
      .sort({ sold: -1 })
      .limit(8)
      .populate({ path: 'category', select: 'name description image' });

    getIO().emit('topProduct', topProduct);
    return res.json({
      success: true,
      topProduct,
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct(req, res) {
  let { id } = req.query;
  let {
    ChangeName,
    ChangeDescription,
    ChangePrice,
    ChangeCategory,
    Changestock,
  } = req.body;
  try {
    let photoURL =
      req.files && req.files.length > 0 ? req.files.map(file => file) : [];
    let updateProduct = await productSchema.findByIdAndUpdate(
      { _id: id },
      {
        name: ChangeName,
        description: ChangeDescription,
        price: ChangePrice,
        category: ChangeCategory,
        stock: Changestock,
        photo: photoURL,
      },
      { new: true }
    );
    await updateProduct.save();
    getIO().emit('productUpdated', updateProduct);
    return res.json({
      msg: 'Product update Successfully !',
      data: updateProduct,
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct(req, res) {
  let { id } = req.query;
  try {
    let deleteProduct = await productSchema.findById(id);
    if (!deleteProduct) {
      return res.json({ msg: 'product Not found !' });
    }
    await deleteProduct.deleteOne();
    let Deletepromise = deleteProduct.photo.map(async url => {
      try {
        const publicId = url.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`Taranga_Photos/${publicId}`);
      } catch (err) {
        console.error('Failed to delete image from Cloudinary:', err);
      }
    });
    await Promise.all(Deletepromise);
    getIO().emit('productDeleted', id);
    return res.json({ msg: 'Product delete successfully !', id });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createProduct,
  getProduct,
  topProduct,
  updateProduct,
  deleteProduct,
};
