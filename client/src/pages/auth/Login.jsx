import Form from '@/components/common/Form'
import { loginFormControl } from '@/config'
import React from 'react'
import { Link } from 'react-router-dom'

const initialState={
  email: '',
  password: '',
}
const Login = () => { 
  const [formData, setFormData] = React.useState(initialState)
  const onSubmit = (e) => {}
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <h2 className='text-2xl font-bold text-center'>Access your account</h2>
      <p className='text-center text-sm text-gray-600'>
        Don't have an account? <Link to='/auth/register' className='text-blue-600 hover:underline'>Register here</Link>
      </p>
    <Form formControls={loginFormControl} 
      buttonText={'Login'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    />
    </div>
  )
}

export default Login
