const { uploadImage } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await uploadImage(url);
    res.json({
      success: true,
      message: "Image uploaded successfully",
      url: result
    });
  } catch (error) {
    console.error("Error in handleImageUpload:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
};
//add a products

const addProduct = async (req, res) => {
  try {
    const { image, title, description, category, price, brand, salePrice, totalStock } = req.body;
    if (!title || !description || !category || !brand) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      salePrice,
      totalStock,
      price
    })

    await newProduct.save()
    res.status(201).json({
      success: true,
      data: newProduct
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
}
//fetch all products

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Failed to fetch all product" });
  }
}
//edit a products

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
   
    const findProduct = await Product.findById(id)
    if (!findProduct) return res.status(404).json({
      message: "Product not found"
    })

    findProduct.title = title || findProduct.title
    findProduct.description = description || findProduct.description
    findProduct.category = category || findProduct.category
    findProduct.brand = brand || findProduct.brand
    findProduct.price = price===''?0:price || findProduct.price
    findProduct.salePrice = salePrice===''?$0:salePrice || findProduct.salePrice
    findProduct.totalStock = totalStock || findProduct.totalStock
    findProduct.image = image || findProduct.image

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Failed to edit a product" });
  }
}

//delete a products

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({
      message: "Product not found"
    })

    res.status(200).json({
      success: true,
      message: "Product deleted Successfully"
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Failed to delete a product" });
  }
}
module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct
};
