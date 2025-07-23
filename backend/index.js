const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db.config');
const cookieparser = require('cookie-parser');
const authRoutes = require('./src/routes/auth/auth.route');

//middlewares
dotenv.config();
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


//listening to the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});