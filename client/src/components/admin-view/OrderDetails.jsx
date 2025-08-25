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
    e.preventDefault()
    
    // console.log("Updated Status:", formData.status)
    const {status}=formData;
    dispatch(updateOrderStatus({id:order?._id,orderStatus:status})).then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        dispatch(getOrderDetailsForAdmin(order?._id))
        dispatch(getAllOrdersForAdmin())
      }
    })
  }

  // console.log(order?._id);
  

  return (
    <DialogContent className="sm:max-w-[600px] bg-white p-6 rounded-md shadow-md">
      <div className="grid gap-6">
        {/* Order Info */}
        <div className="grid gap-3 border-b border-gray-200 pb-4">
          <h2 className="text-lg font-semibold text-gray-800">Order Information</h2>
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-700">Order ID</p>
            <Label className="bg-gray-100 text-gray-800">{order._id}</Label>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-700">Order Date</p>
            <Label className="bg-gray-100 text-gray-800">{order?.orderDate?.split('T')[0]}</Label>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-700">Price</p>
            <Label className="bg-gray-100 text-gray-800">${order?.totalAmount}</Label>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-700">Order Status</p>
            <Label className={`py-1 px-3 rounded-full text-white ${order?.orderStatus === "confirmed"
                ? "bg-green-500"
                : order?.orderStatus === "rejected"
                  ? "bg-red-600"
                  : "bg-gray-500"
              }`}>
              {order?.orderStatus}
            </Label>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-700">Payment Method</p>
            <Label className="bg-gray-100 text-gray-800">{order?.paymentMethod || "N/A"}</Label>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-700">Payment Status</p>
            <Label className={`py-1 px-3 rounded-full text-white ${order?.paymentStatus === "paid"
                ? "bg-green-500"
                : order?.paymentStatus === "pending"
                  ? "bg-yellow-500"
                  : "bg-red-600"
              }`}>
              {order?.paymentStatus || "pending"}
            </Label>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid gap-3 border-b border-gray-200 pb-4">
          <h2 className="text-lg font-semibold text-gray-800">Products</h2>
          <ul className="divide-y divide-gray-200">
            {order?.cartItems?.map((item, idx) => (
              <li key={idx} className="flex justify-between py-2">
                <span className="text-gray-700">{item.title}</span>
                <span className="font-medium text-gray-900">${item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Shipping Info */}
        <div className="grid gap-3">
          <h2 className="text-lg font-semibold text-gray-800">Shipping Information</h2>
          <div className="grid gap-1 text-gray-700">
            <span><strong>Name:</strong> {order?.addressInfo?.name}</span>
            <span><strong>Address:</strong> {order?.addressInfo?.address}</span>
            <span><strong>City:</strong> {order?.addressInfo?.city}</span>
            <span><strong>Pincode:</strong> {order?.addressInfo?.pincode}</span>
            <span><strong>Phone:</strong> {order?.addressInfo?.phone}</span>
            <span><strong>Notes:</strong> {order?.addressInfo?.notes}</span>
          </div>
        </div>

        {/* Status Update Form */}
        <section>
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
        </section>
      </div>
    </DialogContent>
  )
}

export default OrderDetails
