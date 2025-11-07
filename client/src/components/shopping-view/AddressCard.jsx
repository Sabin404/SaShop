import React from 'react'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  return (
    <div>
      <Card
        onClick={
          setCurrentSelectedAddress
            ? () => setCurrentSelectedAddress(addressInfo)
            : null
        }
        className={`cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${selectedId?._id === addressInfo?._id
            ? "border-red-600 border-4 shadow-lg"
            : "border-gray-300 hover:border-gray-500 shadow-sm"
          } rounded-xl`}
      >
        <CardContent className="grid p-4 gap-2">
          <Label className="font-semibold text-gray-800">Address: <span className="font-normal">{addressInfo?.address}</span></Label>
          <Label className="font-semibold text-gray-800">City: <span className="font-normal">{addressInfo?.city}</span></Label>
          <Label className="font-semibold text-gray-800">Pincode: <span className="font-normal">{addressInfo?.pincode}</span></Label>
          <Label className="font-semibold text-gray-800">Phone: <span className="font-normal">{addressInfo?.phone}</span></Label>
          <Label className="font-semibold text-gray-800">Notes: <span className="font-normal">{addressInfo?.notes}</span></Label>
        </CardContent>
        <CardFooter className="p-3 flex justify-between">
          <Button variant="outline" className="hover:bg-red-50 text-red-600 border-red-600">
            Edit
          </Button>
          <Button variant="outline" className="hover:bg-red-600 hover:text-white text-red-600 border-red-600">
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>

  )
}

export default AddressCard
