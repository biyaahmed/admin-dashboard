// pages/OrderDetails.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = {
    id: id,
    orderId: '#ORD-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State 12345'
    },
    status: 'completed',
    date: '2024-01-15 14:30',
    amount: '$120.00',
    items: [
      { id: 1, name: 'Artisan Sourdough Bread', quantity: 2, price: '$8.00', total: '$16.00' },
      { id: 2, name: 'Whole Wheat Baguette', quantity: 1, price: '$6.50', total: '$6.50' },
      { id: 3, name: 'Cinnamon Roll', quantity: 3, price: '$4.50', total: '$13.50' }
    ],
    subtotal: '$36.00',
    shipping: '$5.00',
    tax: '$3.00',
    total: '$44.00',
    paymentMethod: 'Credit Card',
    shippingMethod: 'Standard Delivery'
  };

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
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-orange-100 bg-orange-50">
              <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
            </div>
            <div className="divide-y divide-orange-100">
              {order.items.map((item) => (
                <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-orange-50 transition-colors duration-200">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-100 p-3 rounded-xl">
                      <i className="fas fa-bread-slice text-orange-600"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{item.total}</p>
                    <p className="text-sm text-gray-500">{item.price} each</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-orange-50 border-t border-orange-100">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold">{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="font-semibold">{order.shipping}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span className="font-semibold">{order.tax}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-orange-200 pt-2">
                  <span>Total</span>
                  <span className="text-orange-600">{order.total}</span>
                </div>
              </div>
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
                  <p className="font-semibold text-gray-900">{order.customer.name}</p>
                  <p className="text-sm text-gray-500">{order.customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <i className="fas fa-phone text-orange-600"></i>
                </div>
                <p className="text-sm text-gray-600">{order.customer.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <i className="fas fa-map-marker-alt text-orange-600"></i>
                </div>
                <p className="text-sm text-gray-600">{order.customer.address}</p>
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Information</h2>
            <div className="space-y-3">
              {[
                { label: 'Order ID', value: order.orderId },
                { label: 'Date', value: order.date },
                { label: 'Payment Method', value: order.paymentMethod },
                { label: 'Shipping Method', value: order.shippingMethod },
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