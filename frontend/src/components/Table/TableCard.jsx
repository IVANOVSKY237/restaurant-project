import React from 'react'
import { FaCheckDouble, FaLongArrowAltRight } from 'react-icons/fa'
import { getBgColor, getAvatarName} from '../../utils'
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { updateTable } from '../../Redux/Slices/customerSlice'
import { selectTable } from '../../Redux/Slices/tableSlice'

const TableCard = ({id, name, status, initials, seats}) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () =>{
    if(status === "Booked") return;

    // Update Redux store with selected table
    dispatch(updateTable({ tableNo: name }));
    dispatch(selectTable({ id, name, status, initials, seats }));

    navigate('/menu');
  }



  return (
    <div onClick={handleClick} className='w-[360px] h-[250px] hover:bg-[#2c2c2c] bg-[#262626] p-4 rounded-lg cursor-pointer'>
        <div className='flex items-center justify-between px-1'>
            <h1 className='text-[#f5f5f5] text-xl font-semibold'>Table <FaLongArrowAltRight className='text-[#ababab] ml-2 inline'/>{name}</h1>
        <p className={`${status === "Booked"? "text-green-600 bg-[#2e4a40]":"bg-[#664a04] text-white"}  px-2 py-1 rounded-lg `}>
        {status}
        </p>
        </div>
        <div className='flex items-center justify-center mt-5 mb-7'>
             <h1 className={` text-white rounded-full p-5 text-xl`} style={{backgroundColor:initials ?getBgColor(): "#1f1f1f"}}>{getAvatarName(initials) || "N/A"}</h1>
        </div>
        <p className='text-[#ababab] text-xs'>Seats: <span className='text-[#f5f5f5]'>{seats}</span></p>
       
        
    </div> 
  )
}

export default TableCard