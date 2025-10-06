// components/Layout.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children, admin, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/orders', label: 'Orders', icon: '📦' },
  ];

  const isActive = (path) => location.pathname === path;

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
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 mt-4 transition-colors duration-300 transform ${
                isActive(item.path)
                  ? 'bg-blue-700 bg-opacity-25 border-r-4 border-white'
                  : 'hover:bg-blue-700 hover:bg-opacity-25'
              }`}
            >
              <span className="mx-4">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
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
          </div>

          <div className="flex items-center">
            <span className="text-gray-700 mr-4">Welcome, {admin?.name}</span>
            <div className="relative">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={`https://ui-avatars.com/api/?name=${admin?.name}&background=0D8ABC&color=fff`}
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

export default Layout;