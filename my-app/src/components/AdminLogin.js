// // components/AdminLogin.js
// import React, { useState } from 'react';

// const AdminLogin = ({ onLogin }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // For testing purposes, you can use mock credentials if your backend isn't ready
//       // Remove this block when your actual backend is working
//       if (formData.email === 'admin@example.com' && formData.password === 'password') {
//         const mockData = {
//           token: 'mock-jwt-token',
//           admin: {
//             name: 'Admin User',
//             email: 'admin@example.com'
//           }
//         };
//         onLogin(mockData.token, mockData.admin);
//         return;
//       }

//       const response = await fetch('https://ordersbackend.breadsquared.com/api/admin/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       // Check if response is ok before trying to parse JSON
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       if (data.token && data.admin) {
//         onLogin(data.token, data.admin);
//       } else {
//         setError(data.message || 'Login failed - invalid response');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       if (err.message.includes('Failed to fetch')) {
//         setError('Cannot connect to server. Please check if the backend is running.');
//       } else {
//         setError(err.message || 'Network error. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Admin Login
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Use admin@example.com / password for testing
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//               {error}
//             </div>
//           )}
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <input
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//             >
//               {loading ? (
//                 <span className="flex items-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Signing in...
//                 </span>
//               ) : (
//                 'Sign in'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;



// components/AdminLogin.js
import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        onLogin(mockData.token, mockData.admin);
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
        onLogin(data.token, data.admin);
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
    <div className="admin-login-container">
      <div className="login-background">
        <div className="login-header">
          <div className="logo-section">
            <img 
              src="https://www.breadsquared.com/wp-content/uploads/al_opt_content/IMAGE/www.breadsquared.com/wp-content/uploads/2025/08/Bread-Squared-300x40.png.bv.webp?bv_host=www.breadsquared.com" 
              alt="BreadSquared" 
              className="logo"
            />
            <div className="phone-info">
              <i className="fas fa-phone"></i>
              <span>+18172429273</span>
            </div>
          </div>
        </div>

        <div className="login-content">
          <div className="login-card">
            <div className="login-header-content">
              <h2 className="login-title">Admin Portal</h2>
              <p className="login-subtitle">
                Sign in to access the administration dashboard
              </p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              {error && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="form-input"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="demo-credentials">
                <div className="demo-header">
                  <i className="fas fa-info-circle"></i>
                  <span>Demo Credentials</span>
                </div>
                <div className="demo-info">
                  <strong>Email:</strong> admin@example.com<br />
                  <strong>Password:</strong> password
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="login-button"
              >
                {loading ? (
                  <span className="button-loading">
                    <i className="fas fa-spinner fa-spin"></i>
                    Signing in...
                  </span>
                ) : (
                  <span className="button-content">
                    <i className="fas fa-sign-in-alt"></i>
                    Sign In
                  </span>
                )}
              </button>
            </form>

            <div className="login-footer">
              <p className="security-notice">
                <i className="fas fa-shield-alt"></i>
                Secure admin access only
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-login-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .login-background {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .login-header {
          background: #2E2163;
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1rem 0;
        }

        .logo-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          height: 40px;
          width: auto;
        }

        .phone-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #fff;
          font-weight: 500;
        }

        .phone-info i {
          color: #2a1e5d;
        }

        .login-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 3rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          width: 100%;
          max-width: 440px;
          position: relative;
          overflow: hidden;
        }

        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #2a1e5d, #667eea);
        }

        .login-header-content {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-title {
          color: #2a1e5d;
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          background: linear-gradient(135deg, #2a1e5d, #667eea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .login-subtitle {
          color: #6b7280;
          font-size: 1rem;
          margin: 0;
          font-weight: 400;
        }

        .login-form {
          space-y: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          color: #2a1e5d;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #fff;
          color: #2a1e5d;
        }

        .form-input:focus {
          outline: none;
          border-color: #2a1e5d;
          box-shadow: 0 0 0 3px rgba(42, 30, 93, 0.1);
        }

        .form-input::placeholder {
          color: #9ca3af;
        }

        .error-message {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .error-message i {
          font-size: 1rem;
        }

        .demo-credentials {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .demo-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #0369a1;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .demo-info {
          color: #075985;
          font-size: 0.85rem;
          line-height: 1.4;
        }

        .login-button {
          width: 100%;
          background: linear-gradient(135deg, #2a1e5d, #667eea);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          position: relative;
          overflow: hidden;
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(42, 30, 93, 0.3);
        }

        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .button-loading,
        .button-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .fa-spin {
          animation: fa-spin 1s infinite linear;
        }

        @keyframes fa-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .login-footer {
          margin-top: 2rem;
          text-align: center;
        }

        .security-notice {
          color: #6b7280;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 640px) {
          .login-content {
            padding: 1rem;
          }

          .login-card {
            padding: 2rem 1.5rem;
          }

          .logo-section {
            padding: 0 1rem;
          }

          .login-title {
            font-size: 1.75rem;
          }
        }

        /* Animation for form inputs */
        .form-input {
          animation: slideUp 0.5s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Loading state enhancements */
        .login-button:disabled::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;