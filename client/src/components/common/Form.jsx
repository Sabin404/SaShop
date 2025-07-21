
import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const Form = ({formControls,buttonText}) => {
  return (
    <form>
      <div className='flex flex-col gap-3 '>
        {
          formControls.map((control, index) => (
            <div key={index} className='flex flex-col'>
              <Label htmlFor={control.name} className='text-sm font-medium text-gray-700'>
                {control.label}
              </Label>
              <Input
                type={control.type}
                name={control.name}
                id={control.name}
                placeholder={control.placeholder}
                className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          ))
        }
        <Button>{buttonText}</Button>
      </div>
    </form>
  )
}

export default Form
