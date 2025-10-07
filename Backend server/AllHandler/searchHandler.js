const productSchema = require('../models/productSchema');

async function searchProduct(req, res) {
  let { query, minPrice, maxPrice, sort, page = 1, limit = 20 } = req.query;
  try {
    query = query?.trim();
    page = Number(page);
    limit = Number(limit);

    let filter = {};

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { discription: { $regex: query, $options: 'i' } },
      ];
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sort === 'lowToHigh') sortOption.price = 1;
    if (sort === 'highToLow') sortOption.price = -1;

    const totalProducts = await productSchema.countDocuments(filter);

    let products = await productSchema
      .find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({ path: 'category', select: 'name discription image' });

    let related = [];
    if (products.length > 0) {
      let categoryIds = products
        .map(p =>
          Array.isArray(p.category)
            ? p.category.map(c => c._id)
            : p.category?._id || p.category
        )
        .flat();

      let relatedFilter = {
        category: { $in: categoryIds },
        _id: { $nin: products.map(p => p._id) },
      };

      if (minPrice || maxPrice) {
        relatedFilter.price = {};
        if (minPrice) relatedFilter.price.$gte = Number(minPrice);
        if (maxPrice) relatedFilter.price.$lte = Number(maxPrice);
      }

      related = await productSchema
        .find(relatedFilter)
        .sort(sortOption)
        .limit(10)
        .populate({ path: 'category', select: 'name discription image' });
    }

    getIO().emit('searchSuggestion', {
      query,
      suggestions: products.map(p => p.name).slice(0, 5),
    });

    return res.status(200).json({
      msg: 'Search results',
      count: products.length,
      products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      related,
    });
  } catch (error) {
    console.log(error.message);
    console.error(error.message);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
}

module.exports = { searchProduct };
