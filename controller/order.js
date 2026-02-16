import Order from '../model/order.js';
import Product from '../model/product.js';
import User from '../model/user.js';

// Create a new order
export async function createOrder(req, res) {
  try {
    const { userId, productId, quantity, shippingAddress, customerName, customerEmail, customerPhone } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ error: 'userId, productId, and quantity are required' });
    }

    // Fetch product to calculate total price
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Calculate total price (use discountPrice if available, otherwise use regular price)
    const unitPrice = product.discountPrice || product.price;
    const totalPrice = unitPrice * quantity;

    // Create order
    const order = await Order.create({
      userId,
      productId,
      quantity,
      totalPrice,
      status: 'pending',
      shippingAddress,
      customerName,
      customerEmail,
      customerPhone
    });

    res.status(201).json({
      message: 'Order created successfully',
      order: order
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

// Get all orders for a user
export async function getUserOrders(req, res) {
  try {
    const { userId } = req.params;

    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'imageUrl', 'discountPrice']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

// Get order by ID
export async function getOrderById(req, res) {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'imageUrl', 'discountPrice']
        },
        {
          model: User,
          attributes: ['id', 'email']
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

// Update order status
export async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Invalid status',
        validStatuses: validStatuses
      });
    }

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: 'Order status updated successfully',
      order: order
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}