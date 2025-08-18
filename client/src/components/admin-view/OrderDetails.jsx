import React, { useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import Form from '../common/Form'

const initialFormData={
  status:''
}

const OrderDetails = () => {
  const[formData,setFormData]=useState(initialFormData)

  const handleUpdateStatus=(e)=>{
    e.preventDefault()
  }
  return (
    <DialogContent className={'sm:max-w-[600px]'}>
      <div className='grid gap-6'>
        <div className="grid gap-2">
          <div className="flex items-center mt-6 justify-between">
            <p className="font-medium">Order ID</p>
            <Label>123456</Label>
          </div>
          <div className="flex items-center mt-2 justify-between">
            <p className="font-medium">Order Date</p>
            <Label>2082-10-20</Label>
          </div>
          <div className="flex items-center mt-2 justify-between">
            <p className="font-medium">Price</p>
            <Label>123456</Label>
          </div>
          <div className="flex items-center mt-2 justify-between">
            <p className="font-medium">Order Status</p>
            <Label>pending</Label>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="gird gap-2">
            <div className='font-medium'>Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product 1</span>
                <span>$200</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="gird gap-2">
            <div className='font-medium'>Shipping Info</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <div className="grid gap-0.5">
                  <span>Jhon Doe</span>
                  <span>Address</span>
                  <span>City</span>
                  <span>Pincode</span>
                  <span>Phone</span>
                  <span>Notes</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <Form
            formControls={[
              {
                label: "Order Status",
                name: "Status",
                componentType: "select",
                options: [
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "pending", label: "Pending" },
                  { id: "delivered", label: "Delivered" },
                  { id: "Rejected", label: "Rejected" },
                  
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={'Updated Status'}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  )
}

export default OrderDetails
