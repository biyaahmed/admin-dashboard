// // components/Orders.js
// import React, { useState, useEffect } from 'react';

// const Orders = ({ setCurrentView, setSelectedOrderId }) => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     status: '',
//     search: '',
//     start_date: '',
//     end_date: ''
//   });
//   const [pagination, setPagination] = useState({});

//   // Mock data function (renamed to not start with "use")
//   const getMockData = () => {
//     return [
//       {
//         id: 15,
//         order_number: "fcf2249b-a721-43b6-9cc8-f10c10b1843f",
//         status: "paid",
//         total: "1396.00",
//         created_at: "2025-10-03T13:35:05.000000Z",
//         form_data: {
//           companyName: "Esse sit sed minus e",
//           contact: {
//             firstName: "Sed distinctio Pari",
//             lastName: "Pariatur Corrupti",
//             email: "Necessitatibus conse",
//             phone: "Sunt reiciendis omn"
//           }
//         }
//       },
//       {
//         id: 2,
//         order_number: "5d638080-284b-48f4-92e8-25a4c545f9c4",
//         status: "pending",
//         total: "1432.00",
//         created_at: "2025-10-03T11:56:39.000000Z",
//         form_data: {
//           companyName: "deded",
//           contact: {
//             firstName: "Sint ea voluptas qua",
//             lastName: "Accusamus et dolores",
//             email: "Nam iste quod quibus",
//             phone: "Aliquam est exceptur"
//           }
//         }
//       },
//       {
//         id: 1,
//         order_number: "20ae5dd1-1aa2-41cb-a24e-d9d05c59d323",
//         status: "pending",
//         total: "1432.00",
//         created_at: "2025-10-03T11:56:15.000000Z",
//         form_data: {
//           companyName: "deded",
//           contact: {
//             firstName: "Sint ea voluptas qua",
//             lastName: "Accusamus et dolores",
//             email: "Nam iste quod quibus",
//             phone: "Aliquam est exceptur"
//           }
//         }
//       }
//     ];
//   };

//   const fetchOrders = async (page = 1) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('admin_token');
//       const params = new URLSearchParams({
//         page: page,
//         per_page: 15,
//         ...filters
//       });

