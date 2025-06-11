// src/screens/MyOrders.js
import React, { useEffect, useState } from 'react';

export default function MyOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/myorders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: localStorage.getItem("userEmail") })
                });

                const json = await response.json();
                if (json.success) {
                    setOrders(json.order_data);
                } else {
                    alert(json.message || "Failed to fetch orders");
                }
            } catch (error) {
                alert("Error fetching orders: " + error.message);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">My Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order, index) => (
                    <div key={index} className="card mb-3 p-3 shadow-sm">
                        <h5 className="mb-3 text-muted">Order placed on: {order[0].order_date}</h5>
                        <ul className="list-group">
                            {order.slice(1).map((item, idx) => (
                                <li className="list-group-item d-flex justify-content-between" key={idx}>
                                    <span>{item.name} (x{item.qty}) - {item.size}</span>
                                    <span>₹{item.price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}
