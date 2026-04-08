import express from 'express';
import Category from '../model/category.js'; // Sequelize Category model

const router = express.Router();

// Fetch all categories
router.get('/', async (req, res) => {
    try {
        // console.log("heoo.......")
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
