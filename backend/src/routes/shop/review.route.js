const { addProductReview, getProductReviews } = require('../../controllers/shop/review.controllers')

const router = require('express').Router()

router.post('/add',addProductReview)
router.get('/:productId',getProductReviews)

module.exports=router