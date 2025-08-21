import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Form from '../common/Form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from '@/store/shop/address-slice'
import AddressCard from './AddressCard'
import { toast } from 'sonner'

const initialData = {
  address: '',
  city: '',
  phone: '',
  pincode: '',
  notes: ''
}

const Address = ({setCurrentSelectedAddress}) => {
  const [formData, setFormData] = useState(initialData)
  const [currEditedId, setCurrEditedId] = useState(null)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { addressList } = useSelector(state => state.shopAddress)

  const handleManageAddress = (e) => {
    e.preventDefault();
    if (addressList.length >= 3 && currEditedId ===null) {
      setFormData(initialData)
      toast.error("Limit reached", {
        className: "bg-red-600 text-white",
        duration: 3000,
        position: "top-center",
      });

      return;
    }

    currEditedId !== null ? dispatch(editAddress({
      userId: user?.userId,
      addressId: currEditedId,
      formData
    })).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.userId))
        setFormData(initialData)
        setCurrEditedId(null)
        toast.success(data.payload.message || "Address Edited Successfully", {
          duration: 3000,
          position: "top-center",
        });
      }
    }) : dispatch(addNewAddress({
      ...formData,
      userId: user?.userId
    })).then(data => {
      // console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.userId))
        setFormData(initialData)
        toast.success(data.payload.message || "Address Added Successfully", {
          duration: 3000,
          position: "top-center",
        });
      }

    })
  }

  useEffect(() => {
    dispatch(fetchAllAddress(user?.userId))
  }, [dispatch])
  // console.log(addressList,'address');



  function isValid() {
    return Object.keys(formData).map(key => formData[key].trim() !== '').every(item => item)
  }

  function handleDeleteAddress(getCurrAddress) {
    // console.log(getCurrAddress._id);
    // console.log(user?.userId);

    dispatch(deleteAddress({ userId: user?.userId, addressId: getCurrAddress._id }))
      .then(data => {
        if (data?.payload?.success) {
          // console.log(data);

          dispatch(fetchAllAddress(user?.userId))
          toast.success(data.payload.message || "Address deleted Successfully", {
            duration: 3000,
            position: "top-center",
          });
        }
      })
  }

  function handleEditAddress(getCurrAddress) {
    setCurrEditedId(getCurrAddress._id)
    setFormData({
      ...formData,
      address: getCurrAddress.address,
      city: getCurrAddress.city,
      phone: getCurrAddress.phone,
      pincode: getCurrAddress.pincode,
      notes: getCurrAddress.notes
    })

  }

  return (
    <Card>
      <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
        {
          addressList && addressList.length > 0 ?
            addressList.map((singleAddressItem) => (
              <AddressCard
                handleEditAddress={handleEditAddress}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                 />
            )) : null
        }
      </div>
      <CardHeader>
        <CardTitle>{
          currEditedId !== null ? "Edit  " : "Add"
        }</CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={'Add'}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isValid()}

        />
      </CardContent>
    </Card>
  )
}

export default Address
