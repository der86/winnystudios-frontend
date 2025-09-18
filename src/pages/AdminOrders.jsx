import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` }, // ✅ fixed
        });

        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    }
    loadOrders();
  }, [token]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-md p-4 rounded-lg">
              <h2 className="font-bold">
                {order.customer?.name} — {order.customer?.email}
              </h2>
              <p className="text-gray-600">{order.customer?.address}</p>
              <ul className="mt-2">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} x{item.qty} — ${item.price * item.qty}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
