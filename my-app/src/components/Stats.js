// components/Stats.js
import React from 'react';

const Stats = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Statistics</h1>
        <p className="text-gray-600">Detailed analytics and reports</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Statistics Page
          </h2>
          <p className="text-gray-500">
            This page would contain detailed analytics and reporting features.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;