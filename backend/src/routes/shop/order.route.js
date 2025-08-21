const router= require('express').Router()
const {createOrder,capturePayment,getAllOrdersByUser,getOrdersDetails}=require('../../controllers/shop/order.controllers')
// const { create } = require('../../models/Order')

router.post('/create',createOrder)
router.post('/capture',capturePayment)
router.get('/list/:userId',getAllOrdersByUser)
router.get('/details/:id',getOrdersDetails)

module.exports=router
