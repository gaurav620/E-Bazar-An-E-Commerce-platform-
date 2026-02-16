import express from 'express';
const router = express.Router();
import { createOrder, getUserOrders, getOrderById, updateOrderStatus } from '../controller/order.js';

// API routes for order operations
router.post('/create', createOrder);
router.get('/user/:userId', getUserOrders);
router.get('/detail/:id', getOrderById);
router.put('/status/:id', updateOrderStatus);

// View routes for order/buy pages
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        res.render('buy', { productId });
    } catch (err) {
        res.status(500).json({ error: "Failed to render the page" });
    }
});

router.post('/:id', async (req, res) => {
    try {
        res.render('upbuy');
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
