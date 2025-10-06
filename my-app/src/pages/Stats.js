// pages/Stats.js
import React, { useState, useEffect } from 'react';
import { getAdminStats } from '../api';

const Stats = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-orange-500 mb-4"></i>
          <p className="text-gray-600">Loading stats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
          <p className="text-gray-600">Error loading stats: {error}</p>
        </div>
      </div>
    );
  }

  const metrics = stats ? [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue || '0'}`,
      change: stats.revenueChange || '+0%',
      trend: stats.revenueTrend || 'up',
      icon: 'fas fa-dollar-sign',
      color: 'bg-green-500'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders || '0',
      change: stats.ordersChange || '+0%',
      trend: stats.ordersTrend || 'up',
      icon: 'fas fa-shopping-cart',
      color: 'bg-orange-500'
    },
    {
      title: 'Customers',
      value: stats.totalCustomers || '0',
      change: stats.customersChange || '+0%',
      trend: stats.customersTrend || 'up',
      icon: 'fas fa-users',
      color: 'bg-blue-500'
    },
    {
      title: 'Avg. Order Value',
      value: `$${stats.avgOrderValue || '0'}`,
      change: stats.avgOrderChange || '+0%',
      trend: stats.avgOrderTrend || 'up',
      icon: 'fas fa-chart-line',
      color: 'bg-purple-500'
    }
  ] : [];

  const topProducts = stats?.topProducts || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-orange-100 text-lg">Track your bakery's performance</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl border border-white/30 focus:ring-2 focus:ring-white"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <button className="bg-white text-orange-600 px-6 py-2 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-200">
              <i className="fas fa-download mr-2"></i>
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                <p className={`text-sm font-medium mt-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change} from last period
                </p>
              </div>
              <div className={`${metric.color} p-3 rounded-xl`}>
                <i className={`${metric.icon} text-white text-lg`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Overview</h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {[1200, 1900, 1500, 2000, 1800, 2200, 2400].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-orange-500 to-amber-300 rounded-t-lg transition-all duration-300 hover:opacity-80"
                  style={{ height: `${(value / 2500) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">Day {index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-orange-100 bg-orange-50">
            <h2 className="text-xl font-bold text-gray-900">Top Products</h2>
            <p className="text-gray-600 text-sm mt-1">Best selling bakery items</p>
          </div>
          <div className="divide-y divide-orange-100">
            {topProducts.map((product, index) => (
              <div key={product.name} className="px-6 py-4 hover:bg-orange-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{product.revenue}</p>
                    <p className="text-sm text-gray-500">Revenue</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;