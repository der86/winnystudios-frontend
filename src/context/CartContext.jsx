import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => (item._id || item.id) === (product._id || product.id)
      );

      if (existing) {
        // increment qty if already in cart
        return prevCart.map((item) =>
          (item._id || item.id) === (product._id || product.id)
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      }

      // otherwise add new product with qty = 1
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => (item._id || item.id) !== id)
    );
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item._id || item.id) === id ? { ...item, qty } : item
      )
    );
  };

  // ✅ Added clearCart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
