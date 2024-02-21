// Customers.js
import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setLoading(true);
                const customersData = await CustomerService.getAllCustomers();
                setCustomers(customersData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching customers');
                setLoading(false);
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    return (
        <div>
            <h2 className="font-bold mb-2">Customers</h2>
            <table className="min-w-full bg-gray-600 table-auto">
                <thead className="bg-gray-700 text-gray-300">
                    <tr>
                        <th className="px-2 py-2 text-left border border-gray-500">ID</th>
                        <th className="px-2 py-2 text-left border border-gray-500">Name</th>
                        <th className="px-2 py-2 text-left border border-gray-500">Email</th>
                        <th className="px-2 py-2 text-left border border-gray-500">Phone</th>
                        <th className="px-2 py-2 text-left border border-gray-500">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan="5" className="text-center py-4">Loading...</td>
                        </tr>
                    )}
                    {error && (
                        <tr>
                            <td colSpan="5" className="text-center text-red-500 py-4">{error}</td>
                        </tr>
                    )}
                    {customers.map((customer) => (
                        <tr key={customer.id} className="bg-gray-800 text-gray-300">
                            <td className="px-2 py-2 border border-gray-500">{customer.id}</td>
                            <td className="px-2 py-2 border border-gray-500">{customer.name}</td>
                            <td className="px-2 py-2 border border-gray-500">{customer.email}</td>
                            <td className="px-2 py-2 border border-gray-500">{customer.phone}</td>
                            <td className="px-2 py-2 border border-gray-500">{customer.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Customers;
