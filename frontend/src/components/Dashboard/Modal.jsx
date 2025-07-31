import React, { useState } from 'react'
import {IoMdClose} from 'react-icons/io'
import { motion} from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { addTable } from '../../https/index.js'
import {enqueueSnackbar} from "notistack"


const Modal = ({setIsTableModalOpen}) => {

    const [tableData, setTableData] = useState({
        tableNo: "",
        seats:""
    });
    const handleInputChange =(e) => {
        const { name, value} = e.target;
        setTableData((prev) => ({...prev, [name]: value}))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(tableData);
        tableMutation.mutate(tableData);
    }
    const handleCloseModal = () =>    
    {
        setIsTableModalOpen(false)
    };
    const tableMutation = useMutation({
        mutationFn: (reqData) => addTable(reqData),
        onSuccess: (res) => {
        setIsTableModalOpen(false);
        const {data} = res;
         enqueueSnackbar(data.message, { variant: "error"})
           
        },
        onError: (error) => {
            const {data} = error.response;
            enqueueSnackbar(data.message, { variant: "error"})
            console.log(error);
        }
    })
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <motion.div
        initial ={{ opacity: 0, scale: 0.9}}
        animate = {{ opacity:1, scale: 1}}
        exit = {{ opacity:0, scale: 0.9}}
        transition ={{ duration: 0.3, ease: "easeInOut"}}
        className = "bg-[#262626] p-6 rounded-lg shadow-lg w-96">
            <div className='flex justify-between item-center mb-4'>
                <h2 className='text-[#f5f5f5] text-xl font-semibold'>
                    Add Table
                </h2>
                <button onClick={handleCloseModal} className='text-[#f5f5f5] hover:text-red-500'>
                    <IoMdClose size={24}/>
                </button>
            </div>
            <form onSubmit={handleSubmit} className='space-y-4 mt-10'>
                 <div>
          <label className='block text-[#ababab] mb-2 text-base font-medium'>
            Table Number
          </label>
          <div className='flex items-center rounded-lg p-4 bg-[#1f1f1f]'>
            <input
              type="number"
              name='tableNo'
              value={tableData.tableNo}
              onChange={handleInputChange}
              className='bg-transparent flex-1 text-white text-base focus:outline-none placeholder-[#6a6a6a]'
              required
              
            />
          </div>
        </div>
            <div>
          <label className='block text-[#ababab] mb-2 text-base font-medium'>
            Number of seats
          </label>
          <div className='flex items-center rounded-lg p-4 bg-[#1f1f1f]'>
            <input
              type="number"
              name='seats'
               value={tableData.seats}
              onChange={handleInputChange}
              className='bg-transparent flex-1 text-white text-base focus:outline-none placeholder-[#6a6a6a]'
              required
              
            />
          </div>
        </div>
         <button
          type='submit'
          className='w-full rounded-lg mt-8 py-4 text-lg bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Add Table
        </button>

        
            </form>
        </motion.div>
    </div>
    
  )
}

export default Modal