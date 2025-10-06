// // pages/OrderDetails.js
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getOrderDetails } from '../api';

// const OrderDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         setLoading(true);
//         const data = await getOrderDetails(id);
//         setOrder(data.data || data); // Use data.data if exists, else data
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchOrderDetails();
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <i className="fas fa-spinner fa-spin text-4xl text-orange-500 mb-4"></i>
//           <p className="text-gray-600">Loading order details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !order) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
//           <p className="text-gray-600">Error loading order: {error || 'Order not found'}</p>
//           <button
//             onClick={() => navigate('/orders')}
//             className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
//           >
//             Back to Orders
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8 p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl shadow-lg p-8 text-white">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => navigate('/orders')}
//               className="p-2 text-orange-100 hover:text-white transition-colors duration-200"
//             >
//               <i className="fas fa-arrow-left text-xl"></i>
//             </button>
//             <div>
//               <h1 className="text-4xl font-bold mb-2">Order Details</h1>
//               <p className="text-orange-100 text-lg">Order {order.orderId}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-semibold hover:bg-white/30 transition-colors duration-200">
//               <i className="fas fa-print mr-2"></i>
//               Print
//             </button>
//             <button className="bg-white text-orange-600 px-4 py-2 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-200">
//               <i className="fas fa-edit mr-2"></i>
//               Edit Order
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Order Information Cards */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Get Started Card */}
//           <DataCard title="Get Started" icon="fas fa-rocket">
//             <DataField label="Company Name" value={order.form_data?.companyName} />
//             <DataField label="Designator" value={order.form_data?.designator} />
//           </DataCard>

//           {/* Contact Person Card */}
//           <DataCard title="Contact Person" icon="fas fa-user">
//             <DataField label="First Name" value={order.form_data?.contact?.firstName} />
//             <DataField label="Last Name" value={order.form_data?.contact?.lastName} />
//             <DataField label="Email" value={order.form_data?.contact?.email} />
//             <DataField label="Phone" value={order.form_data?.contact?.phone} />
//             <DataField label="SMS OK" value={order.form_data?.contact?.smsOk ? 'Yes' : 'No'} />
//           </DataCard>

//           {/* Filing Date Card */}
//           <DataCard title="Filing Date" icon="fas fa-calendar">
//             <DataField label="Filing Speed" value={order.form_data?.filingSpeed} />
//             <DataField label="Filing Estimate" value={order.form_data?.filingEstimate} />
//           </DataCard>

//           {/* Company Information Card */}
//           <DataCard title="Company Information" icon="fas fa-building">
//             <DataField label="Street Address" value={order.form_data?.address?.addr1} />
//             <DataField label="Address (Cont)" value={order.form_data?.address?.addr2} />
//             <DataField label="City" value={order.form_data?.address?.city} />
//             <DataField label="State" value={order.form_data?.address?.usState} />
//             <DataField label="ZIP Code" value={order.form_data?.address?.zip} />
//           </DataCard>

//           {/* Own Company Card */}
//           <DataCard title="Own Company" icon="fas fa-home">
//             <DataField label="Address Choice" value={order.form_data?.addressChoice} />
//             <DataField label="Street Address" value={order.form_data?.address?.addr1} />
//             <DataField label="Address (Cont)" value={order.form_data?.address?.addr2} />
//             <DataField label="City" value={order.form_data?.address?.city} />
//             <DataField label="State" value={order.form_data?.address?.usState} />
//             <DataField label="ZIP Code" value={order.form_data?.address?.zip} />
//           </DataCard>

