import React, {useState} from 'react';
import { FaHome } from 'react-icons/fa';
import {MdOutlineReorder,MdTableBar} from 'react-icons/md';
import { CiCircleMore} from 'react-icons/ci';
import {BiSolidDish} from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { setCustomerName } from '../../Redux/Slices/customerSlice';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [name, setName] = useState('');
  const dispatch =useDispatch();
  const [phone, setPhone] = useState('');

  // Helper function to determine if a route is active
  const isActive = (path) => location.pathname === path;
  const openModal = ()=> setIsModalOpen(true);
  const closeModal = ()=> setIsModalOpen(false);
  const increment = ()=> {
    if(guestCount >=6) return;
    setGuestCount((prev) => prev +1);
  }
  const decrement = ()=> {
    if(guestCount<=0) return;
    setGuestCount((prev) => prev -1);
  }

  
  const handleCreateOrder = () => {
    dispatch(setCustomerName({name, phone, guests:guestCount}));
    closeModal();
    navigate('/tables');
  }
  

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around'>
        <button
          onClick={()=> navigate("/home")}
          className={`flex items-center justify-center w-[200px] rounded-[15px] ${
            isActive("/home") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"
          }`}>
         <FaHome className="inline mr-4" size={30}/> <p>Home</p></button>
        <button
          onClick={()=> navigate("/orders")}
          className={`flex items-center justify-center w-[200px] rounded-[15px] ${
            isActive("/orders") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"
          }`}>
          <MdOutlineReorder  className="inline mr-4" size={30} /><p>Orders</p></button>
        <button
          onClick={()=> navigate("/tables")}
          className={`flex items-center justify-center w-[200px] rounded-[15px] ${
            isActive("/tables") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"
          }`}>
          <MdTableBar className="inline mr-4" size={30} /><p>Table</p></button>
        <button
          onClick={()=> navigate("/more")}
          className={`flex items-center justify-center w-[200px] rounded-[15px] ${
            isActive("/more") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"
          }`}>
          <CiCircleMore className="inline mr-4" size={30} /><p>More</p></button>
        <button 
        disabled={isActive("/tables") || isActive("/menu")}
        onClick={openModal} 
        className='absolute bottom-6 bg-[#F6B100] text-4xl text-[#f5f5f5] rounded-full p-3 items-center'>
          <BiSolidDish /></button>
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">
            <div>
              <label className='block text-[#ababab] mb-2 mt-2 text-sm font-medium'>Customer Name</label>
              <div className='flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]'>
                <input value={name} onChange={(e) => setName(e.target.value)} type="name" name='' placeholder='Enter customer Name' id="" className='bg-transparent flex-1 text-white focus:outline-none'/>

              </div>
              <label className='block text-[#ababab] mb-2 mt-2 text-sm font-medium'>Customer Number</label>
                <div className='flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]'>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" name='' placeholder='+237      ' id="" className='bg-transparent flex-1 text-white focus:outline-none'/>

              </div>
            </div>
            <div>
              <label className='block mb-2 mt-3 text-sm font-medium text-[#ababab]'>Guest</label>
              <div className='flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg'>
                <button onClick={decrement} className='text-yellow-500 text-2xl'>&minus;</button>
                <span className='text-white'>{guestCount} persons</span>
                <button onClick={increment} className='text-yellow-500 text-2xl'>&#43;</button>
              </div>
            </div>
            <button onClick={handleCreateOrder} className='w-full bg-[#f6B100] text-[#f5f5f5] rounded-lg py-3 mt-8 hover:bg-yellow-700'>
              Create Order
            </button>
             
          </Modal>
    </div>
  )
}

export default BottomNav