const Cart = require('../../models/Cart')
const Product = require('../../models/Product')

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided"
      })
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] })
    }
    const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)
    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity })
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity
    }

    await cart.save();
    res.status(200).json({
      success: true,
      data: cart
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured"
    })
  }
}

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({
        success: false,
        message: "User Id is requiired"
      })
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: 'item.productId',
      select: 'image title price salePrice'
    })

    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart Not found"
      })
    }

    const validItems = cart.items.filter(productItem => productItem.productId)
    if (validItems.length < cart.items.length) {
      cart.items = validItems
      await cart.save();
    }

    const populateCartItems = validItems.map(item => ({
      productId: item.productId._id,
      image: item.productId.image,
      price: item.productId.price,
      title: item.productId.title,
      salePrice: item.productId.salePrice,
      quamtity: item.productId.quantity,
    }))

    return res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        item: populateCartItems
      }
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured"
    })
  }
}

const updateCartQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided"
      })
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart Not found"
      })
    }

    const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item no present"
      })
    }

    cart.items[findCurrentProductIndex].quantity += quantity
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured"
    })
  }
}

const deleteCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured"
    })
  }
}

module.exports = {
  addToCart,
  fetchCartItems,
  deleteCartItems,
  updateCartQuantity
}