import Cart from '../model/cart.js';
import Product from '../model/product.js';
import User from '../model/user.js';

// Add item to cart
export async function addToCart(req, res) {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ error: 'userId and productId are required' });
    }

    // Check if item already exists in cart
    const existingCartItem = await Cart.findOne({
      where: { userId, productId }
    });

    if (existingCartItem) {
      // Update quantity if item exists
      existingCartItem.quantity += quantity || 1;
      await existingCartItem.save();

      return res.status(200).json({
        message: 'Cart updated successfully',
        cart: existingCartItem
      });
    } else {
      // Create new cart item
      const cartItem = await Cart.create({
        userId,
        productId,
        quantity: quantity || 1
      });

      res.status(201).json({
        message: 'Item added to cart successfully',
        cart: cartItem
      });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

// Get cart items for a user
export async function getCart(req, res) {
  try {
    const { userId } = req.params;

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'imageUrl', 'discountPrice']
        }
      ]
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

// Update cart item quantity
export async function updateCartItem(req, res) {
  try {
    const { userId, productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    const cartItem = await Cart.findOne({
      where: { userId, productId }
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      message: 'Cart updated successfully',
      cart: cartItem
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

// Remove item from cart
export async function removeFromCart(req, res) {
  try {
    const { userId, productId } = req.body;

    const deleted = await Cart.destroy({
      where: { userId, productId }
    });

    if (deleted === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
