import React from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'

const ShopOrderDetails = ({ order }) => {
  console.log(order);

  return (
    <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-auto bg-white rounded-2xl shadow-xl p-9">
  <div className="grid gap-6 sm:grid-cols-2">

    {/* Order Info */}
    <div className="p-4 rounded-xl bg-gray-50 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Order Information</h2>

      <div className="flex justify-between items-center mt-2">
        <p className="font-medium text-gray-700">Order ID</p>
        <Label className="bg-gray-200 text-gray-900 px-3 py-1 rounded-lg truncate">{order._id}</Label>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="font-medium text-gray-700">Order Date</p>
        <Label className="bg-gray-200 text-gray-900 px-3 py-1 rounded-lg">{order?.orderDate?.split('T')[0]}</Label>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="font-medium text-gray-700">Price</p>
        <Label className="bg-gray-200 text-gray-900 px-3 py-1 rounded-lg">${order?.totalAmount}</Label>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="font-medium text-gray-700">Order Status</p>
        <Label className={`py-1 px-3 rounded-full text-white font-semibold ${
          order?.orderStatus === "confirmed"
            ? "bg-green-500"
            : order?.orderStatus === "rejected"
            ? "bg-red-600"
            : "bg-gray-500"
        }`}>
          {order?.orderStatus}
        </Label>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="font-medium text-gray-700">Payment Method</p>
        <Label className="bg-gray-200 text-gray-900 px-3 py-1 rounded-lg">{order?.paymentMethod || "N/A"}</Label>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="font-medium text-gray-700">Payment Status</p>
        <Label className={`py-1 px-3 rounded-full text-white font-semibold ${
          order?.paymentStatus === "paid"
            ? "bg-green-500"
            : order?.paymentStatus === "pending"
            ? "bg-yellow-500"
            : "bg-red-600"
        }`}>
          {order?.paymentStatus || "pending"}
        </Label>
      </div>
    </div>

    {/* Products */}
    <div className="p-4 rounded-xl bg-gray-50 shadow-sm border border-gray-100 overflow-y-auto max-h-[40vh]">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-2">Products</h2>
      <ul className="divide-y divide-gray-200">
        {order?.cartItems?.map((item, idx) => (
          <li key={idx} className="flex justify-between py-2">
            <span className="text-gray-700 font-medium">{item.title}</span>
            <span className="font-semibold text-gray-900">${item.price}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Shipping Info */}
    <div className="p-4 rounded-xl bg-gray-50 shadow-sm border border-gray-100 col-span-2">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-2">Shipping Information</h2>
      <div className="grid sm:grid-cols-2 gap-2 text-gray-700">
        <span><strong>Name:</strong> {order?.addressInfo?.name}</span>
        <span><strong>Phone:</strong> {order?.addressInfo?.phone}</span>
        <span><strong>Address:</strong> {order?.addressInfo?.address}</span>
        <span><strong>City:</strong> {order?.addressInfo?.city}</span>
        <span><strong>Pincode:</strong> {order?.addressInfo?.pincode}</span>
        <span><strong>Notes:</strong> {order?.addressInfo?.notes}</span>
      </div>
    </div>

  </div>
</DialogContent>


  )
}

export default ShopOrderDetails
