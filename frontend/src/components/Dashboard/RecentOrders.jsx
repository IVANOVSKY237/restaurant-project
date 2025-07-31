import React, { useState, useEffect } from 'react'
import { MdAccessTime, MdCheckCircle, MdPending, MdHourglassEmpty } from 'react-icons/md'
import { recentOrdersData } from '../../constants'
import axios from 'axios'

const RecentOrders = () => {
  const [orders, setOrders] = useState(recentOrdersData)
  const [loading, setLoading] = useState(false)
  const [useApiData, setUseApiData] = useState(false) // Toggle for API vs Mock data

  useEffect(() => {
    const fetchOrders = async () => {
      if (!useApiData) {
        // Use mock data for demonstration
        setOrders(recentOrdersData.slice(0, 10)) // Show first 10 orders
        return
      }

      setLoading(true)
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/order`)
        const ordersData = response.data.data || []

        // Sort by creation date (most recent first) and take only the last 10
        const recentOrders = ordersData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10)
          .map(order => ({
            id: order._id,
            orderId: order.orderId || `#ORD-${order._id.slice(-6)}`,
            table: order.table?.tableNo ? `Table ${order.table.tableNo}` : 'No Table',
            items: order.items?.map(item => item.name).join(', ') || 'No items',
            amount: `${order.bills?.totalWithTax?.toLocaleString() || 0} FCFA`,
            status: order.orderStatus?.toLowerCase() || 'pending',
            time: getTimeAgo(order.createdAt),
            customerName: order.customerDetails?.name || 'Unknown'
          }))

        setOrders(recentOrders)
      } catch (error) {
        console.error('Error fetching orders:', error)
        // Fallback to mock data if API fails
        setOrders(recentOrdersData.slice(0, 10))
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()

    // Refresh orders every 30 seconds only if using API
    let intervalId
    if (useApiData) {
      intervalId = setInterval(fetchOrders, 30000)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [useApiData])

  const getTimeAgo = (dateString) => {
    const now = new Date()
    const orderDate = new Date(dateString)
    const diffInMinutes = Math.floor((now - orderDate) / (1000 * 60))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'served':
        return <MdCheckCircle className="text-green-400" />;
      case 'ready':
        return <MdCheckCircle className="text-blue-400" />;
      case 'in progress':
        return <MdAccessTime className="text-yellow-400" />;
      case 'pending':
        return <MdPending className="text-red-400" />;
      case 'cancelled':
        return <MdHourglassEmpty className="text-gray-400" />;
      default:
        return <MdPending className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'served':
        return 'text-green-400';
      case 'ready':
        return 'text-blue-400';
      case 'in progress':
        return 'text-yellow-400';
      case 'pending':
        return 'text-red-400';
      case 'cancelled':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className='text-white'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold'>Recent Orders</h2>
        <div className='flex items-center gap-4'>
          <span className='text-sm text-gray-400'>
            Data Source: {useApiData ? 'Live API' : 'Mock Data'}
          </span>
          <button
            onClick={() => setUseApiData(!useApiData)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              useApiData
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {useApiData ? 'Using API' : 'Using Mock'}
          </button>
        </div>
      </div>
      <div className='bg-[#1a1a1a] rounded-lg border border-gray-700 overflow-hidden'>
        {loading ? (
          <div className='p-8 text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4'></div>
            <p className='text-gray-400'>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className='p-8 text-center'>
            <p className='text-gray-400'>No orders found</p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-[#262626]'>
                <tr>
                  <th className='text-left p-4 text-gray-300 font-medium'>Order ID</th>
                  <th className='text-left p-4 text-gray-300 font-medium'>Customer</th>
                  <th className='text-left p-4 text-gray-300 font-medium'>Table</th>
                  <th className='text-left p-4 text-gray-300 font-medium'>Items</th>
                  <th className='text-left p-4 text-gray-300 font-medium'>Amount</th>
                  <th className='text-left p-4 text-gray-300 font-medium'>Status</th>
                  <th className='text-left p-4 text-gray-300 font-medium'>Time</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className='border-t border-gray-700 hover:bg-[#262626] transition-colors'>
                    <td className='p-4 text-white font-medium'>{order.orderId}</td>
                    <td className='p-4 text-gray-300'>{order.customerName}</td>
                    <td className='p-4 text-gray-300'>{order.table}</td>
                    <td className='p-4 text-gray-300 max-w-xs truncate' title={order.items}>
                      {order.items}
                    </td>
                    <td className='p-4 text-white font-semibold'>{order.amount}</td>
                    <td className='p-4'>
                      <div className='flex items-center gap-2'>
                        {getStatusIcon(order.status)}
                        <span className={`capitalize ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </td>
                    <td className='p-4 text-gray-400 text-sm'>{order.time}</td>
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

export default RecentOrders