// pages/OrderDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderDetails } from '../api';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const data = await getOrderDetails(id);
        setOrder(data.data || data); // Use data.data if exists, else data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-orange-500 mb-4"></i>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
          <p className="text-gray-600">Error loading order: {error || 'Order not found'}</p>
          <button
            onClick={() => navigate('/orders')}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/orders')}
              className="p-2 text-orange-100 hover:text-white transition-colors duration-200"
            >
              <i className="fas fa-arrow-left text-xl"></i>
            </button>
            <div>
              <h1 className="text-4xl font-bold mb-2">Order Details</h1>
              <p className="text-orange-100 text-lg">Order {order.orderId}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-semibold hover:bg-white/30 transition-colors duration-200">
              <i className="fas fa-print mr-2"></i>
              Print
            </button>
            <button className="bg-white text-orange-600 px-4 py-2 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-200">
              <i className="fas fa-edit mr-2"></i>
              Edit Order
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Entity ID:</strong> {order.form_data?.entityId || 'N/A'}</p>
              <p><strong>Entity Name:</strong> {order.form_data?.entityName || 'N/A'}</p>
              <p><strong>State Key:</strong> {order.form_data?.stateKey || 'N/A'}</p>
              <p><strong>State Name:</strong> {order.form_data?.stateName || 'N/A'}</p>
              <p><strong>State Fee:</strong> ${order.form_data?.stateFee || '0'}</p>
              <p><strong>Base Price:</strong> ${order.form_data?.basePrice || '0'}</p>
              <p><strong>Expedite Fee:</strong> ${order.form_data?.addons?.expedite || '0'}</p>
              <p><strong>Premium Fee:</strong> ${order.form_data?.addons?.premium || '0'}</p>
              <p><strong>Licenses Fee:</strong> ${order.form_data?.addons?.licenses || '0'}</p>
              <p><strong>Total:</strong> ${order.form_data?.total || '0'}</p>
              <p><strong>Company Name:</strong> {order.form_data?.companyName || 'N/A'}</p>
              <p><strong>Designator:</strong> {order.form_data?.designator || 'N/A'}</p>
              <p><strong>Filing Speed:</strong> {order.form_data?.filingSpeed || 'N/A'}</p>
              <p><strong>Filing Estimate:</strong> {order.form_data?.filingEstimate || 'N/A'}</p>
              <p><strong>Address Choice:</strong> {order.form_data?.addressChoice || 'N/A'}</p>
              <p><strong>Premium Selected:</strong> {order.form_data?.premiumSelected ? 'Yes' : 'No'}</p>
              <p><strong>Banking Selected:</strong> {order.form_data?.bankingSelected ? 'Yes' : 'No'}</p>
              <p><strong>Members Count:</strong> {order.form_data?.membersCount || '0'}</p>
              <p><strong>Licenses Package:</strong> {order.form_data?.licensesPackage ? 'Yes' : 'No'}</p>
              <h3 className="mt-4 font-semibold">Members:</h3>
              {order.form_data?.members && order.form_data.members.map((member, index) => (
                <div key={index} className="pl-4 mb-2 border-l border-orange-300">
                  <p><strong>Name:</strong> {member.firstName} {member.lastName}</p>
                  <p><strong>Type:</strong> {member.type}</p>
                  <p><strong>Use Bizee Address:</strong> {member.useBizeeAddress ? 'Yes' : 'No'}</p>
                  <p><strong>Company Name:</strong> {member.companyName || 'N/A'}</p>
                  <p><strong>Street Address:</strong> {member.streetAddress}</p>
                  <p><strong>Address Cont:</strong> {member.addressCont}</p>
                  <p><strong>City:</strong> {member.city}</p>
                  <p><strong>State:</strong> {member.state}</p>
                  <p><strong>Zip Code:</strong> {member.zipCode}</p>
                  <p><strong>Ownership:</strong> {member.ownership}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <i className="fas fa-user text-orange-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{order.form_data?.contact?.firstName} {order.form_data?.contact?.lastName}</p>
                  <p className="text-sm text-gray-500">{order.form_data?.contact?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <i className="fas fa-phone text-orange-600"></i>
                </div>
                <p className="text-sm text-gray-600">{order.form_data?.contact?.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <i className="fas fa-map-marker-alt text-orange-600"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{order.form_data?.address?.addr1}</p>
                  {order.form_data?.address?.addr2 && <p className="text-sm text-gray-600">{order.form_data.address.addr2}</p>}
                  <p className="text-sm text-gray-600">{order.form_data?.address?.city}, {order.form_data?.address?.usState} {order.form_data?.address?.zip}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Information</h2>
            <div className="space-y-3">
              {[
                { label: 'Order ID', value: order.order_number },
                { label: 'Date', value: new Date(order.created_at).toLocaleDateString() },
                { label: 'Payment Method', value: order.payment_method || 'N/A' },
                { label: 'Shipping Method', value: order.shipping_method || 'N/A' },
                { label: 'Entity ID', value: order.form_data?.entityId || 'N/A' },
                { label: 'Entity Name', value: order.form_data?.entityName || 'N/A' },
                { label: 'State Key', value: order.form_data?.stateKey || 'N/A' },
                { label: 'State Name', value: order.form_data?.stateName || 'N/A' },
                { label: 'State Fee', value: order.form_data?.stateFee || 'N/A' },
                { label: 'Company Name', value: order.form_data?.companyName || 'N/A' },
                { label: 'Designator', value: order.form_data?.designator || 'N/A' },
                { label: 'Filing Speed', value: order.form_data?.filingSpeed || 'N/A' },
                { label: 'Filing Estimate', value: order.form_data?.filingEstimate || 'N/A' },
                { label: 'Address Choice', value: order.form_data?.addressChoice || 'N/A' },
                { label: 'Premium Selected', value: order.form_data?.premiumSelected ? 'Yes' : 'No' },
                { label: 'Banking Selected', value: order.form_data?.bankingSelected ? 'Yes' : 'No' },
                { label: 'Members Count', value: order.form_data?.membersCount || 'N/A' },
                { label: 'Licenses Package', value: order.form_data?.licensesPackage ? 'Yes' : 'No' },
              ].map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;