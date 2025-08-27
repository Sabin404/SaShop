const router = require('express').Router()

const {
  searchProducts
}=require('../../controllers/shop/search.controllers')

router.get('/:keyword',searchProducts)

module.exports=router