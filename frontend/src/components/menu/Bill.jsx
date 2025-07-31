import React from 'react'
import { useSelector } from 'react-redux';

const Bill = () => {

  const cartData = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.items.reduce((total, item) => total + item.price, 0));
  const taxRate =5.25;
  const tax = (total* taxRate)/100;
  const totalPriveWithTax=total +tax; 
  return (
    <div className="px-4 py-4">
    <div className='flex items-center justify-between px-1 mb-1'>
        <p className='text-xs text-[#ababab] font-medium mt-2'>Items({cartData.length})</p>
        <h1 className='text-[#f5f5f5] text-x font-bold'>{total.toFixed(2)}</h1>
    </div>
     <div className='flex items-center justify-between px-1 mb-2'>
        <p className='text-xs text-[#ababab] font-medium'>Tax(5.25%)</p>
        <h1 className='text-[#f5f5f5] text-sm font-bold'>{tax.toFixed(2)}</h1>
    </div>
    <div className='flex items-center justify-between px-1 mt-2'>
      <p className='text-xs text-[#ababab] font-medium mb-3'>Total with Tax</p>
      <h1 className='text-[#f5f5f5] text-md font-bold'>{totalPriveWithTax.toFixed(2)}fcfa</h1>
    </div>
    <div className='flex items-center gap-2 mb-2'>
        <button className='bg-[#1f1f1f] px-2 py-2.5 w-full rounded-lg text-[#ababab] font-semibold text-xs'>Cash</button>
        <button className='bg-[#1f1f1f] px-2 py-2.5 w-full rounded-lg text-[#ababab] font-semibold text-xs'>Online</button>
    </div>
    <div className='flex items-center gap-2'>
        <button className='bg-[#025cca] px-2 py-2 w-full rounded-lg text-[#f5f5f5] font-semibold text-xs'>Print Receipt</button>
         <button className='bg-[#f6b100] px-2 py-2 w-full rounded-lg text-[#1f1f1f] font-semibold text-xs'>Place Order</button>
    </div>

    </div>
  )
}

export default Bill