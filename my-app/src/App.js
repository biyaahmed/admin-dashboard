// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
// import Stats from './pages/Stats';
import Layout from './components/Layout';
import './App.css';

// Simple auth check
const isAuthenticated = () => {
  return localStorage.getItem('adminToken') !== null;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Orders />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders/:id" 
            element={
              <ProtectedRoute>
                <Layout>
                  <OrderDetails />
                </Layout>
              </ProtectedRoute>
            } 
          />
          {/* <Route 
            path="/stats" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Stats />
                </Layout>
              </ProtectedRoute>
            } 
          /> */}
          <Route path="/" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
