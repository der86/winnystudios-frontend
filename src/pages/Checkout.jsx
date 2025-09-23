import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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

  // ✅ Handle form input changes
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
      phone: form.phone,
      address: form.address,
      notes: form.notes || "",
      items: formattedItems,
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

      // ✅ safely parse response
      let data;
      try {
        data = await res.json();
      } catch (err) {
        throw new Error("Invalid server response");
      }

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to place order");
      }

      // ✅ Clear cart only on success
      clearCart();

      // ✅ Redirect to My Orders page
      navigate("/my-orders");
    } catch (err) {
      console.error("❌ Order failed:", err);
      alert(`Failed to place order: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty ?? 1),
    0
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow"
    >
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <textarea
        name="notes"
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />

      <p className="mb-4 font-medium">Total: ${total.toFixed(2)}</p>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Placing..." : "Place Order"}
      </button>
    </form>
  );
}
