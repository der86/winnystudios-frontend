// src/pages/Checkout.jsx
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "",
    address: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Handle form changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("⚠️ Your cart is empty!");
      return;
    }

    const formattedItems = cart.map((item) => ({
      productId: item._id || item.id,
      name: item.name,
      price: item.price,
      qty: item.qty ?? 1,
    }));

    const orderData = {
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        notes: form.notes || "",
      },
      items: formattedItems,
      total: formattedItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      ),
    };

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unknown error occurred");
      }

      // ✅ Clear cart ONLY if order was successful
      clearCart();
      navigate("/my-orders");
    } catch (err) {
      console.error("Order failed:", err);
      alert(`❌ Failed to place order: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty ?? 1),
    0
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        {/* Phone Number */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        {/* Address */}
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        {/* Notes */}
        <textarea
          name="notes"
          placeholder="Order Notes (optional)"
          value={form.notes}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        {/* Order Summary */}
        <h2 className="font-semibold mb-2">Order Summary:</h2>
        <div className="text-sm mb-3">
          {cart.map((item) => (
            <p key={item._id || item.id}>
              {item.name} x{item.qty ?? 1} — ${item.price * (item.qty ?? 1)}
            </p>
          ))}
        </div>

        <p className="mt-2 font-bold">Total: ${total.toFixed(2)}</p>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-[#ff3f8e] text-white py-2 rounded-lg hover:bg-[#e5367b] disabled:opacity-60"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
