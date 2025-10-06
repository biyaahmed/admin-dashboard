
// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

// Import components
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Orders from './components/Orders';
import OrderDetails from './components/OrderDetails';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const adminData = localStorage.getItem('admin_data');
    
    if (token && adminData) {
      setIsAuthenticated(true);
      setAdmin(JSON.parse(adminData));
    }
    setLoading(false);
  }, []);

  const login = (token, adminData) => {
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_data', JSON.stringify(adminData));
    setIsAuthenticated(true);
    setAdmin(adminData);
    setCurrentView('dashboard');
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_data');
    setIsAuthenticated(false);
    setAdmin(null);
    setCurrentView('login');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminDashboard setCurrentView={setCurrentView} />;
      case 'orders':
        return (
          <Orders 
            setCurrentView={setCurrentView} 
            setSelectedOrderId={setSelectedOrderId} 
          />
        );
      case 'order-details':
        return <OrderDetails orderId={selectedOrderId} setCurrentView={setCurrentView} />;
      default:
        return <AdminDashboard setCurrentView={setCurrentView} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <div className="App">
      <SimpleLayout 
        admin={admin} 
        onLogout={logout} 
        currentView={currentView}
        setCurrentView={setCurrentView}
      >
        {renderContent()}
      </SimpleLayout>
    </div>
  );
}

// Simple layout without react-router-dom
const SimpleLayout = ({ children, admin, onLogout, currentView, setCurrentView }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'orders', label: 'Orders', icon: '📦' },
  ];

  const getViewTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Dashboard';
      case 'orders': return 'Orders';
      case 'order-details': return 'Order Details';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-blue-800 text-white transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <span className="text-2xl font-semibold">Admin Panel</span>
          </div>
        </div>

        <nav className="mt-10">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setCurrentView(item.key);
                setSidebarOpen(false);
              }}
              className={`flex items-center px-6 py-3 mt-4 w-full text-left transition-colors duration-300 transform ${
                currentView === item.key
                  ? 'bg-blue-700 bg-opacity-25 border-r-4 border-white'
                  : 'hover:bg-blue-700 hover:bg-opacity-25'
              }`}
            >
              <span className="mx-4">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
          
          <button
            onClick={onLogout}
            className="flex items-center px-6 py-3 mt-4 w-full text-left transition-colors duration-300 transform hover:bg-blue-700 hover:bg-opacity-25"
          >
            <span className="mx-4">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-blue-800">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 focus:outline-none lg:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-800 ml-4 lg:ml-0">
              {getViewTitle()}
            </h1>
          </div>

          <div className="flex items-center">
            <span className="text-gray-700 mr-4">Welcome, {admin?.name || 'Admin'}</span>
            <div className="relative">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={`https://ui-avatars.com/api/?name=${admin?.name || 'Admin'}&background=0D8ABC&color=fff`}
                alt="Admin"
              />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default App;