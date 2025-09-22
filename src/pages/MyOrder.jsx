// src/pages/MyOrders.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function MyOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(`${API_URL}/api/orders/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          setOrders(data);
        } else {
          console.error("❌ Failed to fetch orders:", data.error);
        }
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }

    if (token) fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">My Orders</h1>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Order <span className="text-gray-500">#{order._id}</span>
              </h2>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : order.status === "shipped"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Customer Info */}
            <div className="mb-4 text-sm text-gray-700">
              <p>
                <b>Phone:</b> {order.customer.phone}
              </p>
              <p>
                <b>Address:</b> {order.customer.address}
              </p>
              {order.customer.notes && (
                <p>
                  <b>Notes:</b> {order.customer.notes}
                </p>
              )}
            </div>

            {/* Items */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Items</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} x{item.qty} — ${item.price * item.qty}
                  </li>
                ))}
              </ul>
            </div>

            {/* Total + Date */}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <p>
                <b>Total:</b> ${order.total}
              </p>
              <p>
                <b>Date:</b>{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
