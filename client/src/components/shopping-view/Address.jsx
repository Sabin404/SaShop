import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Form from '../common/Form'
import { addressFormControls } from '@/config'

const initialData={
  address:'',
  city:'',
  phone:'',
  pincode:'',
  notes:''
}

const Address = () => {
  const [formData,setFormData]=useState(initialData)

  const handleManageAddress=(e)=>{
    e.preventDefault();
  }

  function isValid(){
    return Object.keys(formData).map(key=>formData[key].trim()!=='').every(item=>item)
  }

  return (
    <Card>
      <div>Address</div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
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
