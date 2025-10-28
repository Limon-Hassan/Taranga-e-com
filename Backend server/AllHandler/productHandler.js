const categorySchema = require('../models/categorySchema');
const productSchema = require('../models/productSchema');
let { getIO } = require('../socket_server');
let path = require('path');
let fs = require('fs');

async function createProduct(req, res) {
  let {
    name,
    description,
    price,
    category,
    stock,
    brand,
    weight,
    oldPrice,
    disCountPrice,
  } = req.body;
  if (!name || !description || !price) {
    return res.status(400).send({ msg: 'please fill all the fields' });
  }
  try {
    const fileName = req.files;

    const fileNames = fileName.map(
      element => `${process.env.HOST_NAME}${element.filename}`
    );

    let product = new productSchema({
      name,
      description,
      price,
      photo: fileNames,
      category,
      stock,
      brand,
      weight,
      oldPrice,
      disCountPrice,
    });

    await product.save();

    if (category && category.length > 0) {
      await categorySchema.updateMany(
        { _id: { $in: category } },
        {
          $push: { Product: product._id },
        }
      );
    }
    getIO().emit('productCreated', product);
    return res
      .status(200)
      .send({ msg: 'product added successfully', data: product });
  } catch (error) {
    console.log(error.message);
    console.error(error.message);
  }
}

async function getProduct(req, res) {
  let { id } = req.query;
  try {
    if (id) {
      let singleProduct = await productSchema
        .findById(id)
        .populate('category')
        .populate('reviews', 'name comment rating');

      let totalReview = singleProduct.reviews.length;
      const relatedProduct = await productSchema
        .find({
          category: singleProduct.category._id || singleProduct.category,
          _id: { $ne: id },
        })
        .limit(8)
        .populate({
          path: 'category',
          select: 'name description image',
        });
      return res.json({
        product: {
          ...singleProduct.toObject(),
          Totalreviews: totalReview,
        },
        relatedProduct,
      });
    } else {
      let product = await productSchema.find().populate('category');
      return res.json(product);
    }
  } catch (error) {
    console.log(error.message);
    console.error(error.message);
    return res.status(500).json({ msg: 'error', error: error.message });
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
    console.log(error.message);
    console.error(error.message);
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
    ChangeBrand,
    ChangeWeight,
    ChangeOldPrice,
    ChangeDisCountPrice,
  } = req.body;
  try {
    let fileName = req.files;
    let fileNames = [];
    if (Array.isArray(fileName)) {
      fileName.forEach(element => {
        fileNames.push(process.env.HOST_NAME + element.filename);
      });
    } else {
      fileNames.push(process.env.HOST_NAME + fileName.filename);
    }
    let updateProduct = await productSchema.findByIdAndUpdate(
      { _id: id },
      {
        name: ChangeName,
        description: ChangeDescription,
        price: ChangePrice,
        category: ChangeCategory,
        stock: Changestock,
        brand: ChangeBrand,
        weight: ChangeWeight,
        oldPrice: ChangeOldPrice,
        disCountPrice:ChangeDisCountPrice,
        photo: fileNames,
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
    console.log(error.message);
    console.error(error.message);
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
    const deletePromises = deleteProduct.photo.map(imagePath => {
      return new Promise((resolve, reject) => {
        const PhotoPathOnServer = path.join(
          __dirname,
          '../productImage',
          imagePath.split('/').pop()
        );

        fs.unlink(PhotoPathOnServer, err => {
          if (err) {
            return reject('Failed to delete image');
          }
          resolve();
        });
      });
    });

    await Promise.all(deletePromises);
    getIO().emit('productDeleted', id);
    return res.json({ msg: 'Product delete successfully !', id });
  } catch (error) {
    console.log(error.message);
    console.error(error.message);
  }
}

module.exports = {
  createProduct,
  getProduct,
  topProduct,
  updateProduct,
  deleteProduct,
};
