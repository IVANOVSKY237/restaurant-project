import { useMutation } from '@tanstack/react-query';
import { useState } from 'react'
import { register } from '../../https/index.js'
import { enqueueSnackbar } from 'notistack'

const Register = ({setIsRegister = () => {}}) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeEmail: '',
    employeePhone: '',
    password: '',
    role: ''
  });


  const [loading, setLoading] = useState(false);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleSelect = (selectedRole) => {
    setFormData(prev => ({
      ...prev,
      role: selectedRole
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Transform field names to match backend expectations
    const backendData = {
      name: formData.employeeName,
      email: formData.employeeEmail,
      phone: formData.employeePhone,
      password: formData.password,
      role: formData.role
    };

    registerMutation.mutate(backendData);
  };
  const registerMutation = useMutation({
      mutationFn: (reqData) => register(reqData),
      onSuccess: (response) => {
        const {data} = response;
        console.log(data);
        enqueueSnackbar(data.message, {variant: 'success'});
        setLoading(false);
        // Reset form after successful registration
        setFormData({
          employeeName: '',
          employeeEmail: '',
          employeePhone: '',
          password: '',
          role: ''
        });
        // Switch back to login after successful registration
        setIsRegister(false);
      },
      onError: (error) => {
       const {response} = error;
       enqueueSnackbar(response.data.message, {variant: 'error'});
       setLoading(false);
       // Note: Error display removed to avoid conflict with external error handling
      },
    })
  

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Employee Name */}
        <div>
          <label className='block text-[#ababab] mb-2 text-base font-medium'>
            Employee Name
          </label>
          <div className='flex items-center rounded-lg p-4 bg-[#1f1f1f]'>
            <input
              type="text"
              name='employeeName'
              value={formData.employeeName}
              onChange={handleInputChange}
              placeholder='Enter employee name'
              className='bg-transparent flex-1 text-white text-base focus:outline-none placeholder-[#6a6a6a]'
              required
            />
          </div>
        </div>

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
            />
          </div>
        </div>

        {/* Employee Phone */}
        <div>
          <label className='block text-[#ababab] mb-2 text-base font-medium'>
            Employee Phone
          </label>
          <div className='flex items-center rounded-lg p-4 bg-[#1f1f1f]'>
            <input
              type="tel"
              name='employeePhone'
              value={formData.employeePhone}
              onChange={handleInputChange}
              placeholder='Enter employee phone'
              className='bg-transparent flex-1 text-white text-base focus:outline-none placeholder-[#6a6a6a]'
              required
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
            />
          </div>
        </div>

        {/* Role Selection */}
        <div>
          <label className='block text-[#ababab] mb-2 text-base font-medium'>
            Choose your role
          </label>
          <div className='flex items-center gap-3'>
            {["Waiter", "Cashier", "Admin"].map((role) => {
              return (
                <button
                  key={role}
                  type='button'
                  onClick={() => handleRoleSelect(role.toLowerCase())}
                  className={`flex-1 rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    formData.role === role.toLowerCase()
                      ? 'bg-yellow-400 text-black'
                      : 'bg-[#1f1f1f] text-[#ababab] hover:bg-[#2a2a2a]'
                  }`}
                >
                  {role}
                </button>
              )
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={loading}
          className='w-full rounded-lg mt-8 py-4 text-lg bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
    </div>
  )
}

export default Register