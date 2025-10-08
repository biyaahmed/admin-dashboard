

// pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminStats, getAdminOrders } from '../api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [paidOrders, setPaidOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch stats
        const statsData = await getAdminStats();
        setStats([
          {
            title: 'Total Orders',
            value: statsData.total_orders?.toLocaleString() || '0',
            change: '+12%',
            trend: 'up',
            icon: 'fas fa-shopping-cart',
            color: 'bg-orange-500'
          },
          {
            title: 'Revenue',
            value: `$${statsData.total_revenue?.toLocaleString() || '0'}`,
            change: '+8%',
            trend: 'up',
            icon: 'fas fa-dollar-sign',
            color: 'bg-green-500'
          },
          {
            title: 'Customers',
            value: statsData.total_customers?.toLocaleString() || '0',
            change: '+5%',
            trend: 'up',
            icon: 'fas fa-users',
            color: 'bg-blue-500'
          },
          {
            title: 'Pending Orders',
            value: statsData.pending_orders?.toString() || '0',
            change: '-3%',
            trend: 'down',
            icon: 'fas fa-clock',
            color: 'bg-amber-500'
            
          }
        ]);

        // Fetch orders and filter them
        const ordersData = await getAdminOrders();
        
        // Recent orders (all orders, limit to 4)
        const recent = ordersData.data.slice(0, 4).map(order => ({
          id: order.order_number || order.id || 'N/A',
          customer: order.form_data?.contact?.firstName + ' ' + order.form_data?.contact?.lastName || 'Unknown Customer',
          amount: `$${order.total || '0'}`,
          status: order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Unknown',
          date: order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Unknown Date'
        }));
        setRecentOrders(recent);

        // Pending orders
        const pending = ordersData.data
          .filter(order => order.status && order.status.toLowerCase() === 'pending')
          .slice(0, 4)
          .map(order => ({
            id: order.order_number || order.id || 'N/A',
            customer: order.form_data?.contact?.firstName + ' ' + order.form_data?.contact?.lastName || 'Unknown Customer',
            amount: `$${order.total || '0'}`,
            status: order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Unknown',
            date: order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Unknown Date'
          }));
        setPendingOrders(pending);

        // Paid orders (assuming 'completed', 'paid', or 'delivered' status)
        const paid = ordersData.data
          .filter(order => 
            order.status && (
              order.status.toLowerCase() === 'completed' || 
              order.status.toLowerCase() === 'paid' ||
              order.status.toLowerCase() === 'delivered'
            )
          )
          .slice(0, 4)
          .map(order => ({
            id: order.order_number || order.id || 'N/A',
            customer: order.form_data?.contact?.firstName + ' ' + order.form_data?.contact?.lastName || 'Unknown Customer',
            amount: `$${order.total || '0'}`,
            status: order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Unknown',
            date: order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Unknown Date'
          }));
        setPaidOrders(paid);

      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'completed': 
      case 'paid': 
      case 'delivered': 
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing': 
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': 
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default: 
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleViewAllOrders = () => {
    navigate('/admin/orders');
  };

  const handleViewPendingOrders = () => {
    navigate('/admin/orders?status=pending');
  };

  const handleViewPaidOrders = () => {
    navigate('/admin/orders?status=completed');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl mb-4" style={{color:"#2e2163"}}></i>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
          <p className="text-gray-600">Error loading dashboard: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const OrderCard = ({ orders, title, subtitle, emptyMessage, emptyIcon, viewAllHandler, borderColor, bgColor }) => (
    <div className={`bg-white rounded-2xl shadow-sm border  overflow-hidden`}>
      <div className={`px-6 py-4 border-b ${borderColor} ${bgColor}`}>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 text-sm mt-1">{subtitle}</p>
      </div>
      <div className={`divide-y ${borderColor}`}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0" style={{display:"flex", flexDirection:"column", gap:"5px", textAlign:"left"}}>
                  <h3 className="font-semibold text-gray-900 truncate">{order.id}</h3>
                  <p className="text-sm text-gray-600 truncate">{order.customer}</p>
                </div>
                <div className="text-right ml-4 flex-shrink-0">
                  <p className="font-bold text-gray-900">{order.amount}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2" style={{textAlign:"left"}}>{order.date}</p>
            </div>
          ))
        ) : (
          <div className="px-6 py-8 text-center">
            <i className={`${emptyIcon} text-3xl text-gray-300 mb-3`}></i>
            <p className="text-gray-500">{emptyMessage}</p>
          </div>
        )}
      </div>
      <div className={`px-6 py-4 border-t ${borderColor} ${bgColor}`}>
        <button 
          onClick={viewAllHandler}
          className="text-gray-700 hover:text-gray-900 font-semibold text-sm transition-colors duration-200 flex items-center gap-2"
        >
          View all {title.toLowerCase()}
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className=" rounded-3xl shadow-lg p-8 text-white" style={{backgroundColor:"#2e2163"}} >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back, Admin!</h1>
            <p className="text-lg">Here's what's happening with your store today.</p>
          </div>
          <div className="hidden lg:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <i className="fas fa-bread-slice text-3xl text-white"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border  p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className={`text-sm font-medium mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last week
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <i className={`${stat.icon} text-white text-lg`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        

        {/* Pending Orders */}
        <OrderCard
          orders={pendingOrders}
          title="Pending Orders"
          subtitle="Orders awaiting processing"
          emptyMessage="No pending orders"
          emptyIcon="fas fa-clock"
          viewAllHandler={handleViewPendingOrders}
          borderColor="border-amber-100"
          // bgColor="bg-amber-50"
          backgroundColor="#2e2163"
        />

        {/* Paid Orders */}
        <OrderCard
          orders={paidOrders}
          title="Paid Orders"
          subtitle="Completed and paid orders"
          emptyMessage="No paid orders"
          emptyIcon="fas fa-check-circle"
          viewAllHandler={handleViewPaidOrders}
          borderColor="border-green-100"
          bgColor="bg-green-50"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;