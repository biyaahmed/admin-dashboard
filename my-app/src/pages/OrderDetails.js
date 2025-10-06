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
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
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
        {/* Order Information Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Get Started Card */}
          <DataCard title="Get Started" icon="fas fa-rocket">
            <DataField label="Company Name" value={order.form_data?.companyName} />
            <DataField label="Designator" value={order.form_data?.designator} />
          </DataCard>

          {/* Contact Person Card */}
          <DataCard title="Contact Person" icon="fas fa-user">
            <DataField label="First Name" value={order.form_data?.contact?.firstName} />
            <DataField label="Last Name" value={order.form_data?.contact?.lastName} />
            <DataField label="Email" value={order.form_data?.contact?.email} />
            <DataField label="Phone" value={order.form_data?.contact?.phone} />
            <DataField label="SMS OK" value={order.form_data?.contact?.smsOk ? 'Yes' : 'No'} />
          </DataCard>

          {/* Filing Date Card */}
          <DataCard title="Filing Date" icon="fas fa-calendar">
            <DataField label="Filing Speed" value={order.form_data?.filingSpeed} />
            <DataField label="Filing Estimate" value={order.form_data?.filingEstimate} />
          </DataCard>

          {/* Company Information Card */}
          <DataCard title="Company Information" icon="fas fa-building">
            <DataField label="Street Address" value={order.form_data?.address?.addr1} />
            <DataField label="Address (Cont)" value={order.form_data?.address?.addr2} />
            <DataField label="City" value={order.form_data?.address?.city} />
            <DataField label="State" value={order.form_data?.address?.usState} />
            <DataField label="ZIP Code" value={order.form_data?.address?.zip} />
          </DataCard>

          {/* Own Company Card */}
          <DataCard title="Own Company" icon="fas fa-home">
            <DataField label="Address Choice" value={order.form_data?.addressChoice} />
            <DataField label="Street Address" value={order.form_data?.address?.addr1} />
            <DataField label="Address (Cont)" value={order.form_data?.address?.addr2} />
            <DataField label="City" value={order.form_data?.address?.city} />
            <DataField label="State" value={order.form_data?.address?.usState} />
            <DataField label="ZIP Code" value={order.form_data?.address?.zip} />
          </DataCard>

          {/* Member Information Card */}
          <DataCard title="Member Information" icon="fas fa-users">
            <DataField label="Members Count" value={order.form_data?.membersCount} />
            {order.form_data?.members && order.form_data.members.map((member, index) => (
              <div key={index} className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Member {index + 1}</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <DataField label="Type" value={member.type} />
                  <DataField label="Use Bizee Address" value={member.useBizeeAddress ? 'Yes' : 'No'} />
                  {member.type === 'Individual' ? (
                    <>
                      <DataField label="First Name" value={member.firstName} />
                      <DataField label="Last Name" value={member.lastName} />
                    </>
                  ) : (
                    <DataField label="Company Name" value={member.companyName} />
                  )}
                  {!member.useBizeeAddress && (
                    <>
                      <DataField label="Street Address" value={member.streetAddress} />
                      <DataField label="Address (Cont)" value={member.addressCont} />
                      <DataField label="City" value={member.city} />
                      <DataField label="State" value={member.state} />
                      <DataField label="ZIP Code" value={member.zipCode} />
                    </>
                  )}
                  <DataField label="Ownership %" value={member.ownership} />
                </div>
              </div>
            ))}
          </DataCard>

          {/* Billing Information Card */}
          <DataCard title="Billing Information" icon="fas fa-credit-card">
            <DataField label="Country" value={order.form_data?.billing?.country} />
            <DataField label="Street Address" value={order.form_data?.billing?.streetAddress} />
            <DataField label="Address (Optional)" value={order.form_data?.billing?.addressOptional} />
            <DataField label="City" value={order.form_data?.billing?.city} />
            <DataField label="State" value={order.form_data?.billing?.state} />
            <DataField label="ZIP Code" value={order.form_data?.billing?.zipCode} />
          </DataCard>

          {/* Identification Number Card */}
          <DataCard title="Identification Number" icon="fas fa-id-card">
            <DataField label="First Name" value={order.form_data?.identification?.firstName} />
            <DataField label="Last Name" value={order.form_data?.identification?.lastName} />
            <DataField label="Foreign Individual" value={order.form_data?.identification?.isForeign === 'yes' ? 'Yes' : 'No'} />
            {order.form_data?.identification?.isForeign === 'no' && (
              <>
                <DataField label="ID Type" value={order.form_data?.identification?.idType === 'ssn' ? 'SSN' : 'ITIN'} />
                <DataField label={order.form_data?.identification?.idType === 'ssn' ? 'SSN' : 'ITIN'} value={order.form_data?.identification?.[order.form_data.identification.idType]} />
              </>
            )}
            <DataField label="Street Address" value={order.form_data?.identification?.street} />
            <DataField label="Address (Cont)" value={order.form_data?.identification?.address2} />
            <DataField label="City" value={order.form_data?.identification?.city} />
            <DataField label="State" value={order.form_data?.identification?.region} />
            <DataField label="ZIP Code" value={order.form_data?.identification?.zip} />
          </DataCard>

          {/* Premium Service Card */}
          <DataCard title="Premium Service" icon="fas fa-star">
            <DataField label="Premium Package Selected" value={order.form_data?.premiumSelected ? 'Yes' : 'No'} />
          </DataCard>

          {/* Permit and License Card */}
          <DataCard title="Permit and License" icon="fas fa-file-alt">
            <DataField label="License Package" value={order.form_data?.licensesPackage ? 'Yes - Mail applications ($99)' : 'No thanks, I\'ll do it myself'} />
          </DataCard>

          {/* Business Banking Card */}
          <DataCard title="Business Banking" icon="fas fa-university">
            <DataField label="Business Banking Selected" value={order.form_data?.bankingSelected ? 'Yes' : 'No'} />
          </DataCard>
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

const DataCard = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="bg-orange-100 p-3 rounded-xl">
        <i className={`${icon} text-orange-600`}></i>
      </div>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    </div>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

const DataField = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600 text-sm">{label}:</span>
    <span className="font-semibold text-gray-900">{value || 'N/A'}</span>
  </div>
);

export default OrderDetails;
