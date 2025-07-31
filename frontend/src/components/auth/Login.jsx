import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { login } from '../../https/index.js'
import {enqueueSnackbar} from 'notistack';
import { useDispatch} from 'react-redux';
import { setUser } from '../../Redux/Slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeEmail: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    loginMutation.mutate({
      email: formData.employeeEmail,
      password: formData.password
    })
  }
  const loginMutation = useMutation({
    mutationFn: (reqData) => login(reqData),
    onSuccess: (response) => {
      console.log('✅ Login successful!', response);

      // Extract user data from response
      const { _id, name, email, phone, role } = response.data.data;

      // Update Redux state first
      dispatch(setUser({ _id, name, email, phone, role }));

      // Store token in localStorage for future requests
      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.data));

      setLoading(false);

      // Navigate to home page using React Router
      navigate('/home');
    },
    onError: (error) => {
     const {response} = error;
     enqueueSnackbar(response.data.message, {variant: 'error'});
     setLoading(false)
     // Note: Error display removed to avoid conflict with external error handling
    },
  })

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">


        {/* Employee Email */}
        <div>
          <label className='block text-[#ababab] mb-2 text-base font-medium'>
            Employee Email
          </label>
          <div className='flex items-center rounded-lg p-4 bg-[#1f1f1f]'>
            <input
              type="email"
              name='employeeEmail'
              value={formData.employeeEmail}
              onChange={handleInputChange}
              placeholder='Enter employee email'
              className='bg-transparent flex-1 text-white text-base focus:outline-none placeholder-[#6a6a6a]'
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className='block text-[#ababab] mb-2 text-base font-medium'>
            Password
          </label>
          <div className='flex items-center rounded-lg p-4 bg-[#1f1f1f]'>
            <input
              type="password"
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              placeholder='Enter password'
              className='bg-transparent flex-1 text-white text-base focus:outline-none placeholder-[#6a6a6a]'
              required
              disabled={loading}
            />
          </div>
        </div>
        {/* Submit Button */}
        <button
          type='submit'
          disabled={loading}
          className='w-full rounded-lg mt-8 py-4 text-lg bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

export default Login