//       // Try to fetch from API
//       const response = await fetch(`https://ordersbackend.breadsquared.com/api/admin/orders?${params}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Accept': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setOrders(data.data);
//         setPagination({
//           current_page: data.current_page,
//           last_page: data.last_page,
//           total: data.total,
//           from: data.from,
//           to: data.to
//         });
//       } else {
//         // Use mock data if API fails
//         const mockOrders = getMockData();
//         setOrders(mockOrders);
//         setPagination({
//           current_page: 1,
//           last_page: 1,
//           total: mockOrders.length,
//           from: 1,
//           to: mockOrders.length
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       // Use mock data on error
//       const mockOrders = getMockData();
//       setOrders(mockOrders);
//       setPagination({
//         current_page: 1,
//         last_page: 1,
//         total: mockOrders.length,
//         from: 1,
//         to: mockOrders.length
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [filters]);

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getStatusBadge = (status) => {
//     const statusColors = {
//       paid: 'bg-green-100 text-green-800',
//       pending: 'bg-yellow-100 text-yellow-800',
//       failed: 'bg-red-100 text-red-800',
//       cancelled: 'bg-gray-100 text-gray-800'
//     };
    
//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100'}`}>
//         {status.toUpperCase()}
//       </span>
//     );
//   };

//   const handleViewDetails = (orderId) => {
//     setSelectedOrderId(orderId);
//     setCurrentView('order-details');
//   };

//   return (
//     <div className="container mx-auto px-4">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
//         <p className="text-gray-600">Manage and view all customer orders</p>
//       </div>

//       {/* Filters */}
//       <div className="bg-white p-4 rounded-lg shadow mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
//             <input
//               type="text"
//               placeholder="Order # or Email"
//               value={filters.search}
//               onChange={(e) => handleFilterChange('search', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//             <select
//               value={filters.status}
//               onChange={(e) => handleFilterChange('status', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Status</option>
//               <option value="paid">Paid</option>
//               <option value="pending">Pending</option>
//               <option value="failed">Failed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//             <input
//               type="date"
//               value={filters.start_date}
//               onChange={(e) => handleFilterChange('start_date', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//             <input
//               type="date"
//               value={filters.end_date}
//               onChange={(e) => handleFilterChange('end_date', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         {loading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           </div>
//         ) : (
//           <>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Order #
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Customer
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Company
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Amount
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {orders.map((order) => (
//                     <tr key={order.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {order.order_number}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <div>
//                           {order.form_data.contact.firstName} {order.form_data.contact.lastName}
//                         </div>
//                         <div className="text-gray-400">{order.form_data.contact.email}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {order.form_data.companyName}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         ${parseFloat(order.total).toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {getStatusBadge(order.status)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {formatDate(order.created_at)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <button
//                           onClick={() => handleViewDetails(order.id)}
//                           className="text-blue-600 hover:text-blue-900"
//                         >
//                           View Details
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {pagination.last_page > 1 && (
//               <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//                 <div className="flex-1 flex justify-between items-center">
//                   <div>
//                     <p className="text-sm text-gray-700">
//                       Showing <span className="font-medium">{pagination.from}</span> to{' '}
//                       <span className="font-medium">{pagination.to}</span> of{' '}
//                       <span className="font-medium">{pagination.total}</span> results
//                     </p>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => fetchOrders(pagination.current_page - 1)}
//                       disabled={pagination.current_page === 1}
//                       className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
//                     >
//                       Previous
//                     </button>
//                     <button
//                       onClick={() => fetchOrders(pagination.current_page + 1)}
//                       disabled={pagination.current_page === pagination.last_page}
//                       className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;







// components/Orders.js
import React, { useState, useEffect } from 'react';

const Orders = ({ setCurrentView, setSelectedOrderId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    start_date: '',
    end_date: ''
  });
  const [pagination, setPagination] = useState({});

  // Mock data function
  const getMockData = () => {
    return [
      {
        id: 15,
        order_number: "fcf2249b-a721-43b6-9cc8-f10c10b1843f",
        status: "paid",
        total: "1396.00",
        created_at: "2025-10-03T13:35:05.000000Z",
        form_data: {
          companyName: "Esse sit sed minus e",
          contact: {
            firstName: "Sed distinctio Pari",
            lastName: "Pariatur Corrupti",
            email: "Necessitatibus conse",
            phone: "Sunt reiciendis omn"
          }
        }
      },
      {
        id: 2,
        order_number: "5d638080-284b-48f4-92e8-25a4c545f9c4",
        status: "pending",
        total: "1432.00",
        created_at: "2025-10-03T11:56:39.000000Z",
        form_data: {
          companyName: "deded",
          contact: {
            firstName: "Sint ea voluptas qua",
            lastName: "Accusamus et dolores",
            email: "Nam iste quod quibus",
            phone: "Aliquam est exceptur"
          }
        }
      },
      {
        id: 1,
        order_number: "20ae5dd1-1aa2-41cb-a24e-d9d05c59d323",
        status: "pending",
        total: "1432.00",
        created_at: "2025-10-03T11:56:15.000000Z",
        form_data: {
          companyName: "deded",
          contact: {
            firstName: "Sint ea voluptas qua",
            lastName: "Accusamus et dolores",
            email: "Nam iste quod quibus",
            phone: "Aliquam est exceptur"
          }
        }
      }
    ];
  };

  const fetchOrders = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const params = new URLSearchParams({
        page: page,
        per_page: 15,
        ...filters
      });

      // Try to fetch from API
      const response = await fetch(`https://ordersbackend.breadsquared.com/api/admin/orders?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.data);
        setPagination({
          current_page: data.current_page,
          last_page: data.last_page,
          total: data.total,
          from: data.from,
          to: data.to
        });
      } else {
        // Use mock data if API fails
        const mockOrders = getMockData();
        setOrders(mockOrders);
        setPagination({
          current_page: 1,
          last_page: 1,
          total: mockOrders.length,
          from: 1,
          to: mockOrders.length
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Use mock data on error
      const mockOrders = getMockData();
      setOrders(mockOrders);
      setPagination({
        current_page: 1,
        last_page: 1,
        total: mockOrders.length,
        from: 1,
        to: mockOrders.length
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      paid: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      pending: 'bg-amber-100 text-amber-800 border border-amber-200',
      failed: 'bg-rose-100 text-rose-800 border border-rose-200',
      cancelled: 'bg-slate-100 text-slate-600 border border-slate-200'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status] || 'bg-slate-100'}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const handleViewDetails = (orderId) => {
    setSelectedOrderId(orderId);
    setCurrentView('order-details');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
            <p className="text-slate-600 mt-2">Manage and monitor all customer orders</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm text-slate-500">Total Orders</p>
              <p className="text-2xl font-bold text-slate-900">{pagination.total || orders.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Filters & Search</h2>
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Advanced Filtering</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Search Orders</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Order #, Email, or Name"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-slate-900 placeholder-slate-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Order Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-slate-900 appearance-none"
            >
              <option value="">All Statuses</option>
              <option value="paid" className="text-emerald-600">Paid</option>
              <option value="pending" className="text-amber-600">Pending</option>
              <option value="failed" className="text-rose-600">Failed</option>
              <option value="cancelled" className="text-slate-600">Cancelled</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">From Date</label>
            <input
              type="date"
              value={filters.start_date}
              onChange={(e) => handleFilterChange('start_date', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-slate-900"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">To Date</label>
            <input
              type="date"
              value={filters.end_date}
              onChange={(e) => handleFilterChange('end_date', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-slate-900"
            />
          </div>
        </div>
        
        {/* Quick Status Filters */}
        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-100">
          <button
            onClick={() => handleFilterChange('status', '')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filters.status === '' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => handleFilterChange('status', 'paid')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filters.status === 'paid' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Paid
          </button>
          <button
            onClick={() => handleFilterChange('status', 'pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filters.status === 'pending' 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => handleFilterChange('status', 'failed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filters.status === 'failed' 
                ? 'bg-rose-600 text-white shadow-sm' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Failed
          </button>
        </div>
      </div>

      {/* Orders Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Order List</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">
                Showing {pagination.from || 1}-{pagination.to || orders.length} of {pagination.total || orders.length} orders
              </span>
              <button 
                onClick={() => fetchOrders()}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-slate-600">Loading orders...</p>
          </div>
        ) : (
          <>
            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Order Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {orders.map((order) => (
                    <tr 
                      key={order.id} 
                      className="hover:bg-slate-50 transition-colors duration-150 group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {order.order_number}
                            </div>
                            <div className="text-xs text-slate-500">ID: {order.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">
                          {order.form_data.contact.firstName} {order.form_data.contact.lastName}
                        </div>
                        <div className="text-sm text-slate-500">{order.form_data.contact.email}</div>
                        <div className="text-xs text-slate-400">{order.form_data.contact.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900 font-medium">
                          {order.form_data.companyName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-bold text-slate-900">
                          ${parseFloat(order.total).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900 font-medium">
                          {formatDate(order.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleViewDetails(order.id)}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {orders.length === 0 && !loading && (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-lg font-medium text-slate-900 mb-2">No orders found</h3>
                <p className="text-slate-600 mb-4">Try adjusting your filters or search criteria</p>
                <button
                  onClick={() => setFilters({ status: '', search: '', start_date: '', end_date: '' })}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {pagination.last_page > 1 && (
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-700">
                      Showing <span className="font-medium">{pagination.from}</span> to{' '}
                      <span className="font-medium">{pagination.to}</span> of{' '}
                      <span className="font-medium">{pagination.total}</span> results
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => fetchOrders(pagination.current_page - 1)}
                      disabled={pagination.current_page === 1}
                      className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => fetchOrders(pagination.current_page + 1)}
                      disabled={pagination.current_page === pagination.last_page}
                      className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;