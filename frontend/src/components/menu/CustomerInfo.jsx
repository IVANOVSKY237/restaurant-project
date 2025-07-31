import React from 'react'
import { useSelector } from 'react-redux'
import { getAvatarName } from '../../utils';

const CustomerInfo = () => {
  const customerData = useSelector(state => state.customer);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="bg-[#f6b100] p-1.5 text-sm font-bold rounded-lg w-8 h-8 flex items-center justify-center">
            {getAvatarName(customerData?.customerName)}
          </button>
          <div className="flex flex-col">
            <h1 className="text-sm text-[#f5f5f5] font-semibold leading-tight">
              {customerData?.customerName || 'Guest'}
            </h1>
            <p className='text-xs text-[#ababab] font-medium leading-tight'>
              Table: {customerData?.tableNo || 'N/A'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-sm text-[#ececec] font-semibold leading-tight">Customer Info:</h1>
          <p className='text-xs text-[#ababab] font-medium leading-tight'>
            {getCurrentDateTime()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CustomerInfo