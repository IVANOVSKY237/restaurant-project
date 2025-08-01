import React from 'react'
import { useSelector } from 'react-redux'
import BottomNav from '../components/shared/BottomNav'
import BackButton from '../components/shared/BackButton'
import { MdRestaurantMenu } from 'react-icons/md'
import MenuContainer from '../components/menu/MenuContainer'
import CustomerInfo from '../components/menu/CustomerInfo'
import CartInfo from '../components/menu/CartInfo'
import Bill from '../components/menu/Bill'

const Menu = ()=>{

  const customerData = useSelector(state => state.customer);

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-3">
        {/*left Div */}
        <div className='flex-[3]'>
             <div className='flex items-center justify-between px-10 py-4'>
                <div className="flex items-center gap-4">
                    <BackButton />
                     <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wide mt-2'>
                      Menu
                      </h1>
                </div>
               
                <div className='flex items-center justify-around gap-4'>
                  <div className='flex items-center gap-3 cursor-pointer'>
                    <MdRestaurantMenu className=" text-[#f5f5f5] text-4xl"/>
                    <div className='flex flex-col items-start'>
                      <h1 className='text-md text-[#f5f5f5] font-semibold tracking-wide'>
                       {customerData.customerName}
                      </h1>
                      <p className='text-xs text-[#ababab] font-medium'>{customerData.tableNo} </p>
                    </div>
                  </div> 
          
                </div>
            </div> 

             <MenuContainer/>
        </div>
               
    
         {/*right Div */}
          
        <div className='flex-[1] bg-[#1a1a1a] mt-4 mr-3 h-[calc(100vh-10rem)] rounded-lg flex flex-col'>
            {/* Customer Info - Compact */}
            <div className="flex-shrink-0">
                <CustomerInfo/>
            </div>
            <hr className="border-[#2a2a2a] border-t-2" />

            {/* Cart Items - Flexible height to show all items */}
            <div className="flex-1 overflow-y-auto">
                <CartInfo/>
            </div>
            <hr className="border-[#2a2a2a] border-t-2" />

            {/* Bills - Always visible at bottom with adequate space */}
            <div className="flex-shrink-0">
                <Bill/>
            </div>
        </div>
        
        
        
        <BottomNav/>
    </section>
   
  )
}

export default Menu