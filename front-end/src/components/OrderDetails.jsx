
import React, { useState, useEffect } from 'react';
import OrderService from '../services/OrderService';
import GenerativeAiSearch from './GenerativeAiSearch';

const OrderDetails = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchOrderDetails = async () => {
        try {
          setLoading(true);
          const orderDetailsData = await OrderService.getOrderDetails();
          setOrderDetails(orderDetailsData);
          setLoading(false);
        } catch (error) {
          setError('Error fetching order details');
          setLoading(false);
          console.error('Error fetching order details:', error);
        }
      };
  
      fetchOrderDetails();
    }, []);
  
    return (
      <div>
        <h2 className=" font-bold mb-2">Order Details</h2>
        <GenerativeAiSearch  />
        <table className="min-w-full bg-gray-600 table-auto">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="px-2 py-2 text-left border border-gray-500 text-md">Order ID</th>
              <th className="px-2 py-2 text-left border border-gray-500 text-md">Item Name</th>
              <th className="px-2 py-2 text-left border border-gray-500 text-md">Quantity</th>
              <th className="px-2 py-2 text-left border border-gray-500 text-md">Price</th>
              <th className="px-2 py-2 text-left border border-gray-500 text-md">Date of Purchase</th>
              <th className="px-2 py-2 text-left border border-gray-500 text-md">Customer</th>
              <th className="px-2 py-2 text-left border border-gray-500 text-md">Shop Name</th>
              <th className="px-2 py-2 text-left border border-gray-500 text-md">Payment Status</th>
              <th className="px-2 py-2 text-left border border-gray-500 text-md">Payment Method</th>
              <th className="px-2 py-2 text-left border border-gray-500 text-md">Transaction ID</th>
              <th className="px-2 py-2 text-left border border-gray-500 text-md">Discount Amount</th>
              <th className="px-2 py-2 text-left border border-gray-500 text-md">Coupon Code</th>
              <th className="px-2 py-2 text-left border border-gray-500 text-md">Tax Amount</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="13" className="text-center py-4">Loading...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="13" className="text-center text-red-500 py-4">{error}</td>
              </tr>
            )}
            {orderDetails.map((order) => (
              <tr key={order.id} className="bg-gray-800 text-gray-300">
                <td className="px-2 py-2 border border-gray-500">{order.id}</td>
                <td className="px-2 py-2 border border-gray-500">{order.itemName}</td>
                <td className="px-2 py-2 border border-gray-500">{order.quantity}</td>
                <td className="px-2 py-2 border border-gray-500 text-orange-200">${order.price}</td>
                <td className="px-2 py-2 border border-gray-500">{new Date(order.dateOfPurchase).toLocaleString()}</td>
                <td className="px-2 py-2 border border-gray-500">{`${order.customer.name} ${order.customer.address}`}</td>
                <td className="px-2 py-2 border border-gray-500">{order.shopName}</td>
                <td className="px-2 py-2 border text-green-500 border-gray-500 italic">{order.paymentStatus}</td>

                <td className="px-2 py-2 border border-gray-500">{order.paymentMethod}</td>
                <td className="px-2 py-2 border border-gray-500">{order.transactionId}</td>
                <td className="px-2 py-2 border border-gray-500">${order.discountAmount}</td>
                <td className="px-2 py-2 border border-gray-500">{order.couponCode}</td>
                <td className="px-2 py-2 border border-gray-500">${order.taxAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default OrderDetails;
