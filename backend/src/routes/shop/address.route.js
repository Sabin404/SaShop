const router = require('express').Router()

const {
  addAddress,
  deleteAddress,
  fetchAllAddress,
  editAddress
}=require('../../controllers/shop/address.controllers')


router.post('/add',addAddress);
router.get('/get/:userId',fetchAllAddress)
router.delete('/delete/:userId/:addressId',deleteAddress)
router.put('/update/:userId/:addressId',editAddress)

module.exports=router