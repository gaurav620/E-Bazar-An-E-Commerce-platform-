# E-Bazar 🛒

An e-commerce web application built with Node.js, Express, and MySQL.

## 📋 Project Overview

E-Bazar is a full-stack e-commerce platform that allows users to browse products, add items to cart, and place orders. The application features a clean interface built with EJS templates and Bootstrap, backed by a robust MySQL database with Sequelize ORM.

## ✨ Features

- **Product Catalog**: Browse products by category, gender, and other filters
- **User Management**: User registration and authentication
- **Shopping Cart**: Add, update, and remove items from cart
- **Order Management**: Place orders and track order status
- **Category Management**: Organize products by categories
- **Responsive Design**: Mobile-friendly interface with Bootstrap

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL with Sequelize ORM
- **Frontend**: EJS Templates, Bootstrap 5
- **Other**: Body-parser, Morgan (logging), Nodemailer, dotenv

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <your-repository-url>
   cd E-Bazar
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory (or copy from `.env.example`):

   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=ebazar_db

   # Server Configuration
   PORT=3000
   ```

4. **Create MySQL database**

   ```sql
   CREATE DATABASE ebazar_db;
   ```

5. **Start the application**

   For development (with auto-reload):

   ```bash
   npm run dev
   ```

   For production:

   ```bash
   npm start
   ```

6. **Access the application**

   Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
E-Bazar/
├── config/
│   └── database.js          # Database connection configuration
├── controller/
│   ├── Product.js           # Product controller
│   ├── user.js              # User controller
│   ├── cart.js              # Cart controller
│   └── order.js             # Order controller
├── model/
│   ├── product.js           # Product model (Sequelize)
│   ├── user.js              # User model (Sequelize)
│   ├── category.js          # Category model (Sequelize)
│   ├── cart.js              # Cart model (Sequelize)
│   └── order.js             # Order model (Sequelize)
├── routes/
│   ├── Product.js           # Product routes
│   ├── Products.js          # Products listing routes
│   ├── Users.js             # User routes
│   ├── Carts.js             # Cart routes
│   ├── Orders.js            # Order routes
│   └── Categories.js        # Category routes
├── views/                   # EJS templates
├── public/                  # Static files (CSS, JS, images)
├── index.js                 # Application entry point
├── package.json             # Dependencies and scripts
└── .env                     # Environment variables (not in git)
```

## 🎯 API Endpoints

### Products

- `GET /products` - Get all products with filters
- `GET /product/:id` - Get single product
- `POST /product` - Create new product

### Users

- `POST /users` - Register new user
- `GET /users` - Get users

### Cart

- `POST /cart/add` - Add item to cart
- `GET /cart/:userId` - Get user's cart
- `PUT /cart/update` - Update cart item quantity
- `DELETE /cart/remove` - Remove item from cart

### Orders

- `POST /buy/create` - Create new order
- `GET /buy/user/:userId` - Get user's orders
- `GET /buy/detail/:id` - Get order details
- `PUT /buy/status/:id` - Update order status

## 🗄️ Database Schema

The application uses the following main tables:

- **products** - Product information
- **users** - User accounts
- **categories** - Product categories
- **carts** - Shopping cart items
- **orders** - Order information

Tables are automatically created by Sequelize when the application starts.

## 🚀 Deployment

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

- `DB_HOST` - Database host
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `PORT` - Server port (default: 3000)

### Running in Production

```bash
NODE_ENV=production npm start
```

## 👨‍💻 Project Owner

**Original Author**: Souvik Pain  
**Repository**: E-Bazar  
**Updated By**: Saurav Kumar

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

ISC License

## 🐛 Troubleshooting

### Database Connection Issues

- Ensure MySQL is running
- Verify credentials in `.env` file
- Check if database exists

### Port Already in Use

- Change PORT in `.env` file
- Or kill the process using port 3000

### Module Not Found Errors

- Run `npm install` to install all dependencies
- Check Node.js version compatibility

## 📧 Support

For issues and questions, please create an issue in the GitHub repository.

---

Built with ❤️ using Node.js and MySQL
