import React, { useState } from 'react'
import { MdCategory, MdTableBar, MdInsights, MdPayment } from 'react-icons/md'
import { BiSolidDish } from 'react-icons/bi'
import { FaShoppingCart } from 'react-icons/fa'
import Metrics from '../components/Dashboard/Metrics'
import RecentOrders from '../components/Dashboard/RecentOrders'
import Payment from '../components/Dashboard/Payment'
import Modal from '../components/Dashboard/Modal'
const buttons=[
  {label:"Add Table", icon:<MdTableBar/>, action:"table"},
  {label:"Add Category", icon:<MdCategory/>, action:"category"},
  {label: "Add Dishes", icon:<BiSolidDish/>, action:"dish"}
];

const tabIcons = {
  "Metrics": <MdInsights/>,
  "Orders": <FaShoppingCart/>,
  "Payment": <MdPayment/>
};

const tabs =["Metrics","Orders", "Payment"];

const Dashboard = () => {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Metrics");
  const handleOpenModal = (action) => {
    if(action === "table") setIsTableModalOpen(true)
  }
  return (
    <div className='bg-[#2a2a2a] min-h-screen'>
      {/* Button Row */}
      <div className='px-6 py-6'>
        <div className='flex items-center justify-between'>
          {/* Left side - Add buttons */}
          <div className='flex items-center gap-6'>
            {buttons.map(({label, icon, action}) => {
              return (
                <button
                onClick={() => handleOpenModal(action)}
                  key={label}
                  className="bg-[#1a1a1a] hover:bg-[#262626] px-3 py-2 text-white text-sm flex items-center gap-2 transition-colors duration-200"
                >
                  <span className='text-sm'>{icon}</span>
                  <span>{label}</span>
                  <span className='ml-1 text-xs'>▼</span>
                </button>
              )
            })}
          </div>

          {/* Right side - Tab buttons */}
          <div className='flex items-center gap-6'>
            {tabs.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  className={`bg-transparent hover:bg-gray-700 px-3 py-2 text-sm flex items-center gap-2 transition-colors duration-200 relative ${
                    isActive ? 'text-white' : 'text-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  <span className='text-sm'>{tabIcons[tab]}</span>
                  <span>{tab}</span>
                  {isActive && <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-white'></div>}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className='px-6 pb-6'>
        {activeTab === "Metrics" && <Metrics/>}
        {activeTab === "Orders" && <RecentOrders/>}
        {activeTab === "Payment" && <Payment/>}
        {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen}/>}
      </div>
    </div>
  )
}

export default Dashboard
