import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Dummy implementations for demonstration
  const add = (item, qty) => {};
  const removeOne = (id) => {};
  const removeAll = (id) => {};
  const clear = () => {};

  return (
    <CartContext.Provider value={{ items, add, removeOne, removeAll, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}