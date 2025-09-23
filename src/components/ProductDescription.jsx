import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const ProductDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!product) return <div className="p-4">No product found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button
        onClick={() => navigate("/products")}
        className="mb-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        ← Back to Products
      </button>

      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <img
        src={`${API_URL}${product.image}`}
        alt={product.name}
        className="w-full h-64 object-cover rounded mb-4"
        crossOrigin="anonymous"
        onError={(e) => {
          e.target.src = "/fallback.png";
        }}
      />
      <p className="text-gray-700 mb-2">
        <strong>Price:</strong> ksh{product.price}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Category:</strong> {product.category}
      </p>
      <p className="text-gray-700">
        <strong>Description:</strong> {product.description}
      </p>
    </div>
  );
};

export default ProductDescription;
