import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // ✅ Handle Cloudinary: use first image if array, or single image
  const productImage =
    product.image ||
    (Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : null);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
      {/* 🔗 Clicking anywhere goes to ProductDescription */}
      <Link
        to={`/products/${product._id || product.id}`}
        className="w-full text-center"
      >
        <div className="w-32 h-32 bg-gray-200 mb-4 flex items-center justify-center mx-auto overflow-hidden rounded">
          {productImage ? (
            <img
              src={productImage} // ✅ Cloudinary URL is already absolute
              alt={product.name}
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
              onError={(e) => {
                e.target.src = "/fallback.png"; // fallback if Cloudinary fails
              }}
            />
          ) : (
            <img
              src="/fallback.png"
              alt="No image"
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <h3 className="font-semibold mb-2">{product.name}</h3>
        <p className="mb-2">ksh{product.price}</p>
      </Link>

      {/* 🛒 Add to Cart button */}
      <button
        onClick={() => addToCart(product)}
        className="bg-[#ff3f8e] text-white px-4 py-2 rounded-full hover:bg-[#e5367b]"
      >
        Add to Cart
      </button>
    </div>
  );
}
