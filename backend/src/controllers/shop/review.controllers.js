const Order = require('../../models/Order')
const Product = require('../../models/Product')
const Review = require('../../models/Review')

const addProductReview = async (req, res) => {
  try {
    const {
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue
    } = req.body;

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: 'confirmed'
    })

    if (!order) {
      return res.status(403).json({
        success: false,
        message: 'You need to buy product to review it'
      })
    }

    const checkExistingReview = await Review.findOne({
      productId, userId
    })

    if (checkExistingReview) {
      res.status(400).json({
        success: false,
        message: 'You already reivewed'
      })
    }

    const newReview = await Review({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue
    })

    await newReview.save()
    const reviews = await Review.find({ productId });
    const totalReviewsLength = reviews.length;
    const avgReview = reviews.reduce((sum, item) => sum + item.reviewValue, 0) / totalReviewsLength;
    await Product.findByIdAndUpdate(productId, { avgReview });

    res.status(201).json({
      success: true,
      data: newReview
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while adding the review.'
    })

  }
}

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required.'
      });
    }

    // Fetch reviews for the product
    const reviews = await Review.find({ productId })
      .sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      total: reviews.length,
      data: reviews
    });

  } catch (error) {
    console.error('Error fetching product reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching the reviews.'
    });
  }
}

module.exports = {
  addProductReview,
  getProductReviews
}