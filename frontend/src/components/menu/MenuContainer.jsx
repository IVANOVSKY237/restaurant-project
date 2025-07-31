import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { menus } from '../../constants'
import { addItem } from '../../Redux/Slices/CartSlice'
import { GrRadialSelected } from 'react-icons/gr'
import {FaShoppingCart} from 'react-icons/fa'


const MenuContainer = () => {
    const [selected, setSelected] = useState(menus[0]);
    const [itemCounts, setItemCounts] = useState({});
    const dispatch = useDispatch();

     const increment = (id) => {
        setItemCounts(prev => {
            const currentCount = prev[id] || 0
            if (currentCount >= 10) return prev // Maximum limit
            return {...prev, [id]: currentCount + 1}
        })
    }
    
    const decrement = (id) => {
        setItemCounts(prev => {
            const currentCount = prev[id] || 0
            if (currentCount <= 0) return prev
            return {...prev, [id]: currentCount - 1}
        })
    }
    const handleAddToCart = (item) => {
      const count = itemCounts[item.id] || 0;
      if(count === 0) return;
      const {name, price} = item;
      const newObj = {id: Date.now() + Math.random(), name, pricePerQuantity: price, quantity: count, price: price * count};

      dispatch(addItem(newObj));
      setItemCounts(prev => ({...prev, [item.id]: 0}));
    }
  return (
    <>
    <div className='grid grid-cols-4 gap-4 px-10 py-4 w-[100%] '>
        {
            menus.map((menu) => {
                return (
                    <div key={menu.id} className='flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer'
                        style={{backgroundColor : menu.bgColor}}
                        onClick={()=>{
                            setSelected(menu);
                            // Reset counts when changing menu
                            setItemCounts({});
                        }}
   
                        >
                        
                        <div className='flex items-center justify-between w-full'>
                            <h1 className='text-[#f5f5f5] text-lg font-semibold'> {menu.icon}{menu.name}</h1>

                            {selected.id === menu.id && <GrRadialSelected className='text-white' size={20}/>}
                        </div>
                        <p className='text-[#ababab] text-xl font-bold'>{menu.items.length} Items</p>

                    </div>
                )

            })
        }
    </div>

    <hr className='border-[#2a2a2a] border-t-2 mt-4'/>
    
      <div className='grid grid-cols-4 gap-4 px-10 py-4 w-[100%] '>
        {
            selected?.items.map((item) => {
                const count = itemCounts[item.id] || 0;
                return (
                    <div key={item.id} className='flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer hover:bg-[#2a2a2a] bg-[#1a1a1a]'>
                      <div className='flex items-start justify-between w-full'>
                          <h1 className='text-[#f5f5f5] text-lg font-semibold'> {item.name}</h1>
                        <button onClick={() => handleAddToCart(item)} className='bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg mb-3'><FaShoppingCart size={20} /></button>
                      </div>
                        <div className='flex items-center justify-between w-full'>
                            <p className='text-[#ababab] text-xl font-bold'>{item.price}</p>
                            <div className='flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg gap-6'>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        decrement(item.id);
                                    }}
                                    className='text-yellow-500 text-2xl'>&minus;
                                </button>
                                <span className='text-white'>{count}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        increment(item.id);
                                    }}
                                    className='text-yellow-500 text-2xl'>&#43;
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
    </>
  )
}
 
export default MenuContainer
