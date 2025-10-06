// pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminStats, getAdminOrders } from '../api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
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

        // Fetch recent orders (limit to 4)
        const ordersData = await getAdminOrders();
        const recent = ordersData.data.slice(0, 4).map(order => ({
          id: order.order_number,
          customer: order.form_data.contact.firstName + ' ' + order.form_data.contact.lastName,
          amount: `$${order.total}`,
          status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
          date: new Date(order.created_at).toLocaleDateString()
        }));
        setRecentOrders(recent);

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
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-orange-500 mb-4"></i>
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
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back, Admin!</h1>
            <p className="text-orange-100 text-lg">Here's what's happening with your store today.</p>
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
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 hover:shadow-md transition-all duration-300">
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
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-orange-100 bg-orange-50">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <p className="text-gray-600 text-sm mt-1">Latest orders from your bakery</p>
          </div>
          <div className="divide-y divide-orange-100">
            {recentOrders.map((order) => (
              <div key={order.id} className="px-6 py-4 hover:bg-orange-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{order.amount}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">{order.date}</p>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-orange-100 bg-orange-50">
            <button className="text-orange-600 hover:text-orange-800 font-semibold text-sm transition-colors duration-200 flex items-center gap-2">
              View all orders
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-orange-100 bg-orange-50">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <p className="text-gray-600 text-sm mt-1">Manage your bakery operations</p>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <button className="bg-orange-500 text-white p-4 rounded-xl hover:bg-orange-600 transition-colors duration-200 flex flex-col items-center gap-2">
              <i className="fas fa-plus text-xl"></i>
              <span className="font-semibold">New Order</span>
            </button>
            <button className="bg-amber-500 text-white p-4 rounded-xl hover:bg-amber-600 transition-colors duration-200 flex flex-col items-center gap-2">
              <i className="fas fa-utensils text-xl"></i>
              <span className="font-semibold">Menu Items</span>
            </button>
            <button className="bg-green-500 text-white p-4 rounded-xl hover:bg-green-600 transition-colors duration-200 flex flex-col items-center gap-2">
              <i className="fas fa-chart-bar text-xl"></i>
              <span className="font-semibold">Reports</span>
            </button>
            <button className="bg-blue-500 text-white p-4 rounded-xl hover:bg-blue-600 transition-colors duration-200 flex flex-col items-center gap-2">
              <i className="fas fa-cog text-xl"></i>
              <span className="font-semibold">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;