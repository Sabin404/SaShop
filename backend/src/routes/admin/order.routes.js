const router= require('express').Router()
const {getAllOrdersOfAllUser, getOrdersDetailsForAdmin, updateOrderStatus}=require('../../controllers/admin/order.controllers')
// const { create } = require('../../models/Order')


router.get('/get',getAllOrdersOfAllUser)
router.get('/details/:id',getOrdersDetailsForAdmin)
router.put('/update/:id',updateOrderStatus)


module.exports=router
