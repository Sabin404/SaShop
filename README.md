# 🛍️ SaShop

A modern full-stack **MERN e-commerce platform** that allows users to browse, shop, and pay securely — all in one place.  
Built with **MongoDB, Express, React, and Node.js**, SaShop also includes a powerful **admin dashboard** for managing products, orders, and users.

---

## 🚀 Features

✅ **User Authentication** — Secure login & signup using JWT  
✅ **Product Management (CRUD)** — Create, edit, update, and delete products easily  
✅ **Shopping Cart** — Add to cart, update quantity, and manage selected items  
✅ **Order System** — Place and track orders in real time  
✅ **Payment Integration** — PayPal and Stripe payment gateways  
✅ **Admin Dashboard** — Manage users, products, and orders with ease  
✅ **Responsive UI** — Fully optimized for all screen sizes using Tailwind CSS  

---

## 🧠 Tech Stack

### 🖥️ Frontend
- React (Vite)
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Lucide React Icons
- Radix UI Components
- Stripe Integration

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary (for image uploads)
- Multer
- PayPal & Stripe SDKs

---

## ⚡ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Sabin404/SaShop.git
```

### 2️⃣ Install Dependencies

#### Backend:

``` bash
cd backend
npm i
```


#### Frontend:
```
cd client
npm i
```

### 3️⃣ Environment Variables

Create a `.env` file inside the **backend** directory with your configuration:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

```
### 4️⃣ Run the App

#### Start the Backend:
```
npm start

```
#### Run the Frontend (Vite):

```
npm run dev
```

---

## 🧩 Folder Structure
```
E-Com/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── index.js
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── context/
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md
```

---

## 💳 Payment Integration

* 💰 **Stripe** for secure card payments

---

## 📸 Admin Dashboard

Manage all products, orders, and customers easily from a clean, responsive admin panel — edit, delete, or update order statuses with a single click.

---

## 👨‍💻 Author

**Sabin Paudel**
📧 [[your-email@example.com](mailto:paudelsabin0@gmail.com)]
🌐 [GitHub Profile](https://github.com/sabin4404)

---

## ⭐ Acknowledgements

* [React](https://react.dev)
* [Express.js](https://expressjs.com)
* [MongoDB](https://www.mongodb.com)
* [Stripe](https://stripe.com)
* [Tailwind CSS](https://tailwindcss.com)

---

### 🌟 If you like this project, don’t forget to **star ⭐ the repository** and share your feedback!

