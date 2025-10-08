

// // pages/Orders.js
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAdminOrders } from '../api';

// const Orders = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [dateFilter, setDateFilter] = useState('all');
//   const [showDateDropdown, setShowDateDropdown] = useState(false);
//   const [customStartDate, setCustomStartDate] = useState('');
//   const [customEndDate, setCustomEndDate] = useState('');
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const dropdownRef = useRef(null);

//   const getStatusColor = (status) => {
//     const colors = {
//       completed: 'bg-green-100 text-green-800 border-green-200',
//       processing: 'bg-blue-100 text-blue-800 border-blue-200',
//       pending: 'bg-amber-100 text-amber-800 border-amber-200',
//       cancelled: 'bg-red-100 text-red-800 border-red-200'
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
//   };

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const data = await getAdminOrders();
//         setOrders(data.data); // Use data.data array from API response
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDateDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const getDateRange = (range) => {
//     const now = new Date();
//     const start = new Date();
    
//     switch (range) {
//       case 'today':
//         start.setHours(0, 0, 0, 0);
//         return { start: start, end: new Date(now) };
      
//       case 'yesterday':
//         start.setDate(now.getDate() - 1);
//         start.setHours(0, 0, 0, 0);
//         const yesterdayEnd = new Date(start);
//         yesterdayEnd.setHours(23, 59, 59, 999);
//         return { start: start, end: yesterdayEnd };
      
//       case 'last7days':
//         start.setDate(now.getDate() - 7);
//         start.setHours(0, 0, 0, 0);
//         return { start: start, end: new Date(now) };
      
//       case 'currentMonth':
//         start.setDate(1);
//         start.setHours(0, 0, 0, 0);
//         const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
//         endOfMonth.setHours(23, 59, 59, 999);
//         return { start: start, end: endOfMonth };
      
//       case 'lastMonth':
//         const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
//         lastMonthStart.setHours(0, 0, 0, 0);
//         const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
//         lastMonthEnd.setHours(23, 59, 59, 999);
//         return { start: lastMonthStart, end: lastMonthEnd };
      
//       case 'custom':
//         if (customStartDate && customEndDate) {
//           const customStart = new Date(customStartDate);
//           customStart.setHours(0, 0, 0, 0);
//           const customEnd = new Date(customEndDate);
//           customEnd.setHours(23, 59, 59, 999);
//           return { start: customStart, end: customEnd };
//         }
//         return null;
      
//       default:
//         return null;
//     }
//   };

//   const filteredOrders = orders.filter(order => {
//     const customerName = order.form_data?.contact?.firstName + ' ' + order.form_data?.contact?.lastName || '';
//     const orderNumber = order.order_number || '';
//     const matchesSearch = customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
//     // Date filtering
//     if (dateFilter !== 'all') {
//       const dateRange = getDateRange(dateFilter);
//       if (dateRange) {
//         const orderDate = new Date(order.created_at);
//         const matchesDate = orderDate >= dateRange.start && orderDate <= dateRange.end;
//         return matchesSearch && matchesStatus && matchesDate;
//       }
//     }
    
//     return matchesSearch && matchesStatus;
//   });

//   const handleDateFilterSelect = (range) => {
//     if (range === 'custom') {
//       setDateFilter('custom');
//     } else {
//       setDateFilter(range);
//       setShowDateDropdown(false);
//     }
//   };

//   const applyCustomDate = () => {
//     if (customStartDate && customEndDate) {
//       setShowDateDropdown(false);
//     }
//   };

//   const clearDateFilter = () => {
//     setDateFilter('all');
//     setCustomStartDate('');
//     setCustomEndDate('');
//     setShowDateDropdown(false);
//   };

//   const getDateFilterText = () => {
//     const texts = {
//       all: 'All Dates',
//       today: 'Today',
//       yesterday: 'Yesterday',
//       last7days: 'Last 7 Days',
//       currentMonth: 'Current Month',
//       lastMonth: 'Last Month',
//       custom: 'Custom Date'
//     };
//     return texts[dateFilter] || 'All Dates';
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <i className="fas fa-spinner fa-spin text-4xl mb-4" style={{color:"#2e2163"}}></i>
//           <p className="text-gray-600">Loading orders...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
//           <p className="text-gray-600">Error loading orders: {error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="rounded-3xl shadow-lg p-8 text-white" style={{backgroundColor:"#2e2163"}}>
//         <div className="flex  justify-between cta-mobile-flex">
//           <div style={{textAlign:"left"}}>
//             <h1 className="text-2xl font-bold mb-2">Orders Management</h1>
//             <p className=" text-lg">Manage and track all customer orders</p>
//           </div>
//           <button className=" px-6 py-3 rounded-xl font-semibold " style={{backgroundColor:"#ffffff", color:"#2e2163", display:"none"}} >
//             <i className="fas fa-plus mr-2"></i>
//             New Order
//           </button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className=" rounded-2xl shadow-sm ">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
//               <input 
//                 style={{border:"1px solid #2e2163"}}
//                 type="text"
//                 placeholder="Search orders..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border rounded-xl  transition-all duration-200"
//               />
//             </div>
//           </div>
          
//           {/* Date Filter Dropdown */}
//           <div className="relative" ref={dropdownRef}>
//             <button
//               style={{border:"1px solid #2e2163"}}
//               onClick={() => setShowDateDropdown(!showDateDropdown)}
//               className="px-4 py-3 border rounded-xl  transition-all duration-200 flex items-center justify-between gap-2 w-full md:w-auto"
//             >
//               <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
//                 <i className="fas fa-calendar text-gray-600"></i>
//               <span>{getDateFilterText()}</span>
//               </div>
//               <i className={`fas fa-chevron-down text-gray-600 transition-transform duration-200 ${showDateDropdown ? 'rotate-180' : ''}`}></i>
//             </button>
            
//             {showDateDropdown && (
//               <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
//                 <div className="p-2">
//                   {['today', 'yesterday', 'last7days', 'currentMonth', 'lastMonth'].map((option) => (
//                     <button
//                       key={option}
//                       onClick={() => handleDateFilterSelect(option)}
//                       className={`w-full text-left px-4 py-2 rounded-lg  transition-colors duration-200 ${
//                         dateFilter === option ? ' text-700' : 'text-gray-700'
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <i className={`fas fa-${
//                           option === 'today' ? 'sun' :
//                           option === 'yesterday' ? 'clock' :
//                           option === 'last7days' ? 'calendar-week' :
//                           option === 'currentMonth' ? 'calendar' : 'calendar-minus'
//                         } text-gray-400 w-5`}></i>
//                         <span>
//                           {option === 'today' ? 'Today' :
//                            option === 'yesterday' ? 'Yesterday' :
//                            option === 'last7days' ? 'Last 7 Days' :
//                            option === 'currentMonth' ? 'Current Month' : 'Last Month'}
//                         </span>
//                       </div>
//                     </button>
//                   ))}
                  
//                   {/* Custom Date Range */}
//                   <div className="border-t border-gray-200 mt-2 pt-2">
//                     <button
//                       onClick={() => handleDateFilterSelect('custom')}
//                       className={`w-full text-left px-4 py-2 rounded-lg  transition-colors duration-200 ${
//                         dateFilter === 'custom' ? '' : 'text-gray-700'
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <i className="fas fa-calendar-alt text-gray-400 w-5"></i>
//                         <span>Custom Date</span>
//                       </div>
//                     </button>
                    
//                     {dateFilter === 'custom' && (
//                       <div className="px-4 py-3 bg-gray-50 rounded-lg mt-2 space-y-3">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                           <input
//                             type="date"
//                             value={customStartDate}
//                             onChange={(e) => setCustomStartDate(e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg "
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//                           <input
//                             type="date"
//                             value={customEndDate}
//                             onChange={(e) => setCustomEndDate(e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 "
//                           />
//                         </div>
//                         <div className="flex gap-2">
//                           <button style={{backgroundColor:"#291e5a"}}
//                             onClick={applyCustomDate}
//                             disabled={!customStartDate || !customEndDate}
//                             className="flex-1 text-white py-2 px-3 rounded-lg font-medium  disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//                           >
//                             Apply
//                           </button>
//                           <button
//                             onClick={clearDateFilter}
//                             className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
//                           >
//                             Clear
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

        
//           <div className="relative inline-flex items-center" style={{border:"1px solid ##291e5a"}}>
//               {/* Icon */}
//               <i style={{fontSize:"20px"}} class="fa absolute left-3 text-gray-600 pointer-events-none">&#xf0ae;</i>
//           {/* Dropdown */}
//               <select style={{ border: "1px solid #2e2163" }}
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="appearance-none pl-9 pr-8 py-3  rounded-xl text-gray-700 w-full md:w-auto cursor-pointer border-blue"
//   >
//     <option value="all">All Status</option>
//     <option value="pending">Pending</option>
//     <option value="processing">Processing</option>
//     <option value="completed">Completed</option>
//   </select>

//   {/* Dropdown arrow */}
//   <i className="fas fa-chevron-down absolute right-3 text-gray-600 pointer-events-none"></i>
// </div>


//         </div>
//       </div>

//       {/* Orders Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         {filteredOrders.map((order) => (
//           <div key={order.id} className="bg-white rounded-2xl shadow-sm ">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-4" style={{textAlign:"left"}}>
//                 {/* <div>
//                   <h3 className="text-lg font-bold text-gray-900" style={{display:"none"}}>{order.order_number}</h3>
//                   <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
//                 </div> */}
//                 <div>
//                   <p className="font-semibold text-gray-900">{order.form_data?.contact?.firstName} {order.form_data?.contact?.lastName}</p>
//                   <p className="text-sm text-gray-500">{order.form_data?.contact?.email}</p>
//                 </div>
//                 <span style={{backgroundColor:"#ffc729"}} className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
//                   {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                 </span>
//               </div>

//               <div className="space-y-3" style={{textAlign:"left"}}>
//                 {/* <div>
//                   <p className="font-semibold text-gray-900">{order.form_data?.contact?.firstName} {order.form_data?.contact?.lastName}</p>
//                   <p className="text-sm text-gray-500">{order.form_data?.contact?.email}</p>
//                 </div> */}
                
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-2xl font-bold text-gray-900">${order.total}</p>
//                     <p className="text-sm text-gray-500">{order.items ? order.items.length : 0} items</p>
//                   </div>
//                 </div>
//                   <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
//                 <div className="flex flex-wrap gap-1">
//                   {order.items && order.items.map((item, index) => (
//                     <span key={index} className=" px-2 py-1 rounded-lg text-xs font-medium">
//                       {item}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-6 flex items-center justify-between">
//                 <button style={{backgroundColor:"#2e2163"}}
//                   onClick={() => navigate(`/orders/${order.id}`)}
//                   className="text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
//                 >
//                   <i className="fas fa-eye"></i>
//                   View Details
//                 </button>
//                 <div className="flex items-center gap-2" style={{display:"none"}}>
//                   <button className="p-2 text-gray-400  transition-colors duration-200">
//                     <i className="fas fa-edit"></i>
//                   </button>
//                   <button className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200">
//                     <i className="fas fa-trash"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredOrders.length === 0 && (
//         <div className="bg-white rounded-2xl shadow-sm border  p-12 text-center">
//           <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
//           <p className="text-gray-500">Try adjusting your search or filter criteria</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;















// pages/Orders.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminOrders } from '../api';

const Orders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dropdownRef = useRef(null);

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      paid: 'bg-green-100 text-green-800 border-green-200',
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
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    // Date filtering
    if (dateFilter !== 'all') {
      const dateRange = getDateRange(dateFilter);
      if (dateRange) {
        const orderDate = new Date(order.created_at);
        const matchesDate = orderDate >= dateRange.start && orderDate <= dateRange.end;
        return matchesSearch && matchesStatus && matchesDate;
      }
    }
    
    return matchesSearch && matchesStatus;
  });

  const handleDateFilterSelect = (range) => {
    if (range === 'custom') {
      setDateFilter('custom');
    } else {
      setDateFilter(range);
      setShowDateDropdown(false);
    }
  };

  const applyCustomDate = () => {
    if (customStartDate && customEndDate) {
      setShowDateDropdown(false);
    }
  };

  const clearDateFilter = () => {
    setDateFilter('all');
    setCustomStartDate('');
    setCustomEndDate('');
    setShowDateDropdown(false);
  };

  const getDateFilterText = () => {
    const texts = {
      all: 'All Dates',
      today: 'Today',
      yesterday: 'Yesterday',
      last7days: 'Last 7 Days',
      currentMonth: 'Current Month',
      lastMonth: 'Last Month',
      custom: 'Custom Date'
    };
    return texts[dateFilter] || 'All Dates';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl mb-4" style={{color:"#2e2163"}}></i>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
          <p className="text-gray-600">Error loading orders: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl shadow-lg p-8 text-white" style={{backgroundColor:"#2e2163"}}>
        <div className="flex justify-between cta-mobile-flex">
          <div style={{textAlign:"left"}}>
            <h1 className="text-2xl font-bold mb-2">Orders Overview</h1>
            <p className="text-lg">Track customer payments and order status in one place</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input 
                style={{border:"1px solid #2e2163"}}
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200"
              />
            </div>
          </div>

          {/* Date Filter */}
          <div className="relative" ref={dropdownRef}>
            <button
              style={{ border: "1px solid #2e2163" }}
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center justify-between w-full md:w-48 px-4 py-3 rounded-xl text-gray-700 bg-white"
            >
              <span>{getDateFilterText()}</span>
              <i className={`fas fa-chevron-${showDateDropdown ? 'up' : 'down'} ml-2`}></i>
            </button>

            {showDateDropdown && (
              <div className="absolute top-full left-0 mt-1 w-full md:w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                <div className="p-2">
                  <button
                    onClick={() => handleDateFilterSelect('today')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => handleDateFilterSelect('yesterday')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    Yesterday
                  </button>
                  <button
                    onClick={() => handleDateFilterSelect('last7days')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    Last 7 Days
                  </button>
                  <button
                    onClick={() => handleDateFilterSelect('currentMonth')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    Current Month
                  </button>
                  <button
                    onClick={() => handleDateFilterSelect('lastMonth')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    Last Month
                  </button>
                  
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <button
                      onClick={() => handleDateFilterSelect('custom')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                    >
                      Custom Date
                    </button>
                    
                    {dateFilter === 'custom' && (
                      <div className="p-3 bg-gray-50 rounded-lg mt-2">
                        <div className="space-y-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                              type="date"
                              value={customStartDate}
                              onChange={(e) => setCustomStartDate(e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <input
                              type="date"
                              value={customEndDate}
                              onChange={(e) => setCustomEndDate(e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={applyCustomDate}
                              className="flex-1 bg-purple-600 text-white py-1 px-3 rounded text-sm hover:bg-purple-700"
                            >
                              Apply
                            </button>
                            <button
                              onClick={clearDateFilter}
                              className="flex-1 bg-gray-300 text-gray-700 py-1 px-3 rounded text-sm hover:bg-gray-400"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="relative inline-flex items-center">
            <i style={{fontSize:"20px"}} className="fa absolute left-3 text-gray-600 pointer-events-none">&#xf0ae;</i>
            <select
              style={{ border: "1px solid #2e2163" }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-9 pr-8 py-3 rounded-xl text-gray-700 w-full md:w-auto cursor-pointer"
            >
              <option value="all">Status</option>
              <option value="pending">Pending</option>
              {/* <option value="processing">Processing</option>
              <option value="completed">Completed</option> */}
              <option value="paid">Paid</option>
              {/* <option value="cancelled">Cancelled</option> */}
            </select>
            <i className="fas fa-chevron-down absolute right-3 text-gray-600 pointer-events-none"></i>
          </div>

          {/* Additional Status Filter for Search Bar */}
          <div className="relative inline-flex items-center">
            <i style={{fontSize:"20px"}} className="fa absolute left-3 text-gray-600 pointer-events-none">&#xf023;</i>
            <select
              style={{ border: "1px solid #2e2163" }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-9 pr-8 py-3 rounded-xl text-gray-700 w-full md:w-auto cursor-pointer"
            >
              <option value="all">Orders Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              {/* <option value="paid">Paid</option> */}
              <option value="cancelled">Cancelled</option>
            </select>
            <i className="fas fa-chevron-down absolute right-3 text-gray-600 pointer-events-none"></i>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.map((order) => {
          const paymentStatus =
            order.payment_status === 'paid' ? 'paid' :
            order.payment_status === 'processing' ? 'processing' :
            order.status || 'pending';

          return (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4" style={{textAlign:"left"}}>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {order.form_data?.contact?.firstName} {order.form_data?.contact?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{order.form_data?.contact?.email}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(paymentStatus)}`}
                  >
                    {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
                  </span>
                </div>

                <div className="space-y-3" style={{textAlign:"left"}}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">${order.total}</p>
                      <p className="text-sm text-gray-500">{order.items ? order.items.length : 0} items</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    style={{ backgroundColor: "#2e2163" }}
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                  >
                    <i className="fas fa-eye"></i>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
          <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Orders;