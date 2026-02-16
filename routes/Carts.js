import express from 'express';
const router = express.Router();
import { addToCart, getCart, updateCartItem, removeFromCart } from '../controller/cart.js';

// API routes for cart operations
router.post('/add', addToCart);
router.get('/:userId', getCart);
router.put('/update', updateCartItem);
router.delete('/remove', removeFromCart);

// View route for cart page
router.get('/', (req, res) => {
    res.render('cart');
});

export default router;
