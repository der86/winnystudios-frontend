import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
      {/* 🔗 Clicking anywhere here goes to ProductDescription */}
      <Link to={`/products/${product.id}`} className="w-full text-center">
        <div className="w-32 h-32 bg-gray-200 mb-4 flex items-center justify-center mx-auto">
          {product.image && (
            <img
              src={`${
                import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
              }${product.image}`}
              alt={product.name}
              className="h-40 w-full object-cover rounded mb-3"
              crossOrigin="anonymous"
              onError={(e) => {
                e.target.src = "/fallback.png";
              }}
            />
          )}
        </div>
        <h3 className="font-semibold mb-2">{product.name}</h3>
        <p className="mb-2">${product.price}</p>
      </Link>

      {/* 🛒 Add to Cart stays independent */}
      <button
        onClick={() => addToCart(product)}
        className="bg-[#ff3f8e] text-white px-4 py-2 rounded-full hover:bg-[#e5367b]"
      >
        Add to Cart
      </button>
    </div>
  );
}
