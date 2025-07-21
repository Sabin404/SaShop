import Form from '@/components/common/Form'
import { registerFormControl } from '@/config'
import React from 'react'
import { Link } from 'react-router-dom'

const initialState={
  username: '',
  email: '',
  password: '',
}
const Register = () => {
  const [formData, setFormData] = React.useState(initialState)
  const onSubmit = (e) => {}
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <h2 className='text-2xl font-bold text-center'>Create new account</h2>
      <p className='text-center text-sm text-gray-600'>
        Already have an account? <Link to='/auth/login' className='text-blue-600 hover:underline'>Login here</Link>
      </p>
    <Form formControls={registerFormControl} 
      buttonText={'Signup'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    />
    </div>
  )
}

export default Register
