import React from 'react';
import { FaSearch, FaUserCircle, FaBell, FaSignOutAlt } from "react-icons/fa";
import logo from "../../assets/images/logo.png"; // Uncomment if you use the logo later
import { useSelector, useDispatch } from 'react-redux';
import { IoLogOut } from 'react-icons/io5';
import {logout} from "../../https";
import { removeUser } from '../../Redux/Slices/userSlice';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MdDashboard, MdHome } from 'react-icons/md';

const Header = () => {

  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      console.log('Logout successful!', data);
      dispatch(removeUser());
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
      navigate('/auth');
    },
    onError: (error) => {
      console.log('Logout error!', error);
      // Even if the API call fails, we should still clear local data and redirect
      dispatch(removeUser());
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
      navigate('/auth');
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-[#1a1a1a] text-white">
      <div onClick={() =>navigate("/")} className="flex items-center gap-2 cursor-pointer">
        { <img src={logo} alt="restro logo" className="h-9 w-10" /> }
        <h1 className="text-lg font-semibold text-[#f5f5f5] px-4">Restro</h1>
      </div>

      <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2 w-[500px]">
        <FaSearch className="text-xl cursor-pointer text-gray-400" />
        <input type="text"
          placeholder="Search"
          className="bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full" />
      </div>

      <div className='flex items-center gap-4'>
        {
          userData.role === "admin" && (
            <div onClick={()=>navigate("/dashboard")}className='flex items-center gap-2 cursor-pointer'>
              <MdDashboard className="text-[#f5f5f5] text-2xl cursor-pointer" />
              <span className="text-white text-xs">Dashboard</span>
            </div>
          )
        }

        <div className=' rounded-[15px] p-3'>
          <FaBell className="text-[#f5f5f5] text-2xl cursor-pointer" />
        </div>

        <div className='flex items-center gap-3 cursor-pointer'>
          <FaUserCircle className="text-[#f5f5f5] text-4xl cursor-pointer" />

          <div className='flex flex-col items-start'>
            <h1 className='text-md text-[#f5f5f5] cursor-pointer'>{userData.name || 'TEST USER'}</h1>
            <p className='text-xs text-[#ababab] font-medium cursor-pointer'>{userData.role || 'Role'}</p>
          </div>

          <div>
            <FaSignOutAlt
              onClick={handleLogout}
              className="text-[#f5f5f5] ml-2 cursor-pointer transition-all duration-300 hover:text-red-400 hover:scale-110 hover:rotate-12"
              size={20}
            />
            <span className="text-white text-xs">Logout</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
