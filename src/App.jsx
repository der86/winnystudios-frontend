import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import HomePage from "./components/HomePage.jsx";
import Cart from "./components/Cart.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import Checkout from "./pages/Checkout.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MyOrder from "./pages/MyOrder.jsx";
import Layout from "./components/Layout.jsx";
import ProductDescription from "./components/ProductDescription.jsx";

function App() {
  useEffect(() => {
    // Add DataFast script
    const script = document.createElement("script");
    script.defer = true;
    script.setAttribute("data-website-id", "68d66023e7db27ae2a088687");
    script.setAttribute("data-domain", "www.winnystudios.com");
    script.src = "https://datafa.st/js/script.js";
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Routes>
      {/* Public Pages wrapped with Layout */}
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout>
            <Cart />
          </Layout>
        }
      />
      <Route
        path="/products"
        element={
          <Layout>
            <ProductGrid />
          </Layout>
        }
      />

      {/* ✅ Single Product Page */}
      <Route
        path="/products/:id"
        element={
          <Layout>
            <ProductDescription />
          </Layout>
        }
      />

      <Route
        path="/checkout"
        element={
          <Layout>
            <Checkout />
          </Layout>
        }
      />
      <Route
        path="/my-orders"
        element={
          <Layout>
            <MyOrder />
          </Layout>
        }
      />
      <Route
        path="/admin-orders"
        element={
          <Layout>
            <AdminOrders />
          </Layout>
        }
      />

      {/* Admin Protected Pages (can choose to keep Navbar or not) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            {/* ❌ No Navbar here, admin has its own UI */}
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
