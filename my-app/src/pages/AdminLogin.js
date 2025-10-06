// pages/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // For testing purposes, you can use mock credentials if your backend isn't ready
      // Remove this block when your actual backend is working
      if (formData.email === 'admin@example.com' && formData.password === 'password') {
        const mockData = {
          token: 'mock-jwt-token',
          admin: {
            name: 'Admin User',
            email: 'admin@example.com'
          }
        };
        localStorage.setItem('adminToken', mockData.token);
        localStorage.setItem('adminData', JSON.stringify(mockData.admin));
        navigate('/dashboard');
        return;
      }

      const response = await fetch('https://ordersbackend.breadsquared.com/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.token && data.admin) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminData', JSON.stringify(data.admin));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed - invalid response');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.message.includes('Failed to fetch')) {
        setError('Cannot connect to server. Please check if the backend is running.');
      } else {
        setError(err.message || 'Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 font-sans">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-purple-900 border-b border-white/20 py-4">
          <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
            <img 
              src="https://www.breadsquared.com/wp-content/uploads/al_opt_content/IMAGE/www.breadsquared.com/wp-content/uploads/2025/08/Bread-Squared-300x40.png.bv.webp?bv_host=www.breadsquared.com" 
              alt="BreadSquared" 
              className="h-8 w-auto"
            />
            <div className="flex items-center gap-2 text-white font-medium">
              <i className="fas fa-phone text-purple-300"></i>
              <span>+18172429273</span>
            </div>
          </div>
        </div>

        {/* Login Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-12 shadow-2xl border border-white/30 w-full max-w-md overflow-hidden">
            {/* Gradient Top Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-900 to-indigo-500"></div>
            
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-br from-purple-900 to-indigo-500 bg-clip-text text-transparent mb-2">
                Admin Portal
              </h2>
              <p className="text-gray-600 text-base font-normal">
                Sign in to access the administration dashboard
              </p>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </div>
              )}

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-purple-900 text-sm font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-purple-900 text-base transition-all duration-300 bg-white placeholder-gray-400 focus:outline-none focus:border-purple-900 focus:ring-3 focus:ring-purple-100"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-purple-900 text-sm font-semibold mb-2">
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-purple-900 text-base transition-all duration-300 bg-white placeholder-gray-400 focus:outline-none focus:border-purple-900 focus:ring-3 focus:ring-purple-100"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Demo Credentials */}
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-sky-700 font-semibold mb-1 text-sm">
                  <i className="fas fa-info-circle"></i>
                  <span>Demo Credentials</span>
                </div>
                <div className="text-sky-800 text-sm leading-relaxed">
                  <strong>Email:</strong> admin@example.com<br />
                  <strong>Password:</strong> password
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-br from-purple-900 to-indigo-500 text-white border-none py-4 px-8 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden hover:translate-y-[-2px] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <i className="fas fa-spinner fa-spin"></i>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <i className="fas fa-sign-in-alt"></i>
                    Sign In
                  </span>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm flex items-center justify-center gap-2 m-0">
                <i className="fas fa-shield-alt"></i>
                Secure admin access only
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;