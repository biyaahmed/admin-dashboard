// pages/Orders.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    { id: 1, orderId: '#ORD-001', customer: 'John Doe', email: 'john@example.com', amount: '$120.00', status: 'completed', date: '2024-01-15', items: ['Sourdough', 'Baguette'] },
    { id: 2, orderId: '#ORD-002', customer: 'Jane Smith', email: 'jane@example.com', amount: '$89.50', status: 'processing', date: '2024-01-15', items: ['Croissant'] },
    { id: 3, orderId: '#ORD-003', customer: 'Mike Johnson', email: 'mike@example.com', amount: '$245.75', status: 'completed', date: '2024-01-14', items: ['Sourdough', 'Baguette', 'Cinnamon Roll'] },
    { id: 4, orderId: '#ORD-004', customer: 'Sarah Wilson', email: 'sarah@example.com', amount: '$67.25', status: 'pending', date: '2024-01-14', items: ['Baguette'] }
  ];

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Orders Management</h1>
            <p className="text-orange-100 text-lg">Manage and track all customer orders</p>
          </div>
          <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-200">
            <i className="fas fa-plus mr-2"></i>
            New Order
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-orange-100 hover:shadow-md transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{order.orderId}</h3>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-900">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.email}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{order.amount}</p>
                    <p className="text-sm text-gray-500">{order.items.length} items</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {order.items.map((item, index) => (
                    <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-lg text-xs font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => navigate(`/orders/${order.id}`)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <i className="fas fa-eye"></i>
                  View Details
                </button>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors duration-200">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-12 text-center">
          <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Orders;