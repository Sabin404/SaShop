const Order = require("../../models/Order");

const getAllOrdersOfAllUser = async (req, res) => {
  try {
    const orders = await Order.find({})
    // Return empty array if no orders
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

const getOrdersDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

const updateOrderStatus= async(req,res)=>{
  try {
    const {id}=req.params;
    const{orderStatus}=req.body;
    const order= await Order.findById(id)
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    await Order.findByIdAndUpdate(id,{orderStatus})
    res.status(200).json({
      success: true,
        message: 'Order status updated successfully',
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
}

module.exports={
  getAllOrdersOfAllUser,
  getOrdersDetailsForAdmin,
  updateOrderStatus
}