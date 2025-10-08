// components/GlobalHeader.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GlobalHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');
  const admin = {
    name: adminData.name || 'Admin User',
    email: adminData.email || 'admin@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: 'fas fa-chart-bar', current: location.pathname === '/dashboard' },
    { name: 'Orders', href: '/orders', icon: 'fas fa-shopping-cart', current: location.pathname === '/orders' },
    // { name: 'Statistics', href: '/stats', icon: 'fas fa-chart-pie', current: location.pathname === '/stats' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/login');
  };

  return (
    <header className="bg-white  border-b  sticky top-0 z-50" style={{borderBottom:"1px solid #2e2163", backgroundColor:"#2e2163"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                className="h-auto " style={{width:"60%"}}
                src="https://www.breadsquared.com/wp-content/uploads/al_opt_content/IMAGE/www.breadsquared.com/wp-content/uploads/2025/08/Bread-Squared-300x40.png.bv.webp?bv_host=www.breadsquared.com"
                alt="BreadSquared"
              />
            </div>

            {/* Desktop Navigation */}
            {/* <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => (
                <button style={{backgroundColor:"#ffffff", color:"#2e2163"}}
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className={`${
                    item.current
                      ? ' text-white shadow-lg'
                      : 'text-gray-700 hover:bg-orange-50 hover:text-white-700'
                  } px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2`}
                >
                  <i className={`${item.icon} w-4 h-4`}></i>
                  {item.name}
                </button>
              ))}
            </nav> */}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1">
            {/* Phone info */}
            <div className="hidden lg:flex items-center gap-2 text-gray-600 px-4 py-2 rounded-full" style={{border:"1px solid #281d58", backgroundColor:"#ffffff", display:"none"}}>
              <i className="fas fa-phone text-sm" style={{color:"#281d58"}}></i>
              <span className="text-sm font-medium">+18172429273</span>
            </div>
  <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => (
                <button style={{backgroundColor:"#ffffff", color:"#2e2163"}}
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className={`${
                    item.current
                      ? ' text-white shadow-lg'
                      : 'text-gray-700 hover:bg-orange-50 hover:text-white-700'
                  } px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2`}
                >
                  <i className={`${item.icon} w-4 h-4`}></i>
                  {item.name}
                </button>
              ))}
            </nav>
            {/* User dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-white rounded-xl px-5 py-3 " style={{border:"1px solid #271c54", justifyContent:"space-around"}}
              >
                <i style={{fontSize:"20px", color:"#281d58"}} class='fas'>&#xf2bd;</i>
                {/* <img style={{marginLeft:"-8px"}}
                  className="h-7 w-7 rounded-full"
                  src={admin.avatar}
                  alt={admin.name}
                /> */}
                <div className="hidden lg:block text-left">
                  {/* <p className="text-sm font-semibold text-gray-900">{admin.name}</p> */}
                  <p className="text-xs text-gray-500" style={{color:"#281d58", fontSize:"14px"}}>{admin.email}</p>
                </div>
                <i className="fas fa-chevron-down text-xs" style={{color:"#271c54", fontSize:"16px"}}></i>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border  z-50">
                  <div className="px-4 py-3 border-b rounded-t-xl" style={{backgroundColor:"#271c54", paddingTop:"10px", textAlign:"left"}}>
                    <p className="text-sm font-semibold text-gray-900" style={{color:"#ffffff"}}>{admin.name}</p>
                    <p className="text-sm text-gray-500" style={{color:"#ffffff"}}>{admin.email}</p>
                  </div>
                  
                  <div className="py-2">
                    <button
                      onClick={() => {
                        navigate('/dashboard');
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700"
                    >
                      <i className="fas fa-tachometer-alt text-orange-500 w-4" style={{color:"#271c54"}}></i>
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        navigate('/orders');
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700"
                    >
                      <i className="fas fa-shopping-cart text-orange-500 w-4" style={{color:"#271c54"}}></i>
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
              className="md:hidden inline-flex items-center justify-center p-3 rounded-2xl text-gray-600" 
            >
              <i style={{color:"#ffffff"}} className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-orange-200 py-4 bg-white">
            <nav className="space-y-2 px-2">
              {navigation.map((item) => (
                <button style={{color:"#2e2163"}}
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`${
                    item.current
                      ? ' text-white'
                      : 'text-gray-700'
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