const categorySchema = require('../models/categorySchema');
const productSchema = require('../models/productSchema');
let fs = require('fs');
let path = require('path');
const { getIO } = require('../socket_server');

async function createCategory(req, res) {
  let { name, description } = req.body;
  let fileName = req.files;
  let fileNames = [];
  fileName.forEach(element => {
    fileNames.push(process.env.HOST_NAME + element.filename);
  });
  try {
    let category = new categorySchema({
      name,
      description,
      image: fileNames,
    });

    await category.save();
    getIO().emit('CategoryCreated', category);
    return res
      .status(200)
      .json({ msg: 'category created successfully', data: category });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'server Error', error: error.message });
  }
}

async function readCategory(req, res) {
  let { id } = req.query;
  try {
    if (id) {
      let SingleCategory = await categorySchema.findById(id).populate({
        path: 'Product',
        select: 'name price photo stock description',
        strictPopulate: false,
      });
      let categoryOBJ = SingleCategory.toObject();
      categoryOBJ.totalproducts = SingleCategory.Product.length;
      return res.json([categoryOBJ]);
    } else {
      let categories = await categorySchema.find().populate({
        path: 'Product',
        select: 'name price photo description',
        strictPopulate: false,
      });

      let categoriesWithCount = categories.map(cat => {
        return {
          ...cat.toObject(),
          totalproducts: cat.Product.length,
        };
      });

      return res.json(categoriesWithCount);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'server Error', error: error.message });
  }
}

async function updateCategory(req, res) {
  try {
    let { id } = req.query;
    let fileName = req.files;
    let fileNames = [];
    if (Array.isArray(fileName)) {
      fileName.forEach(element => {
        fileNames.push(process.env.HOST_NAME + element.filename);
      });
    } else {
      fileNames.push(process.env.HOST_NAME + fileName.filename);
    }
    let { changeName, changeDescription } = req.body;

    let updatecategory = await categorySchema.findByIdAndUpdate(
      {
        _id: id,
      },
      { name: changeName, description: changeDescription, image: fileNames },
      { new: true }
    );

    await updatecategory.save();
    getIO().emit('categoryUpdated', updateCategory);
    return res.json({ msg: 'update successfully', data: updatecategory });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'server Error', error: error.message });
  }
}

async function deleteCategory(req, res) {
  let { id } = req.query;
  try {
    let deleteCategory = await categorySchema.findOne({ _id: id });
    if (!deleteCategory) {
      return res.json({ msg: 'category not found !' });
    }
    await deleteCategory.deleteOne();
    const deletePromises = deleteCategory.image.map(imagePath => {
      return new Promise((resolve, reject) => {
        const imagePathOnServer = path.join(
          __dirname,
          '../uploads',
          imagePath.split('/').pop()
        );

        fs.unlink(imagePathOnServer, err => {
          if (err) {
            return reject('Failed to delete image');
          } else {
            resolve();
          }
        });
      });
    });
    await Promise.all(deletePromises);
    getIO().emit('categoryDeleted', id);
    return res.json({ msg: 'Delete Successfully', data: deleteCategory });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'server Error', error: error.message });
  }
}

module.exports = {
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
};
