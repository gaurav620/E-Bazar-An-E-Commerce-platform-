import express from 'express';
import Product from '../model/product.js';  // Import the Product model
const router = express.Router();

// Fetch products by category (gender)
router.get('/', async (req, res) => {
    const gender = req.query.gender;

    try {
        let whereClause = {};

        // If gender is provided, filter by it; otherwise, return all products
        if (gender) {
            whereClause = { gender };
        }

        // Use Sequelize's findAll method to fetch products
        const product = await Product.findAll({
            where: whereClause,
            raw: true
        });

        // Return the products as JSON (even if empty array)
        res.status(200).json(product);
    } catch (err) {
        console.error('Error fetching products by category:', err);
        res.status(500).json({ error: 'Error fetching products', details: err.message });
    }
});

export default router;

