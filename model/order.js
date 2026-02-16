import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';
import Product from './product.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'processing', 'shipped', 'delivered', 'cancelled']]
    }
  },
  shippingAddress: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  customerPhone: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'orders'
});

// Define associations
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

export default Order;