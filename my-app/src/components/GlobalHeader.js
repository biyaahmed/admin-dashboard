// components/GlobalHeader.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GlobalHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const admin = {
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: 'fas fa-chart-bar', current: location.pathname === '/dashboard' },
    { name: 'Orders', href: '/orders', icon: 'fas fa-shopping-cart', current: location.pathname === '/orders' },
    { name: 'Statistics', href: '/stats', icon: 'fas fa-chart-pie', current: location.pathname === '/stats' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-orange-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                className="h-10 w-auto"
                src="https://www.breadsquared.com/wp-content/uploads/al_opt_content/IMAGE/www.breadsquared.com/wp-content/uploads/2025/08/Bread-Squared-300x40.png.bv.webp?bv_host=www.breadsquared.com"
                alt="BreadSquared"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className={`${
                    item.current
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-orange-50 hover:text-orange-700'
                  } px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2`}
                >
                  <i className={`${item.icon} w-4 h-4`}></i>
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Phone info */}
            <div className="hidden lg:flex items-center gap-2 text-gray-600 bg-orange-50 px-4 py-2 rounded-full border border-orange-200">
              <i className="fas fa-phone text-orange-500 text-sm"></i>
              <span className="text-sm font-medium">+18172429273</span>
            </div>

            {/* User dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 bg-white rounded-2xl px-4 py-2 hover:bg-orange-50 transition-all duration-300 border border-orange-200"
              >
                <img
                  className="h-9 w-9 rounded-full border-2 border-orange-200"
                  src={admin.avatar}
                  alt={admin.name}
                />
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-gray-900">{admin.name}</p>
                  <p className="text-xs text-gray-500">{admin.email}</p>
                </div>
                <i className="fas fa-chevron-down text-orange-500 text-xs"></i>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-orange-200 py-3 z-50">
                  <div className="px-4 py-3 border-b border-orange-100 bg-orange-50 rounded-t-xl">
                    <p className="text-sm font-semibold text-gray-900">{admin.name}</p>
                    <p className="text-sm text-gray-500">{admin.email}</p>
                  </div>
                  
                  <div className="py-2">
                    <button
                      onClick={() => {
                        navigate('/dashboard');
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 transition-colors duration-200"
                    >
                      <i className="fas fa-tachometer-alt text-orange-500 w-4"></i>
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        navigate('/orders');
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 transition-colors duration-200"
                    >
                      <i className="fas fa-shopping-cart text-orange-500 w-4"></i>
                      Orders
                    </button>
                  </div>
                  
                  <div className="border-t border-orange-100 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <i className="fas fa-sign-out-alt text-red-500 w-4"></i>
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-3 rounded-2xl text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-orange-200 py-4 bg-white">
            <nav className="space-y-2 px-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`${
                    item.current
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:bg-orange-50'
                  } w-full text-left px-4 py-3 rounded-xl text-base font-semibold flex items-center gap-3`}
                >
                  <i className={`${item.icon} w-5 h-5`}></i>
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Overlay */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default GlobalHeader;