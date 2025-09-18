// // src/components/Navbar.jsx
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import { ShoppingCartIcon } from "@heroicons/react/24/outline";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const { cart } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Hide navbar ONLY on login and register pages
//   if (
//     location.pathname.startsWith("/login") ||
//     location.pathname.startsWith("/register")
//   ) {
//     return null;
//   }

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-[#ff3f8e] text-white px-6 py-3 flex justify-between items-center shadow-lg">
//       {/* Left: Logo */}
//       <Link to="/" className="text-2xl font-bold">
//         🛍️ Fashion Store
//       </Link>

//       {/* Center: Links */}
//       <div className="space-x-6">
//         <Link to="/" className="hover:underline">
//           Home
//         </Link>
//         <Link to="/products" className="hover:underline">
//           Products
//         </Link>

//         {/* Only admins see admin dashboard */}
//         {isAdmin && (
//   <Link to="/admin" className="hover:underline">
//     Admin
//   </Link>
// )}

//         {/* Customers can view their own orders */}
//         {user && user.role === "customer" && (
//           <Link to="/my-orders" className="hover:underline">
//             My Orders
//           </Link>
//         )}
//       </div>

//       {/* Right: Auth + Cart */}
//       <div className="flex items-center space-x-4">
//         {/* Cart only for logged-in customers */}
//         {user && user.role === "customer" && (
//           <Link to="/cart" className="relative flex items-center">
//             <ShoppingCartIcon className="h-6 w-6 text-white" />
//             {cart.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-white text-[#ff3f8e] text-xs font-bold px-2 py-0.5 rounded-full">
//                 {cart.length}
//               </span>
//             )}
//           </Link>
//         )}

//         {/* Auth Section */}
//         {user ? (
//           <>
//             <span className="font-semibold hidden sm:inline">
//               Hello, {user.email}
//             </span>
//             <button
//               onClick={handleLogout}
//               className="bg-white text-[#ff3f8e] px-4 py-1 rounded-lg font-semibold hover:bg-gray-100"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="bg-white text-[#ff3f8e] px-4 py-1 rounded-lg font-semibold hover:bg-gray-100"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="bg-white text-[#ff3f8e] px-4 py-1 rounded-lg font-semibold hover:bg-gray-100"
//             >
//               Signup
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }


// src/components/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth(); // ✅ added isAdmin here
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar ONLY on login and register pages
  if (
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register")
  ) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#ff3f8e] text-white px-6 py-3 flex justify-between items-center shadow-lg">
      {/* Left: Logo */}
      <Link to="/" className="text-2xl font-bold">
        🛍️ Winny Studio's
      </Link>

      {/* Center: Links */}
      <div className="space-x-6">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/products" className="hover:underline">
          Products
        </Link>

        {/* Only admins see admin dashboard */}
        {isAdmin && (
          <Link to="/admin" className="hover:underline">
            Admin
          </Link>
        )}

        {/* Customers can view their own orders */}
        {user && user.role === "customer" && (
          <Link to="/my-orders" className="hover:underline">
            My Orders
          </Link>
        )}
      </div>

      {/* Right: Auth + Cart */}
      <div className="flex items-center space-x-4">
        {/* Cart only for logged-in customers */}
        {user && user.role === "customer" && (
          <Link to="/cart" className="relative flex items-center">
            <ShoppingCartIcon className="h-6 w-6 text-white" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-[#ff3f8e] text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        )}

        {/* Auth Section */}
        {user ? (
          <>
            <span className="font-semibold hidden sm:inline">
              Hello, {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-white text-[#ff3f8e] px-4 py-1 rounded-lg font-semibold hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-[#ff3f8e] px-4 py-1 rounded-lg font-semibold hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-[#ff3f8e] px-4 py-1 rounded-lg font-semibold hover:bg-gray-100"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}