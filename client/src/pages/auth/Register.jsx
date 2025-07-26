import Form from '@/components/common/Form'
import { registerFormControl } from '@/config'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '@/store/auth-slice/authSlice'
import { toast } from 'sonner'
const initialState={
  username: '',
  email: '',
  password: '',
}
const Register = () => {
  const [formData, setFormData] = React.useState(initialState)
  const dispatch = useDispatch()
  const navigate= useNavigate();


  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data)=>{
      // console.log(data);
      if(data?.payload?.success === true){
        toast.success(data?.payload?.message || "Registration successful",
          {
            duration: 3000,
            position: 'top-center',
          }
        );
        navigate('/auth/login');
      }else{
        toast.error(data?.payload?.message || "Registration failed",
          {
            duration: 3000,
            position: 'top-center',
          }
        );
      }
    })
  }
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
