import React from 'react'
import { MdTrendingUp } from 'react-icons/md'
import { metricsData, itemDetailsData } from '../../constants'

const Metrics = () => {
  return (
    <div className='text-white p-6'>
      {/* Header Section */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h2 className='font-semibold text-white text-2xl mb-2'>
            Overall Performance
          </h2>
          <p className='text-sm text-gray-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, obcaecati?
          </p>
        </div>
        <button className='flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2a2a2a] text-white font-medium hover:bg-[#3a3a3a] transition-colors'>
          Last 1 Month
          <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <path d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>

      {/* Main Metrics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {metricsData.map((metric, index) => (
          <div
            key={index}
            className='relative rounded-xl p-6 text-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'
            style={{ background: metric.bgColor }}
          >
            {/* Background Pattern */}
            <div className='absolute top-0 right-0 w-20 h-20 opacity-20'>
              <div className='text-4xl'>{metric.icon}</div>
            </div>

            {/* Content */}
            <div className='relative z-10'>
              <div className='flex justify-between items-start mb-4'>
                <p className='text-sm font-medium text-white/80'>
                  {metric.title}
                </p>
                {metric.percentage && (
                  <div className='flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full'>
                    <MdTrendingUp className='w-3 h-3' />
                    <span className='text-xs font-medium'>{metric.percentage}</span>
                  </div>
                )}
              </div>

              <div className='flex items-baseline gap-1'>
                <h3 className='text-2xl font-bold text-white'>
                  {metric.currency ? '₹' : ''}{metric.value}
                </h3>
                {metric.currency && (
                  <span className='text-sm font-medium text-white/80 ml-1'>
                    FCFA
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Item Details Section */}
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h3 className='font-semibold text-white text-xl mb-1'>
              Item Details
            </h3>
            <p className='text-sm text-gray-400'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, obcaecati?
            </p>
          </div>
        </div>

        {/* Item Details Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {itemDetailsData.map((item, index) => (
            <div
              key={index}
              className='relative rounded-xl p-6 text-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'
              style={{ background: item.bgColor }}
            >
              {/* Content */}
              <div className='relative z-10'>
                <div className='flex justify-between items-start mb-4'>
                  <p className='text-sm font-medium text-white/80'>
                    {item.title}
                  </p>
                  {item.percentage && (
                    <div className='flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full'>
                      <MdTrendingUp className='w-3 h-3' />
                      <span className='text-xs font-medium'>{item.percentage}</span>
                    </div>
                  )}
                </div>

                <h3 className='text-2xl font-bold text-white'>
                  {item.value}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Metrics