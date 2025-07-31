import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaNotesMedical } from 'react-icons/fa'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { removeItem } from '../../Redux/Slices/CartSlice'

const CartInfo = () => {
  const cartData = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const scrollRef = useRef();

  // Move useEffect to component level to handle scrolling when cart data changes
  useEffect(() => {
    if(scrollRef.current){
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [cartData]);

  const handleRemove = (itemsId) => {
    dispatch(removeItem(itemsId));
  }

  return (
    <div className="px-4 py-2">
                <h1 className="text-sm text-[#ececec] font-semibold tracking-wide mb-2">Order Details:</h1>
                <div className='mt-4 overflow-scroll scrollbar-hide h-[450px]' ref={scrollRef}>
               
                  {cartData.length === 0? (
                    <p className='text-[#ababab] text-sm flex justify-center items-center h-[380px]'>Your cart is empty. Start adding items!</p>
                  ) : cartData.map((item) => {
                    return (
                  
                       <div className='bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2' key={item.id}>
                      <div className='flex items-center justify-between'>
                        <h1 className='text-[#ababab] font-semibold tracling-wide text-md'>{item.name}</h1>
                        <p className='text-[#ababab] font-semibold'>x{item.quantity}</p>
                      </div>
                      <div className='flex items-center justify-between  mt-3'>
                        <div className='flex items-center gap-3'>
                          <RiDeleteBin2Fill
                          onClick={() => handleRemove(item.id)}
                           className='text-[#ababab]  cursor-pointer' size={20}/>
                          <FaNotesMedical className='text-[#ababab]  cursor-pointer' size={20}/>
                        </div>
                        <p className='text-[#f5f5f5] text-md font-bold'>{item.price} fcfa</p>
                      </div>
                    </div>
                  )
                    })}
                   
                </div>   
            </div>
  )
}

export default CartInfo