//           {/* Member Information Card */}
//           <DataCard title="Member Information" icon="fas fa-users">
//             <DataField label="Members Count" value={order.form_data?.membersCount} />
//             {order.form_data?.members && order.form_data.members.map((member, index) => (
//               <div key={index} className="mt-4 p-3 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold text-gray-800 mb-2">Member {index + 1}</h4>
//                 <div className="grid grid-cols-2 gap-2 text-sm">
//                   <DataField label="Type" value={member.type} />
//                   <DataField label="Use Bizee Address" value={member.useBizeeAddress ? 'Yes' : 'No'} />
//                   {member.type === 'Individual' ? (
//                     <>
//                       <DataField label="First Name" value={member.firstName} />
//                       <DataField label="Last Name" value={member.lastName} />
//                     </>
//                   ) : (
//                     <DataField label="Company Name" value={member.companyName} />
//                   )}
//                   {!member.useBizeeAddress && (
//                     <>
//                       <DataField label="Street Address" value={member.streetAddress} />
//                       <DataField label="Address (Cont)" value={member.addressCont} />
//                       <DataField label="City" value={member.city} />
//                       <DataField label="State" value={member.state} />
//                       <DataField label="ZIP Code" value={member.zipCode} />
//                     </>
//                   )}
//                   <DataField label="Ownership %" value={member.ownership} />
//                 </div>
//               </div>
//             ))}
//           </DataCard>

//           {/* Billing Information Card */}
//           <DataCard title="Billing Information" icon="fas fa-credit-card">
//             <DataField label="Country" value={order.form_data?.billing?.country} />
//             <DataField label="Street Address" value={order.form_data?.billing?.streetAddress} />
//             <DataField label="Address (Optional)" value={order.form_data?.billing?.addressOptional} />
//             <DataField label="City" value={order.form_data?.billing?.city} />
//             <DataField label="State" value={order.form_data?.billing?.state} />
//             <DataField label="ZIP Code" value={order.form_data?.billing?.zipCode} />
//           </DataCard>

//           {/* Identification Number Card */}
//           <DataCard title="Identification Number" icon="fas fa-id-card">
//             <DataField label="First Name" value={order.form_data?.identification?.firstName} />
//             <DataField label="Last Name" value={order.form_data?.identification?.lastName} />
//             <DataField label="Foreign Individual" value={order.form_data?.identification?.isForeign === 'yes' ? 'Yes' : 'No'} />
//             {order.form_data?.identification?.isForeign === 'no' && (
//               <>
//                 <DataField label="ID Type" value={order.form_data?.identification?.idType === 'ssn' ? 'SSN' : 'ITIN'} />
//                 <DataField label={order.form_data?.identification?.idType === 'ssn' ? 'SSN' : 'ITIN'} value={order.form_data?.identification?.[order.form_data.identification.idType]} />
//               </>
//             )}
//             <DataField label="Street Address" value={order.form_data?.identification?.street} />
//             <DataField label="Address (Cont)" value={order.form_data?.identification?.address2} />
//             <DataField label="City" value={order.form_data?.identification?.city} />
//             <DataField label="State" value={order.form_data?.identification?.region} />
//             <DataField label="ZIP Code" value={order.form_data?.identification?.zip} />
//           </DataCard>

//           {/* Premium Service Card */}
//           <DataCard title="Premium Service" icon="fas fa-star">
//             <DataField label="Premium Package Selected" value={order.form_data?.premiumSelected ? 'Yes' : 'No'} />
//           </DataCard>

//           {/* Permit and License Card */}
//           <DataCard title="Permit and License" icon="fas fa-file-alt">
//             <DataField label="License Package" value={order.form_data?.licensesPackage ? 'Yes - Mail applications ($99)' : 'No thanks, I\'ll do it myself'} />
//           </DataCard>

