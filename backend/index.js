const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./src/config/db.config');
const cookieparser = require('cookie-parser');
const authRoutes = require('./src/routes/auth/auth.route');
const productsRoutes = require('./src/routes/admin/product.route');
const adminOrderRoutes = require('./src/routes/admin/order.routes');
const shopProductRoute = require('./src/routes/shop/product.route');
const shopCartRoute=require('./src/routes/shop/cart.route')
const shopAddressRoute=require('./src/routes/shop/address.route')
const shopOrderRouter=require('./src/routes/shop/order.route')
//middlewares

// console.log("Inside index.js, Cloudinary keys:", {
//   key: process.env.CLOUDINARY_API_KEY,
//   name: process.env.CLOUDINARY_CLOUD_NAME,
//   secret: process.env.CLOUDINARY_API_SECRET
// });
app.use(cors({
  origin:'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','Cache-Control', 'Expires','Pragma']
}));
app.use(express.json());
app.use(cookieparser());

const PORT= process.env.PORT || 3000;
//connecting to the database
connectDB();

//routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/products', productsRoutes);
app.use('/api/admin/orders', adminOrderRoutes);


//shop

app.use('/api/shop/products',shopProductRoute)
app.use('/api/shop/cart',shopCartRoute)
app.use('/api/shop/address',shopAddressRoute)
app.use('/api/shop/order',shopOrderRouter)

//listening to the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});