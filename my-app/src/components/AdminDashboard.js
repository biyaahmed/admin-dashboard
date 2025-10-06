// // components/AdminDashboard.js
// import React, { useState, useEffect } from 'react';

// const AdminDashboard = ({ setCurrentView }) => {
//   const [stats, setStats] = useState({
//     total_orders: 0,
//     paid_orders: 0,
//     pending_orders: 0,
//     total_revenue: 0
//   });
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const token = localStorage.getItem('admin_token');
      
//       // Fetch stats
//       const statsResponse = await fetch('http://127.0.0.1:8000/api/admin/stats', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Accept': 'application/json',
//         },
//       });

//       // Fetch recent orders
//       const ordersResponse = await fetch('https://ordersbackend.breadsquared.com/api/admin/orders?per_page=5', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Accept': 'application/json',
//         },
//       });

//       if (statsResponse.ok && ordersResponse.ok) {
//         const statsData = await statsResponse.json();
//         const ordersData = await ordersResponse.json();
        
//         setStats(statsData);
//         setRecentOrders(ordersData.data);
//       } else {
//         // Use mock data for testing
//         setStats({
//           total_orders: 15,
//           paid_orders: 8,
//           pending_orders: 7,
//           total_revenue: 18950.00
//         });
//         setRecentOrders([
//           {
//             id: 15,
//             order_number: "fcf2249b-a721-43b6-9cc8-f10c10b1843f",
//             status: "paid",
//             total: "1396.00",
//             created_at: "2025-10-03T13:35:05.000000Z",
//             form_data: {
//               contact: {
//                 firstName: "Sed distinctio Pari",
//                 lastName: "Pariatur Corrupti",
//                 email: "Necessitatibus conse"
//               }
//             }
//           },
//           {
//             id: 2,
//             order_number: "5d638080-284b-48f4-92e8-25a4c545f9c4",
//             status: "pending",
//             total: "1432.00",
//             created_at: "2025-10-03T11:56:39.000000Z",
//             form_data: {
//               contact: {
//                 firstName: "Sint ea voluptas qua",
//                 lastName: "Accusamus et dolores",
//                 email: "Nam iste quod quibus"
//               }
//             }
//           }
//         ]);
//       }
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       // Use mock data on error
//       setStats({
//         total_orders: 15,
//         paid_orders: 8,
//         pending_orders: 7,
//         total_revenue: 18950.00
//       });
//       setRecentOrders([
//         {
//           id: 15,
//           order_number: "fcf2249b-a721-43b6-9cc8-f10c10b1843f",
//           status: "paid",
//           total: "1396.00",
//           created_at: "2025-10-03T13:35:05.000000Z",
//           form_data: {
//             contact: {
//               firstName: "Sed distinctio Pari",
//               lastName: "Pariatur Corrupti",
//               email: "Necessitatibus conse"
//             }
//           }
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const StatCard = ({ title, value, subtitle, color }) => (
//     <div className="bg-white rounded-lg shadow p-6">
//       <div className="flex items-center">
//         <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
//           <div className={`w-6 h-6 ${color}`}></div>
//         </div>
//         <div className="ml-4">
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <p className="text-2xl font-semibold text-gray-900">{value}</p>
//           {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
//         </div>
//       </div>
//     </div>
//   );

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

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
//         <p className="text-gray-600">Welcome to your admin dashboard</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard
//           title="Total Orders"
//           value={stats.total_orders}
//           color="text-blue-600"
//         />
//         <StatCard
//           title="Paid Orders"
//           value={stats.paid_orders}
//           color="text-green-600"
//         />
//         <StatCard
//           title="Pending Orders"
//           value={stats.pending_orders}
//           color="text-yellow-600"
//         />
//         <StatCard
//           title="Total Revenue"
//           value={`$${parseFloat(stats.total_revenue).toFixed(2)}`}
//           color="text-purple-600"
//         />
//       </div>

//       {/* Recent Orders */}
//       <div className="bg-white rounded-lg shadow">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
//             <button 
//               onClick={() => setCurrentView('orders')}
//               className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//             >
//               View All Orders
//             </button>
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Order #
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Customer
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {recentOrders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {order.order_number.substring(0, 8)}...
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {order.form_data.contact.firstName} {order.form_data.contact.lastName}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     ${parseFloat(order.total).toFixed(2)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {getStatusBadge(order.status)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(order.created_at).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;





// components/AdminDashboard.js
import React, { useState, useEffect } from 'react';

const AdminDashboard = ({ setCurrentView }) => {
  const [stats, setStats] = useState({
    total_orders: 0,
    paid_orders: 0,
    pending_orders: 0,
    total_revenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      
      // Fetch stats
      const statsResponse = await fetch('http://127.0.0.1:8000/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      // Fetch recent orders
      const ordersResponse = await fetch('https://ordersbackend.breadsquared.com/api/admin/orders?per_page=5', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (statsResponse.ok && ordersResponse.ok) {
        const statsData = await statsResponse.json();
        const ordersData = await ordersResponse.json();
        
        setStats(statsData);
        setRecentOrders(ordersData.data);
      } else {
        // Use mock data for testing
        setStats({
          total_orders: 15,
          paid_orders: 8,
          pending_orders: 7,
          total_revenue: 18950.00
        });
        setRecentOrders([
          {
            id: 15,
            order_number: "fcf2249b-a721-43b6-9cc8-f10c10b1843f",
            status: "paid",
            total: "1396.00",
            created_at: "2025-10-03T13:35:05.000000Z",
            form_data: {
              contact: {
                firstName: "Sed distinctio Pari",
                lastName: "Pariatur Corrupti",
                email: "Necessitatibus conse"
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
              contact: {
                firstName: "Sint ea voluptas qua",
                lastName: "Accusamus et dolores",
                email: "Nam iste quod quibus"
              }
            }
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Use mock data on error
      setStats({
        total_orders: 15,
        paid_orders: 8,
        pending_orders: 7,
        total_revenue: 18950.00
      });
      setRecentOrders([
        {
          id: 15,
          order_number: "fcf2249b-a721-43b6-9cc8-f10c10b1843f",
          status: "paid",
          total: "1396.00",
          created_at: "2025-10-03T13:35:05.000000Z",
          form_data: {
            contact: {
              firstName: "Sed distinctio Pari",
              lastName: "Pariatur Corrupti",
              email: "Necessitatibus conse"
            }
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, subtitle, color, icon }) => (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: `${color}15` }}>
        <i className={icon} style={{ color: color }}></i>
      </div>
      <div className="stat-content">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
        {subtitle && <p className="stat-subtitle">{subtitle}</p>}
      </div>
    </div>
  );

  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: { color: '#10b981', bgColor: '#10b98115', icon: 'fas fa-check-circle' },
      pending: { color: '#f59e0b', bgColor: '#f59e0b15', icon: 'fas fa-clock' },
      failed: { color: '#ef4444', bgColor: '#ef444415', icon: 'fas fa-times-circle' },
      cancelled: { color: '#6b7280', bgColor: '#6b728015', icon: 'fas fa-ban' }
    };
    
    const config = statusConfig[status] || { color: '#6b7280', bgColor: '#6b728015', icon: 'fas fa-circle' };
    
    return (
      <span className="status-badge" style={{ color: config.color, backgroundColor: config.bgColor }}>
        <i className={config.icon}></i>
        {status.toUpperCase()}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">User's detail</h1>
          <p className="dashboard-subtitle">See user dateil here....</p>
        </div>
        <div className="header-actions">
          <button className="refresh-btn" onClick={fetchDashboardData}>
            <i className="fas fa-sync-alt"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Orders"
          value={stats.total_orders}
          color="#2a1e5d"
          icon="fas fa-shopping-cart"
        />
        <StatCard
          title="Paid Orders"
          value={stats.paid_orders}
          color="#10b981"
          icon="fas fa-check-circle"
        />
        <StatCard
          title="Pending Orders"
          value={stats.pending_orders}
          color="#f59e0b"
          icon="fas fa-clock"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.total_revenue)}
          color="#667eea"
          icon="fas fa-dollar-sign"
        />
      </div>

      {/* Recent Orders */}
      <div className="recent-orders-card">
        <div className="card-header">
          <div className="card-title-section">
            <i className="fas fa-receipt"></i>
            <h2>Recent Orders</h2>
          </div>
          <button 
            onClick={() => setCurrentView('orders')}
            className="view-all-btn"
          >
            View All Orders
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
        
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="order-row">
                  <td className="order-number">
                    {order.order_number.substring(0, 8)}...
                  </td>
                  <td className="customer-name">
                    {order.form_data.contact.firstName} {order.form_data.contact.lastName}
                  </td>
                  <td className="customer-email">
                    {order.form_data.contact.email}
                  </td>
                  <td className="order-amount">
                    {formatCurrency(parseFloat(order.total))}
                  </td>
                  <td className="order-status">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="order-date">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {recentOrders.length === 0 && (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <p>No orders found</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
      header{
      display:none;
      }
      .mt-10{
      display:none;
      }
      .mt-8{
      display:none;
      }
        .admin-dashboard {
          padding: 2rem;
          background: #f8fafc;
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .header-content {
          flex: 1;
        }

        .dashboard-title {
          font-size: 2rem;
          font-weight: 700;
          color: #2a1e5d;
          margin: 0 0 0.5rem 0;
          background: linear-gradient(135deg, #2a1e5d, #667eea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dashboard-subtitle {
          color: #6b7280;
          font-size: 1rem;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .refresh-btn {
          background: #fff;
          border: 2px solid #e5e7eb;
          color: #2a1e5d;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .refresh-btn:hover {
          border-color: #2a1e5d;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(42, 30, 93, 0.1);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: #fff;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #2a1e5d, #667eea);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #2a1e5d;
          margin: 0 0 0.25rem 0;
          line-height: 1;
        }

        .stat-title {
          color: #6b7280;
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-subtitle {
          color: #9ca3af;
          font-size: 0.8rem;
          margin: 0.25rem 0 0 0;
        }

        .recent-orders-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.8);
          overflow: hidden;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .card-title-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .card-title-section i {
          color: #2a1e5d;
          font-size: 1.25rem;
        }

        .card-title-section h2 {
          color: #2a1e5d;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }

        .view-all-btn {
          background: linear-gradient(135deg, #2a1e5d, #667eea);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .view-all-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(42, 30, 93, 0.3);
        }

        .table-container {
          overflow-x: auto;
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
        }

        .orders-table th {
          background: #f8fafc;
          color: #2a1e5d;
          font-weight: 600;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 1rem 1.5rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        .orders-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          color: #374151;
          font-size: 0.9rem;
        }

        .order-row:hover {
          background: #f8fafc;
        }

        .order-number {
          font-family: 'Monaco', 'Consolas', monospace;
          font-weight: 600;
          color: #2a1e5d;
        }

        .customer-name {
          font-weight: 500;
          color: #2a1e5d;
        }

        .customer-email {
          color: #6b7280;
        }

        .order-amount {
          font-weight: 600;
          color: #059669;
        }

        .order-date {
          color: #6b7280;
          white-space: nowrap;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-badge i {
          font-size: 0.7rem;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #6b7280;
        }

        .empty-state i {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-state p {
          margin: 0;
          font-size: 1rem;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          color: #2a1e5d;
        }

        .loading-spinner {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .loading-spinner i {
          animation: fa-spin 1s infinite linear;
        }

        @keyframes fa-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .admin-dashboard {
            padding: 1rem;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }

          .dashboard-header {
          
            flex-direction: column;
            gap: 1rem;
          }

          .header-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .stat-card {
            padding: 1rem;
          }

          .stat-value {
            font-size: 1.5rem;
          }

          .card-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .view-all-btn {
            align-self: stretch;
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .orders-table {
            font-size: 0.8rem;
          }

          .orders-table th,
          .orders-table td {
            padding: 0.75rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;