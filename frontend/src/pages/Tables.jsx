

import React, {useState} from "react";
import BottomNav from '../components/shared/BottomNav'
import BackButton from '../components/shared/BackButton'
import TableCard from '../components/Table/TableCard'
import { setFilterStatus } from '../Redux/Slices/tableSlice'
import {keepPreviousData, useQuery} from "@tanstack/react-query"
import { getTables } from '../https'
import { useDispatch, useSelector } from 'react-redux'
import { enqueueSnackbar } from 'notistack'
const Tables = () => {
   const [status, setStatus] = useState("all");
   const { data:resData, isError} = useQuery({
    queryKey:["tables"],
    queryFn: async()=> {
      return await getTables();
    },
    placeholderData: keepPreviousData
   })

   // Move side effect to useEffect to avoid render phase updates
   React.useEffect(() => {
     if(isError) {
       enqueueSnackbar("Something went wrong!", { variant: "error"})
     }
   }, [isError]);

   console.log(resData);
  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden ">
          <div className='flex items-center justify-between px-10 py-4'>
                <div className='flex items-center gap-4'>
                    <BackButton />
                     <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wide mt-2'>
                        Tables
                        </h1>
                </div>

                  <div className='flex items-start justify-around gap-4  '>
                    <button onClick={() => setStatus("all")} className={`text-[#ababab] text-lg ${status === "all" && "bg-[#383838]"} rounded-lg px-5 py-2 font-semibold`}> All</button>
                    <button onClick={() => setStatus("Available")} className={`text-[#ababab] text-lg ${status === "Available" && "bg-[#383838]"} rounded-lg px-5 py-2 font-semibold`}> Available</button>
                    <button onClick={() => setStatus("Booked")} className={`text-[#ababab] text-lg ${status === "Booked" && "bg-[#383838]"} rounded-lg px-5 py-2 font-semibold`}> Booked</button>
                </div>
         </div>
         <div className=' flex flex-wrap gap-5 px-10 py-5 overflow-y-scroll h-[900px] scrollbar-hide'>
           {
            resData?.data?.data ? (
              resData.data.data
                .filter(table => status === "all" || table.status === status)
                .map((table)=>{
                  return(
                      <TableCard
                        key={table._id}
                        id={table._id}
                        name={table.tableNo}
                        status={table.status}
                        initials={table?.currentOrder?.customerDetails.name}
                        seats={table.seats}
                      />
                  )
                })
            ) : (
              <div className="text-[#ababab] text-center w-full py-10">
                {isError ? "Error loading tables" : "Loading tables..."}
              </div>
            )
           }
         </div>
            <BottomNav />
    </section>
        
    
  )
}

export default Tables