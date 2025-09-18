import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    }
    load();
  }, []);

  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      
      {products.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">No products available</p>
      ) : (
        products.map((product) => <ProductCard key={product._id || product.id} product={product} />)
      )}
    </div>
  );
}
