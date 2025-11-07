import React, { useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import Form from '../common/Form'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from '@/store/admin/order-slice'

const initialFormData = {
  status: ''
}

const OrderDetails = ({ order }) => {
  const [formData, setFormData] = useState(initialFormData)
  // const { user } = useSelector(state => state.auth)
  const dispatch=useDispatch()


 const handleUpdateStatus = (e) => {
  e.preventDefault();

  const { status } = formData;

  dispatch(updateOrderStatus({ id: order?._id, orderStatus: status }))
    .then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(order?._id));
        dispatch(getAllOrdersForAdmin());

        // Close the dialog
        setOpenDetailDialog(false);

        toast.success("Order status updated successfully!");
      } else {
        toast.error("Failed to update order status");
      }
    });
};


  // console.log(order?._id);
  

  return (
    <DialogContent className="sm:max-w-[900px] w-full bg-white p-6 rounded-xl shadow-xl">
  <div className="grid gap-6 sm:grid-cols-3">

    {/* Order Information */}
    <div className="grid gap-2 border-b sm:border-b-0 sm:border-r border-gray-200 pb-4 sm:pb-0 sm:pr-4">
      <h2 className="text-lg font-semibold text-gray-800">Order Information</h2>
      <div className="grid grid-cols-2 gap-2 text-gray-700">
        <p className="font-medium">Order ID:</p>
        <Label className="bg-gray-100 text-gray-800 truncate">{order._id}</Label>

        <p className="font-medium">Order Date:</p>
        <Label className="bg-gray-100 text-gray-800">{order?.orderDate?.split('T')[0]}</Label>

        <p className="font-medium">Price:</p>
        <Label className="bg-gray-100 text-gray-800">${order?.totalAmount}</Label>

        <p className="font-medium">Order Status:</p>
        <Label className={`py-1 px-3 rounded-full text-white text-center ${
          order?.orderStatus === "confirmed" ? "bg-green-500" :
          order?.orderStatus === "rejected" ? "bg-red-600" :
          "bg-gray-500"
        }`}>{order?.orderStatus}</Label>

        <p className="font-medium">Payment Method:</p>
        <Label className="bg-gray-100 text-gray-800">{order?.paymentMethod || "N/A"}</Label>

        <p className="font-medium">Payment Status:</p>
        <Label className={`py-1 px-3 rounded-full text-white text-center ${
          order?.paymentStatus === "paid" ? "bg-green-500" :
          order?.paymentStatus === "pending" ? "bg-yellow-500" :
          "bg-red-600"
        }`}>{order?.paymentStatus || "pending"}</Label>
      </div>
    </div>

    {/* Products */}
    <div className="grid gap-2 border-b sm:border-b-0 sm:border-r border-gray-200 pb-4 sm:pb-0 sm:pr-4">
      <h2 className="text-lg font-semibold text-gray-800">Products</h2>
      <ul className="grid gap-1">
        {order?.cartItems?.map((item, idx) => (
          <li key={idx} className="grid grid-cols-2 bg-gray-50 p-2 rounded-md">
            <span className="text-gray-700">{item.title}</span>
            <span className="font-medium text-gray-900 text-right">${item.price}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Shipping Info */}
    <div className="grid gap-2">
      <h2 className="text-lg font-semibold text-gray-800">Shipping Info</h2>
      <div className="grid grid-cols-2 gap-2 text-gray-700">
        <span><strong>Name:</strong> {order?.addressInfo?.name}</span>
        <span><strong>Phone:</strong> {order?.addressInfo?.phone}</span>
        <span><strong>Address:</strong> {order?.addressInfo?.address}</span>
        <span><strong>City:</strong> {order?.addressInfo?.city}</span>
        <span><strong>Pincode:</strong> {order?.addressInfo?.pincode}</span>
        <span><strong>Notes:</strong> {order?.addressInfo?.notes}</span>
      </div>
    </div>
  </div>

  {/* Status Update Form */}
  <div className="mt-6">
    <Form
      formControls={[
        {
          label: "Order Status",
          name: "status",
          componentType: "select",
          options: [
            { id: "inProcess", label: "In Process" },
            { id: "inShipping", label: "In Shipping" },
            { id: "pending", label: "Pending" },
            { id: "delivered", label: "Delivered" },
            { id: "rejected", label: "Rejected" },
          ],
        },
      ]}
      formData={formData}
      setFormData={setFormData}
      buttonText="Update Status"
      onSubmit={handleUpdateStatus}

    />
  </div>
</DialogContent>

  )
}

export default OrderDetails
