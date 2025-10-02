const { cloudinary } = require('../Helper/Cloudinary');
const categorySchema = require('../models/categorySchema');
const productSchema = require('../models/productSchema');

async function createCategory(req, res) {
  let { name, description } = req.body;
  let imageURL =
    req.files && req.files.length > 0 ? req.files.map(file => file.path) : [];
  try {
    let category = new categorySchema({
      name,
      description,
      image: imageURL,
    });

    await category.save();
    return res
      .status(200)
      .json({ msg: 'category created successfully', data: category });
  } catch (error) {
    console.log(error);
  }
}

async function readCategory(req, res) {
  let { id } = req.query;
  try {
    if (id) {
      let SingleCategory = await categorySchema.findById(id);
      let singleProduct = await productSchema.countDocuments({
        SingleCategory: id,
      });
      let categoryOBJ = SingleCategory.toObject();
      categoryOBJ.totalproducts = singleProduct;
      return res.json([categoryOBJ]);
    } else {
      let category = await categorySchema.find();
      let categoriesWithCount = await Promise.all(
        category.map(async category => {
          let totalProducts = await productSchema.countDocuments({
            category: category._id,
          });
          return {
            _id: category._id,
            name: category.name,
            discription: category.discription,
            image: category.image,
            totalProducts,
          };
        })
      );

      return res.json(categoriesWithCount);
    }
  } catch (error) {}
}

async function updateCategory(req, res) {
  try {
    let { id } = req.query;
    let imageURL =
      req.files && req.files.length > 0 ? req.files.map(file => file.path) : [];
    let { changeName, changeDescription } = req.body;

    let updatecategory = await categorySchema.findByIdAndUpdate(
      {
        _id: id,
      },
      { name: changeName, description: changeDescription, image: imageURL },
      { new: true }
    );

    await updatecategory.save();
    return res.json({ msg: 'update successfully', data: updatecategory });
  } catch (error) {
    console.log(error);
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
    let deletePromise = deleteCategory.image.map(async url => {
      try {
        const publicId = url.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`Taranga_Category/${publicId}`);
      } catch (err) {
        console.error('Failed to delete image from Cloudinary:', err);
      }
    });
    await Promise.all(deletePromise);
    return res.json({ msg: 'Delete Successfully', data: deleteCategory });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
};