//           {/* Business Banking Card */}
//           <DataCard title="Business Banking" icon="fas fa-university">
//             <DataField label="Business Banking Selected" value={order.form_data?.bankingSelected ? 'Yes' : 'No'} />
//           </DataCard>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           {/* Customer Information */}
//           <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Information</h2>
//             <div className="space-y-3">
//               <div className="flex items-center gap-3">
//                 <div className="bg-orange-100 p-2 rounded-lg">
//                   <i className="fas fa-user text-orange-600"></i>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">{order.form_data?.contact?.firstName} {order.form_data?.contact?.lastName}</p>
//                   <p className="text-sm text-gray-500">{order.form_data?.contact?.email}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="bg-orange-100 p-2 rounded-lg">
//                   <i className="fas fa-phone text-orange-600"></i>
//                 </div>
//                 <p className="text-sm text-gray-600">{order.form_data?.contact?.phone}</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="bg-orange-100 p-2 rounded-lg">
//                   <i className="fas fa-map-marker-alt text-orange-600"></i>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">{order.form_data?.address?.addr1}</p>
//                   {order.form_data?.address?.addr2 && <p className="text-sm text-gray-600">{order.form_data.address.addr2}</p>}
//                   <p className="text-sm text-gray-600">{order.form_data?.address?.city}, {order.form_data?.address?.usState} {order.form_data?.address?.zip}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Order Information */}
//           <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Order Information</h2>
//             <div className="space-y-3">
//               {[ 
//                 { label: 'Order ID', value: order.order_number },
//                 { label: 'Date', value: new Date(order.created_at).toLocaleDateString() },
//                 { label: 'Payment Method', value: order.payment_method || 'N/A' },
//                 { label: 'Shipping Method', value: order.shipping_method || 'N/A' },
//                 { label: 'Entity ID', value: order.form_data?.entityId || 'N/A' },
//                 { label: 'Entity Name', value: order.form_data?.entityName || 'N/A' },
//                 { label: 'State Key', value: order.form_data?.stateKey || 'N/A' },
//                 { label: 'State Name', value: order.form_data?.stateName || 'N/A' },
//                 { label: 'State Fee', value: order.form_data?.stateFee || 'N/A' },
//                 { label: 'Company Name', value: order.form_data?.companyName || 'N/A' },
//                 { label: 'Designator', value: order.form_data?.designator || 'N/A' },
//                 { label: 'Filing Speed', value: order.form_data?.filingSpeed || 'N/A' },
//                 { label: 'Filing Estimate', value: order.form_data?.filingEstimate || 'N/A' },
//                 { label: 'Address Choice', value: order.form_data?.addressChoice || 'N/A' },
//                 { label: 'Premium Selected', value: order.form_data?.premiumSelected ? 'Yes' : 'No' },
//                 { label: 'Banking Selected', value: order.form_data?.bankingSelected ? 'Yes' : 'No' },
//                 { label: 'Members Count', value: order.form_data?.membersCount || 'N/A' },
//                 { label: 'Licenses Package', value: order.form_data?.licensesPackage ? 'Yes' : 'No' },
//               ].map((item, index) => (
//                 <div key={index} className="flex justify-between">
//                   <span className="text-gray-600">{item.label}</span>
//                   <span className="font-semibold">{item.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DataCard = ({ title, icon, children }) => (
//   <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
//     <div className="flex items-center gap-3 mb-4">
//       <div className="bg-orange-100 p-3 rounded-xl">
//         <i className={`${icon} text-orange-600`}></i>
//       </div>
//       <h2 className="text-xl font-bold text-gray-900">{title}</h2>
//     </div>
//     <div className="space-y-3">
//       {children}
//     </div>
//   </div>
// );

// const DataField = ({ label, value }) => (
//   <div className="flex justify-between items-center">
//     <span className="text-gray-600 text-sm">{label}:</span>
//     <span className="font-semibold text-gray-900">{value || 'N/A'}</span>
//   </div>
// );

