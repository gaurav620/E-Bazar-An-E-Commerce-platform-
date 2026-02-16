import Product from '../model/product.js';

export async function createProduct(req, res) {
  try {
    // Create a new product using Sequelize
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product created successfully",
      product: product
    });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}

export async function fetchAllProduct(req, res) {
  try {
    let where = {};

    // Build query conditions based on query parameters
    if (req.query.gender) {
      where.gender = req.query.gender;
    } else if (req.query.id) {
      where.id = req.query.id;
    } else if (req.query.name) {
      where.name = req.query.name;
    } else if (req.query.category) {
      where.category = req.query.category;
    } else if (req.query.productdetails) {
      where.productdetails = req.query.productdetails;
    }

    // Fetch products using Sequelize findAll
    const products = await Product.findAll({
      where: where,
      raw: true // Similar to MongoDB's .lean()
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

export async function fetchProductById(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
