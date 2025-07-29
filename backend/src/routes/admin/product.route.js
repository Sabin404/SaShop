const express = require('express');
const { handleImageUpload, addProduct, editProduct, deleteProduct, fetchAllProducts } = require('../../controllers/admin/product.controllers');
const router = express.Router();
const { upload } = require('../../helpers/cloudinary');

router.post('/upload-image', upload.single('image'), handleImageUpload);
router.post('/add',addProduct)
router.put('/edit/:id',editProduct)
router.delete('/delete/:id',deleteProduct)
router.get('/get',fetchAllProducts)
module.exports = router;