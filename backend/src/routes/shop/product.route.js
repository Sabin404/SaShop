const express = require('express');
const router = express.Router();
const {getFilterProducts}=require('../../controllers/shop/product.controllers')

router.get('/get',getFilterProducts)
module.exports = router;