// export default OrderDetails;








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

  const TableSection = ({ title, icon, data }) => (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{border:"1px solid #2e2163"}}>
      <div className="px-6 py-4 " style={{backgroundColor: "#2e2163", color:"#ffffff"}}>
        <div className="flex items-center gap-3">
          <div className=" p-2 rounded-lg" style={{border:"1px solid #2e2163"}}>
            <i style={{color:"#ffffff"}}className={`${icon}`} ></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900" style={{color:"white"}}>{title}</h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody className="" style={{textAlign:"left"}}>
            {data.map((item, index) => (
              <tr key={index} className="">
                <td className="px-6 py-4 text-sm font-medium text-gray-600 w-1/3">{item.label}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.value || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const MemberTableSection = ({ title, icon, members }) => (
    <div className="bg-white rounded-2xl shadow-sm   overflow-hidden" style={{border:"1px solid #2e2163"}}>
      <div className="px-6 py-4  "style={{backgroundColor: "#2e2163", color:"#ffffff"}}>
        <div className="flex items-center gap-3">
          <div className=" p-2 rounded-lg" style={{border:"1px solid #2e2163"}}>
            <i  style={{color:"#ffffff"}} className={`${icon}`}></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900" style={{color:"white"}}>{title}</h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        {members && members.map((member, index) => (
          <div key={index} className="border-b border-orange-100 last:border-b-0">
            <table className="w-full">
              <tbody style={{textAlign:"left"}}>
                <tr className="">
                  <td className="px-6 py-3 text-sm font-medium text-gray-600 w-1/3">Member {index + 1} - Type</td>
                  <td className="px-6 py-3 text-sm font-semibold text-gray-900">{member.type || 'N/A'}</td>
                </tr>
                <tr className="">
                  <td className="px-6 py-3 text-sm font-medium text-gray-600">Use Bizee Address</td>
                  <td className="px-6 py-3 text-sm font-semibold text-gray-900">{member.useBizeeAddress ? 'Yes' : 'No'}</td>
                </tr>
                {member.type === 'Individual' ? (
                  <>
                    <tr className="">
                      <td className="px-6 py-3 text-sm font-medium text-gray-600">First Name</td>
                      <td className="px-6 py-3 text-sm font-semibold text-gray-900">{member.firstName || 'N/A'}</td>
                    </tr>
                    <tr className="">
                      <td className="px-6 py-3 text-sm font-medium text-gray-600">Last Name</td>
                      <td className="px-6 py-3 text-sm font-semibold text-gray-900">{member.lastName || 'N/A'}</td>
                    </tr>
                  </>
                ) : (
                  <tr className="">
                    <td className="px-6 py-3 text-sm font-medium text-gray-600">Company Name</td>
                    <td className="px-6 py-3 text-sm font-semibold text-gray-900">{member.companyName || 'N/A'}</td>
                  </tr>
                )}
                {!member.useBizeeAddress && (
                  <>
                    <tr className="">
                      <td className="px-6 py-3 text-sm font-medium text-gray-600">Street Address</td>
                      <td className="px-6 py-3 text-sm font-semibold text-gray-900">{member.streetAddress || 'N/A'}</td>
                    </tr>
                    <tr className="">
                      <td className="px-6 py-3 text-sm font-medium text-gray-600">Address (Cont)</td>
                      <td className="px-6 py-3 text-sm font-semibold text-gray-900">{member.addressCont || 'N/A'}</td>
                    </tr>
                    <tr className="">
                      <td className="px-6 py-3 text-sm font-medium text-gray-600">City</td>
                      <td className="px-6 py-3 text-sm font-semibold text-gray-900">{member.city || 'N/A'}</td>
                    </tr>
                    <tr className="">
                      <td className="px-6 py-3 text-sm font-medium text-gray-600">State</td>
                      <td className="px-6 py-3 text-sm font-semibold text-gray-900">{member.state || 'N/A'}</td>
                    </tr>
                    <tr className="">
                      <td className="px-6 py-3 text-sm font-medium text-gray-600">ZIP Code</td>
                      <td className="px-6 py-3 text-sm font-semibold text-gray-900">{member.zipCode || 'N/A'}</td>
                    </tr>
                  </>
                )}
                <tr className="">
                  <td className="px-6 py-3 text-sm font-medium text-gray-600">Ownership %</td>
                  <td className="px-6 py-3 text-sm font-semibold text-gray-900">{member.ownership || 'N/A'}%</td>
                </tr>
              </tbody>
            </table>
            {index < members.length - 1 && <div className="border-t border-orange-200 mx-6"></div>}
          </div>
        ))}
        {(!members || members.length === 0) && (
          <div className="px-6 py-8 text-center text-gray-500">
            No members found
          </div>
        )}
      </div>
    </div>
  );

  // Prepare table data for each section
  const getStartedData = [
    { label: 'Company Name', value: order.form_data?.companyName },
    { label: 'Designator', value: order.form_data?.designator }
  ];

  const contactPersonData = [
    { label: 'First Name', value: order.form_data?.contact?.firstName },
    { label: 'Last Name', value: order.form_data?.contact?.lastName },
    { label: 'Email', value: order.form_data?.contact?.email },
    { label: 'Phone', value: order.form_data?.contact?.phone },
    { label: 'SMS OK', value: order.form_data?.contact?.smsOk ? 'Yes' : 'No' }
  ];

  const filingDateData = [
    { label: 'Filing Speed', value: order.form_data?.filingSpeed },
    { label: 'Filing Estimate', value: order.form_data?.filingEstimate }
  ];

  const companyInfoData = [
    { label: 'Street Address', value: order.form_data?.address?.addr1 },
    { label: 'Address (Cont)', value: order.form_data?.address?.addr2 },
    { label: 'City', value: order.form_data?.address?.city },
    { label: 'State', value: order.form_data?.address?.usState },
    { label: 'ZIP Code', value: order.form_data?.address?.zip }
  ];

  const ownCompanyData = [
    { label: 'Address Choice', value: order.form_data?.addressChoice },
    { label: 'Street Address', value: order.form_data?.address?.addr1 },
    { label: 'Address (Cont)', value: order.form_data?.address?.addr2 },
    { label: 'City', value: order.form_data?.address?.city },
    { label: 'State', value: order.form_data?.address?.usState },
    { label: 'ZIP Code', value: order.form_data?.address?.zip }
  ];

  const billingInfoData = [
    { label: 'Country', value: order.form_data?.billing?.country },
    { label: 'Street Address', value: order.form_data?.billing?.streetAddress },
    { label: 'Address (Optional)', value: order.form_data?.billing?.addressOptional },
    { label: 'City', value: order.form_data?.billing?.city },
    { label: 'State', value: order.form_data?.billing?.state },
    { label: 'ZIP Code', value: order.form_data?.billing?.zipCode }
  ];

  const identificationData = [
    { label: 'First Name', value: order.form_data?.identification?.firstName },
    { label: 'Last Name', value: order.form_data?.identification?.lastName },
    { label: 'Foreign Individual', value: order.form_data?.identification?.isForeign === 'yes' ? 'Yes' : 'No' },
    { label: 'ID Type', value: order.form_data?.identification?.idType === 'ssn' ? 'SSN' : order.form_data?.identification?.idType === 'itin' ? 'ITIN' : 'N/A' },
    { label: order.form_data?.identification?.idType === 'ssn' ? 'SSN' : 'ITIN', value: order.form_data?.identification?.[order.form_data?.identification?.idType] },
    { label: 'Street Address', value: order.form_data?.identification?.street },
    { label: 'Address (Cont)', value: order.form_data?.identification?.address2 },
    { label: 'City', value: order.form_data?.identification?.city },
    { label: 'State', value: order.form_data?.identification?.region },
    { label: 'ZIP Code', value: order.form_data?.identification?.zip }
  ];

  const premiumServiceData = [
    { label: 'Premium Package Selected', value: order.form_data?.premiumSelected ? 'Yes' : 'No' }
  ];

  const permitLicenseData = [
    { label: 'License Package', value: order.form_data?.licensesPackage ? 'Yes - Mail applications ($99)' : 'No thanks, I\'ll do it myself' }
  ];

  const businessBankingData = [
    { label: 'Business Banking Selected', value: order.form_data?.bankingSelected ? 'Yes' : 'No' }
  ];

  const orderInfoData = [
    { label: 'Order ID', value: order.order_number },
    { label: 'Date', value: order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A' },
    { label: 'Payment Method', value: order.payment_method },
    { label: 'Shipping Method', value: order.shipping_method },
    { label: 'Entity ID', value: order.form_data?.entityId },
    { label: 'Entity Name', value: order.form_data?.entityName },
    { label: 'State Key', value: order.form_data?.stateKey },
    { label: 'State Name', value: order.form_data?.stateName },
    { label: 'State Fee', value: order.form_data?.stateFee },
    { label: 'Company Name', value: order.form_data?.companyName },
    { label: 'Designator', value: order.form_data?.designator },
    { label: 'Filing Speed', value: order.form_data?.filingSpeed },
    { label: 'Filing Estimate', value: order.form_data?.filingEstimate },
    { label: 'Address Choice', value: order.form_data?.addressChoice },
    { label: 'Premium Selected', value: order.form_data?.premiumSelected ? 'Yes' : 'No' },
    { label: 'Banking Selected', value: order.form_data?.bankingSelected ? 'Yes' : 'No' },
    { label: 'Members Count', value: order.form_data?.membersCount },
    { label: 'Licenses Package', value: order.form_data?.licensesPackage ? 'Yes' : 'No' },
  ];

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className=" rounded-3xl  p-8 text-white" style={{backgroundColor:"#2e2163"}}>
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
              <p className="text-orange-100 text-lg">Order {order.order_number || order.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-semibold hover:bg-white/30 transition-colors duration-200">
              <i className="fas fa-print mr-2"></i>
              Print
            </button>
            <button className=" text-600 px-4 py-2 rounded-xl font-semibold" style={{backgroundColor:"#ffffff", color:"#2e2163"}}>
              <i className="fas fa-edit mr-2"></i>
              Edit Order
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Get Started Table */}
          <TableSection
            title="Get Started"
            icon="fas fa-rocket"
            data={getStartedData}
          />

          {/* Contact Person Table */}
          <TableSection
            title="Contact Person"
            icon="fas fa-user"
            data={contactPersonData}
          />

          {/* Filing Date Table */}
          <TableSection
            title="Filing Date"
            icon="fas fa-calendar"
            data={filingDateData}
          />

          {/* Company Information Table */}
          <TableSection
            title="Company Information"
            icon="fas fa-building"
            data={companyInfoData}
          />

          {/* Own Company Table */}
          <TableSection
            title="Own Company"
            icon="fas fa-home"
            data={ownCompanyData}
          />

          {/* Member Information Table */}
          <MemberTableSection
            title="Member Information"
            icon="fas fa-users"
            members={order.form_data?.members}
          />

          {/* Billing Information Table */}
          <TableSection
            title="Billing Information"
            icon="fas fa-credit-card"
            data={billingInfoData}
          />

          {/* Identification Number Table */}
          <TableSection
            title="Identification Number"
            icon="fas fa-id-card"
            data={identificationData}
          />

          {/* Premium Service Table */}
          <TableSection
            title="Premium Service"
            icon="fas fa-star"
            data={premiumServiceData}
          />

          {/* Permit and License Table */}
          <TableSection
            title="Permit and License"
            icon="fas fa-file-alt"
            data={permitLicenseData}
          />

          {/* Business Banking Table */}
          <TableSection
            title="Business Banking"
            icon="fas fa-university"
            data={businessBankingData}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-2xl shadow-sm border  p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Information</h2>
            <div className="space-y-3" style={{textAlign:"left"}}>
              <div className="flex items-center gap-3">
                <div className=" p-2 rounded-lg" style={{backgroundColor:"#281d57"}}>
                  <i className="fas fa-user " style={{color:"#ffffff"}}></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{order.form_data?.contact?.firstName} {order.form_data?.contact?.lastName}</p>
                  <p className="text-sm text-gray-500">{order.form_data?.contact?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className=" p-2 rounded-lg" style={{backgroundColor:"#281d57"}}>
                  <i className="fas fa-phone " style={{color:"#ffffff"}}></i>
                </div>
                <p className="text-sm text-gray-600">{order.form_data?.contact?.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="-100 p-2 rounded-lg" style={{backgroundColor:"#281d57"}}>
                  <i className="fas fa-map-marker-alt " style={{color:"#ffffff"}}></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{order.form_data?.address?.addr1}</p>
                  {order.form_data?.address?.addr2 && <p className="text-sm text-gray-600">{order.form_data.address.addr2}</p>}
                  <p className="text-sm text-gray-600">{order.form_data?.address?.city}, {order.form_data?.address?.usState} {order.form_data?.address?.zip}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Information Table */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Order Information</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody className="" style={{textAlign:"left"}}>
                  {orderInfoData.map((item, index) => (
                    <tr key={index} className="">
                      <td className="px-6 py-4 text-sm font-medium text-gray-600 w-1/3">{item.label}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.value || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;