import React, { useState, useEffect } from 'react'
import { MdPayment, MdCreditCard, MdAccountBalanceWallet, MdTrendingUp } from 'react-icons/md'
import { FaMoneyBillWave } from 'react-icons/fa'
import { paymentData as defaultPaymentData } from '../../constants'
import axios from 'axios'

const Payment = () => {
  const [paymentData, setPaymentData] = useState(defaultPaymentData)
  
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/order`)
        const orders = response.data.data || []
        
        // Calculate payment statistics
        let totalPayments = 0
        let cashPayments = 0
        let digitalPayments = 0
        let pendingPayments = 0
        
        const recentPayments = []
        
        orders.forEach(order => {
          const amount = order.bills?.totalWithTax || 0
          
          if (order.paymentStatus === 'Paid') {
            totalPayments += amount
            
            if (order.paymentMethod === 'Cash') {
              cashPayments += amount
            } else if (order.paymentMethod === 'Digital') {
              digitalPayments += amount
            }
            
            // Add to recent payments if paid
            recentPayments.push({
              id: order._id,
              orderId: order.orderId || `#ORD-${order._id.slice(-6)}`,
              customer: order.customerDetails?.name || 'Unknown',
              amount: amount,
              method: order.paymentMethod || 'Cash',
              status: order.paymentStatus || 'Pending',
              date: order.createdAt
            })
          } else {
            pendingPayments += amount
          }
        })
        
        // Sort recent payments by date and take last 10
        recentPayments.sort((a, b) => new Date(b.date) - new Date(a.date))
        
        setPaymentData({
          totalPayments,
          cashPayments,
          digitalPayments,
          pendingPayments,
          recentPayments: recentPayments.slice(0, 10)
        })
      } catch (error) {
        console.error('Error fetching payment data:', error)
        // Use default data if API fails
        setPaymentData(defaultPaymentData)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPaymentData()
    
    // Refresh data every 60 seconds
    const intervalId = setInterval(fetchPaymentData, 60000)
    
    return () => clearInterval(intervalId)
  }, [])
  
  const getTimeAgo = (dateString) => {
    const now = new Date()
    const paymentDate = new Date(dateString)
    const diffInMinutes = Math.floor((now - paymentDate) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }
  
  const getPaymentMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case 'cash':
        return <FaMoneyBillWave className="text-green-400" />
      case 'digital':
        return <MdAccountBalanceWallet className="text-blue-400" />
      case 'card':
        return <MdCreditCard className="text-purple-400" />
      default:
        return <MdPayment className="text-gray-400" />
    }
  }
  
  const paymentMetrics = [
    {
      title: "Total Payments",
      value: `${paymentData.totalPayments.toLocaleString()} FCFA`,
      icon: <MdTrendingUp className="text-2xl" />,
      color: "text-green-400",
      bgColor: "bg-green-400/10"
    },
    {
      title: "Cash Payments",
      value: `${paymentData.cashPayments.toLocaleString()} FCFA`,
      icon: <FaMoneyBillWave className="text-2xl" />,
      color: "text-green-400",
      bgColor: "bg-green-400/10"
    },
    {
      title: "Digital Payments",
      value: `${paymentData.digitalPayments.toLocaleString()} FCFA`,
      icon: <MdAccountBalanceWallet className="text-2xl" />,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10"
    },
    {
      title: "Pending Payments",
      value: `${paymentData.pendingPayments.toLocaleString()} FCFA`,
      icon: <MdPayment className="text-2xl" />,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10"
    }
  ]

  return (
    <div className='text-white'>
      <h2 className='text-xl font-semibold mb-6'>Payment Analytics</h2>
      
      {/* Payment Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {paymentMetrics.map((metric, index) => (
          <div key={index} className='bg-[#1a1a1a] p-6 rounded-lg border border-gray-700'>
            <div className='flex items-center justify-between mb-4'>
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <div className={metric.color}>
                  {metric.icon}
                </div>
              </div>
            </div>
            <div>
              <p className='text-gray-400 text-sm mb-1'>{metric.title}</p>
              <p className='text-xl font-bold text-white'>{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Payments Table */}
      <div className='bg-[#1a1a1a] rounded-lg border border-gray-700 overflow-hidden'>
        <div className='p-4 border-b border-gray-700'>
          <h3 className='text-lg font-semibold'>Recent Payments</h3>
        </div>
        
        {loading ? (
          <div className='p-8 text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4'></div>
            <p className='text-gray-400'>Loading payments...</p>
          </div>
        ) : paymentData.recentPayments.length === 0 ? (
          <div className='p-8 text-center'>
            <p className='text-gray-400'>No payments found</p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-[#262626]'>
                <tr>
                  <th className='text-left p-4 text-gray-300 font-medium'>Order ID</th>
                  <th className='text-left p-4 text-gray-300 font-medium'>Customer</th>
                  <th className='text-left p-4 text-gray-300 font-medium'>Amount</th>
                  <th className='text-left p-4 text-gray-300 font-medium'>Method</th>
                  <th className='text-left p-4 text-gray-300 font-medium'>Status</th>
                  <th className='text-left p-4 text-gray-300 font-medium'>Time</th>
                </tr>
              </thead>
              <tbody>
                {paymentData.recentPayments.map((payment) => (
                  <tr key={payment.id} className='border-t border-gray-700 hover:bg-[#262626] transition-colors'>
                    <td className='p-4 text-white font-medium'>{payment.orderId}</td>
                    <td className='p-4 text-gray-300'>{payment.customer}</td>
                    <td className='p-4 text-white font-semibold'>
                      {payment.amount.toLocaleString()} FCFA
                    </td>
                    <td className='p-4'>
                      <div className='flex items-center gap-2'>
                        {getPaymentMethodIcon(payment.method)}
                        <span className='text-gray-300 capitalize'>
                          {payment.method || 'Cash'}
                        </span>
                      </div>
                    </td>
                    <td className='p-4'>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'Paid' 
                          ? 'bg-green-400/20 text-green-400' 
                          : 'bg-yellow-400/20 text-yellow-400'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className='p-4 text-gray-400 text-sm'>{getTimeAgo(payment.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Payment
