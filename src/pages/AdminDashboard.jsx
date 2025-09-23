// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import api from "../utils/axios"; // ✅ axios instance
import { useAuth } from "../context/AuthContext";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminDashboard() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [files, setFiles] = useState([]); // ✅ multiple images
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch all products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(data);
    } catch (err) {
      console.error(
        "❌ Fetch products failed:",
        err.response?.data || err.message
      );
      alert("Failed to load products.");
    }
  };

  // Add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);

      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          formData.append("images", files[i]); // ✅ append multiple
        }
      }

      await api.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setNewProduct({ name: "", price: "", description: "" });
      setFiles([]);
      fetchProducts();
    } catch (err) {
      console.error("❌ Add failed:", err.response?.data || err.message);
      alert("Failed to add product.");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await api.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("❌ Delete failed:", err.response?.data || err.message);
      alert("Failed to delete product.");
    }
  };

  // Start editing
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description || "",
    });
  };

  // Save edits
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);

      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          formData.append("images", files[i]);
        }
      }

      await api.put(`/api/products/${editingProduct._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setEditingProduct(null);
      setNewProduct({ name: "", price: "", description: "" });
      setFiles([]);
      fetchProducts();
    } catch (err) {
      console.error("❌ Update failed:", err.response?.data || err.message);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Product Form */}
      <form
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
        className="mb-6 bg-white p-4 shadow rounded-lg"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>

        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 mr-2"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-2 mr-2"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          required
        />

        {/* ✅ Description */}
        <textarea
          placeholder="Product Description"
          className="border p-2 mr-2 w-full mt-2"
          rows="3"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />

        {/* ✅ Multiple images */}
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
          className="border p-2 mr-2 mt-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingProduct ? "Update" : "Add"}
        </button>

        {editingProduct && (
          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              setNewProduct({ name: "", price: "", description: "" });
              setFiles([]);
            }}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Products List */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">All Products</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Images</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="border p-2 text-center">
                  {product.images && product.images.length > 0 ? (
                    product.images.map((img, i) => (
                      <img
                        key={i}
                        src={`${API_URL}${img}`}
                        alt={product.name}
                        className="h-20 w-20 object-cover rounded inline-block mr-2"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          e.target.src = "/fallback.png";
                        }}
                      />
                    ))
                  ) : (
                    <span className="text-gray-400">No Images</span>
                  )}
                </td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">ksh{product.price}</td>
                <td className="border p-2 max-w-xs truncate">
                  {product.description}
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
