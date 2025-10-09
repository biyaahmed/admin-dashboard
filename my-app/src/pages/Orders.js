// pages/Orders.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminOrders } from '../api';

const Orders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [workflowStatusFilter, setWorkflowStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dropdownRef = useRef(null);

  const getPaymentStatusColor = (status) => {
    const colors = {
      paid: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getWorkflowStatusColor = (status) => {
    const colors = {
      complete: 'bg-green-100 text-green-800 border-green-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getAdminOrders();
        setOrders(data.data); // Use data.data array from API response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDateDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDateRange = (range) => {
    const now = new Date();
    const start = new Date();
    
    switch (range) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        return { start: start, end: new Date(now) };
      
      case 'yesterday':
        start.setDate(now.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        const yesterdayEnd = new Date(start);
        yesterdayEnd.setHours(23, 59, 59, 999);
        return { start: start, end: yesterdayEnd };
      
      case 'last7days':
        start.setDate(now.getDate() - 7);
        start.setHours(0, 0, 0, 0);
        return { start: start, end: new Date(now) };
      
      case 'currentMonth':
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);
        return { start: start, end: endOfMonth };
      
      case 'lastMonth':
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        lastMonthStart.setHours(0, 0, 0, 0);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        lastMonthEnd.setHours(23, 59, 59, 999);
        return { start: lastMonthStart, end: lastMonthEnd };
      
      case 'custom':
        if (customStartDate && customEndDate) {
          const customStart = new Date(customStartDate);
          customStart.setHours(0, 0, 0, 0);
          const customEnd = new Date(customEndDate);
          customEnd.setHours(23, 59, 59, 999);
          return { start: customStart, end: customEnd };
        }
        return null;
      
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter(order => {
    const customerName = order.form_data?.contact?.firstName + ' ' + order.form_data?.contact?.lastName || '';
    const orderNumber = order.order_number || '';
    const matchesSearch = customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPaymentStatus = paymentStatusFilter === 'all' || order.status === paymentStatusFilter;
    const matchesWorkflowStatus = workflowStatusFilter === 'all' || order.order_status === workflowStatusFilter;
    
    // Date filtering
    if (dateFilter !== 'all') {
      const dateRange = getDateRange(dateFilter);
      if (dateRange) {
        const orderDate = new Date(order.created_at);
        const matchesDate = orderDate >= dateRange.start && orderDate <= dateRange.end;
        return matchesSearch && matchesPaymentStatus && matchesWorkflowStatus && matchesDate;
      }
    }
    
    return matchesSearch && matchesPaymentStatus && matchesWorkflowStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-2">Manage and track all customer orders</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <i style={{fontSize:"20px"}} className="fa absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none">&#xf002;</i>
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ border: "1px solid #2e2163" }}
              />
            </div>

            {/* Payment Status Filter */}
            <div className="relative inline-flex items-center">
              <i style={{fontSize:"20px"}} className="fa absolute left-3 text-gray-600 pointer-events-none">&#xf0ae;</i>
              <select
                style={{ border: "1px solid #2e2163" }}
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                className="appearance-none pl-9 pr-8 py-3 rounded-xl text-gray-700 w-full md:w-auto cursor-pointer"
              >
                <option value="all">Payment Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
              <i className="fas fa-chevron-down absolute right-3 text-gray-600 pointer-events-none"></i>
            </div>

            {/* Workflow Status Filter */}
            <div className="relative inline-flex items-center">
              <i style={{fontSize:"20px"}} className="fa absolute left-3 text-gray-600 pointer-events-none">&#xf023;</i>
              <select
                style={{ border: "1px solid #2e2163" }}
                value={workflowStatusFilter}
                onChange={(e) => setWorkflowStatusFilter(e.target.value)}
                className="appearance-none pl-9 pr-8 py-3 rounded-xl text-gray-700 w-full md:w-auto cursor-pointer"
              >
                <option value="all">Workflow Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="complete">Complete</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <i className="fas fa-chevron-down absolute right-3 text-gray-600 pointer-events-none"></i>
            </div>

            {/* Date Filter */}
            <div className="relative inline-flex items-center" ref={dropdownRef}>
              <i style={{fontSize:"20px"}} className="fa absolute left-3 text-gray-600 pointer-events-none">&#xf073;</i>
              <select
                style={{ border: "1px solid #2e2163" }}
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="appearance-none pl-9 pr-8 py-3 rounded-xl text-gray-700 w-full md:w-auto cursor-pointer"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 Days</option>
                <option value="currentMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="custom">Custom Range</option>
              </select>
              <i className="fas fa-chevron-down absolute right-3 text-gray-600 pointer-events-none"></i>
            </div>
          </div>

          {/* Custom Date Range Inputs */}
          {dateFilter === 'custom' && (
            <div className="mt-4 flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Orders Grid */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && filteredOrders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <i className="fas fa-search text-gray-400 text-4xl mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}

        {!loading && !error && filteredOrders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => {
              const paymentStatus = order.status || 'pending';
              const workflowStatus = order.order_status || 'pending';

              return (
                <div key={order.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
                  <div className="p-5">
                    {/* Customer Info */}
                    <div className="mb-4 text-center">
                      <h3 className="font-semibold text-gray-900 text-lg">{order.form_data?.contact?.firstName} {order.form_data?.contact?.lastName}</h3>
                      <p className="text-sm text-gray-500 truncate">{order.form_data?.contact?.email}</p>
                    </div>

                    {/* Order Number */}
                    <div className="mb-2 text-left text-sm text-gray-600 space-x-1">
                      {/* <span className="font-medium text-gray-500">Order ID:</span>
                      <span className="font-semibold text-gray-900">{order.order_number}</span> */}
                    </div>

                    {/* Order Date */}
                    <div className="mb-1 text-left text-sm text-gray-600">
                      <span className="font-medium text-gray-500">Date:</span>{' '}
                      <span className="font-semibold text-gray-900">{new Date(order.created_at).toLocaleDateString()}</span>
                    </div>

                    {/* Total Amount Label */}
                    {/* <div className="mb-1 text-left text-xs text-gray-500 font-medium">Total Amount</div> */}

                    {/* Amount and Payment Status Labels */}
                    <div className="mb-1 flex items-center gap-4 text-left pt-[5px]">
                      <div className="text-sm font-medium text-gray-500 pt-[3px]">Amount:</div>
                      <div className="text-xl font-bold text-gray-900">${order.total}</div>
                    </div>
                    <div className="mb-1 flex items-center gap-4 text-left pt-[5px]">
                      <div className="text-sm font-medium text-gray-500">Amount Status:</div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border-2 ${
                        paymentStatus === 'paid' ? 'bg-green-100 text-green-800 border-green-300' :
                        'bg-amber-100 text-amber-800 border-amber-300'
                      }`}>
                        {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
                      </div>
                    </div>

                    {/* Workflow Status Label */}
                    {/* <div className="mb-1 text-left text-xs text-gray-500 font-medium">Workflow Status</div> */}

                    {/* Workflow Status */}
                    <div className="mb-4 text-left">
                      <span className="text-sm font-medium text-gray-500">Status:</span>{' '}
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border-2 ${
                          workflowStatus === 'complete' ? 'bg-green-100 text-green-800 border-green-300' :
                          workflowStatus === 'processing' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                          workflowStatus === 'cancelled' ? 'bg-red-100 text-red-800 border-red-300' :
                          'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                      >
                        {workflowStatus.charAt(0).toUpperCase() + workflowStatus.slice(1)}
                      </span>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => navigate(`/orders/${order.id}`)}
                      className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
