const express = require('express');
const { handleImageUpload } = require('../../controllers/admin/product.controllers');
const router = express.Router();
const { upload } = require('../../helpers/cloudinary');

router.post('/upload-image', upload.single('image'), handleImageUpload);
module.exports = router;