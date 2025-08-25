// controllers/orderController.js
const Order = require("../../models/Order");
const stripe = require("../../helpers/stripe");
const Cart = require('../../models/Cart')
const Product = require('../../models/Product')

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      totalAmount,
      orderDate,
      orderUpdateDate,
    } = req.body;

    // Create Stripe Checkout Session
    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
        },
        unit_amount: Math.round(item.price * 100), // cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:5173/shop/stripe-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/shop/stripe-cancel`,
    });

    // Save order in DB
    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus: "pending",
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId: session.id,
      payerId: "",
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      checkoutURL: session.url,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error Occurred",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;
    let order = await Order.findById(orderId);
    console.log(order);


    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.paymentStatus = 'paid';
    order.orderStatus = 'confirmed';
    order.paymentId = paymentId;
    order.payerId = payerId;

    for(let item of order.cartItems){
      let product = await Product.findById(item.productId)
      if(!product){
        return res.status(404).json({
          success:false,
          message:`Not enough for this stock ${product.title}`
        })
      }

      product.totalStock -= item.quantity

      await product.save()

    }

    const getCartId = order.cartId;
    if (getCartId) {
      await Cart.findByIdAndDelete(getCartId);
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order confirmed',
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ orderDate: -1 });
    // Return empty array if no orders
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

const getOrdersDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};



module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrdersDetails
};
