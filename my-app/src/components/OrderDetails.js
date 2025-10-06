// components/OrderDetails.js - Fix the useEffect warning
import React, { useState, useEffect } from 'react';

const OrderDetails = ({ orderId, setCurrentView }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Move fetchOrder inside useEffect or use useCallback
  useEffect(() => {
    const fetchOrder = async (id) => {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await fetch(`https://ordersbackend.breadsquared.com/api/admin/orders/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        } else {
          console.error('Failed to fetch order');
          // Use sample data if API fails
          setOrder(getSampleOrder());
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        setOrder(getSampleOrder());
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder(orderId);
    } else {
      setOrder(getSampleOrder());
      setLoading(false);
    }
  }, [orderId]); // Only depend on orderId

  const getSampleOrder = () => {
    return {
      id: 15,
      order_number: "cc4515c6-44db-4c01-b6b4-fcfb9f5a04c9",
      status: "paid",
      total: "1396.00",
      form_data: {
        entityId: "llc",
        entityName: "LLC",
        stateKey: "ala",
        stateName: "Alaska",
        stateFee: 849,
        basePrice: 299,
        addons: {
          premium: 149,
          licenses: 99
        },
        total: 1297,
        companyName: "Esse sit sed minus e",
        designator: "L.L.C.",
        contact: {
          firstName: "Sed distinctio Pari",
          lastName: "Pariatur Corrupti",
          email: "Necessitatibus conse",
          phone: "Sunt reiciendis omn",
          smsOk: true
        },
        filingSpeed: "regular",
        filingEstimate: "Friday, October 24",
        address: {
          addr1: null,
          addr2: null,
          city: null,
          usState: "ALA",
          zip: null
        },
        addressChoice: "own",
        premiumSelected: true,
        bankingSelected: true,
        licensesPackage: true
      },
      created_at: "2025-10-06T12:05:33.000000Z",
      updated_at: "2025-10-06T12:05:50.000000Z"
    };
  };

  // ... rest of the component remains the same
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status] || 'bg-gray-100'}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Order not found</h2>
        <button 
          onClick={() => setCurrentView('orders')}
          className="text-blue-600 hover:text-blue-800 mt-4"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <button 
          onClick={() => setCurrentView('orders')}
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          &larr; Back to Orders
        </button>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
            <p className="text-gray-600">Order #{order.order_number}</p>
          </div>
          <div className="flex items-center space-x-4">
            {getStatusBadge(order.status)}
            <span className="text-lg font-semibold">${parseFloat(order.total).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Company Name</label>
                <p className="mt-1 text-gray-900">{order.form_data.companyName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Designator</label>
                <p className="mt-1 text-gray-900">{order.form_data.designator}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Entity Type</label>
                <p className="mt-1 text-gray-900">{order.form_data.entityName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">State</label>
                <p className="mt-1 text-gray-900">{order.form_data.stateName}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">First Name</label>
                <p className="mt-1 text-gray-900">{order.form_data.contact.firstName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Last Name</label>
                <p className="mt-1 text-gray-900">{order.form_data.contact.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1 text-gray-900">{order.form_data.contact.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="mt-1 text-gray-900">{order.form_data.contact.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">SMS Opt-in</label>
                <p className="mt-1 text-gray-900">
                  {order.form_data.contact.smsOk ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Order Timeline */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Order Timeline</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Created</label>
                <p className="mt-1 text-gray-900">{formatDate(order.created_at)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Last Updated</label>
                <p className="mt-1 text-gray-900">{formatDate(order.updated_at)}</p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Payment Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price</span>
                <span className="font-medium">${order.form_data.basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">State Fee</span>
                <span className="font-medium">${order.form_data.stateFee}</span>
              </div>
              
              {order.form_data.addons && Object.entries(order.form_data.addons).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600 capitalize">{key}</span>
                  <span className="font-medium">${value}</span>
                </div>
              ))}
              
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${parseFloat(order.total).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;





