const productSchema = require('../models/productSchema');
const { getIO } = require('../socket_server');

async function searchProduct(req, res) {
  try {
    let { query, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;

    query = query?.trim();
    page = Number(page);
    limit = Number(limit);

    let filter = {};

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
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
      .populate({ path: 'category', select: 'name description image' });

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
        .populate({ path: 'category', select: 'name description image' });
    }

    const allProducts = [...products, ...related];

    const totalPages = Math.ceil(totalProducts / limit);

    getIO().emit('searchSuggestion', {
      query,
      suggestions: products.map(p => p.name).slice(0, 5),
    });

    return res.status(200).json({
      msg: 'Search results',
      count: allProducts.length,
      products: allProducts,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Search Error:', error.message);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
}

module.exports = { searchProduct };
