import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty ?? 1),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id || item.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
            >
              <span className="flex-1">{item.name}</span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    updateQty(item._id || item.id, (item.qty ?? 1) - 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span>{item.qty ?? 1}</span>
                <button
                  onClick={() =>
                    updateQty(item._id || item.id, (item.qty ?? 1) + 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <span className="w-20 text-right">
                ksh{(item.price * (item.qty ?? 1)).toFixed(2)}
              </span>

              <button
                onClick={() => removeFromCart(item._id || item.id)}
                className="ml-4 bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between font-semibold text-lg pt-4 border-t">
            <span>Total:</span>
            <span>ksh{total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-[#ff3f8e] text-white py-3 rounded-lg hover:bg-[#e5367b]"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
