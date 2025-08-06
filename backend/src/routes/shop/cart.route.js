const router = require('express').Router();
const {
  addToCart,
  fetchCartItems,
  deleteCartItems,
  updateCartQuantity
} = require('../../controllers/shop/cart.controllers')

router.post('/add',addToCart)
router.get('/get/:userId',fetchCartItems)
router.put('/update-cart',updateCartQuantity)
router.delete('/:userId/:productId',deleteCartItems)
module.exports = router