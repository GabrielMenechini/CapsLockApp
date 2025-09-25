import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const add = (product, quantity) => {
    setItems((currentItems) => {
      const itemIndex = currentItems.findIndex(item => item.id === product.id);
      if (itemIndex >= 0) {
        const updatedItems = [...currentItems];
        updatedItems[itemIndex].qty += quantity;
        return updatedItems;
      } else {
        return [...currentItems, { ...product, qty: quantity }];
      }
    });
  };

  const removeOne = (productId) => {
    setItems((currentItems) => {
      const itemIndex = currentItems.findIndex(item => item.id === productId);
      if (itemIndex >= 0) {
        const updatedItems = [...currentItems];
        if (updatedItems[itemIndex].qty > 1) {
          updatedItems[itemIndex].qty -= 1;
          return updatedItems;
        } else {
          return updatedItems.filter(item => item.id !== productId);
        }
      }
      return currentItems;
    });
  };

  const removeAll = (productId) => {
    setItems((currentItems) => currentItems.filter(item => item.id !== productId));
  };

  const clear = () => {
    setItems([]);
  };

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [items]);

  return (
    <CartContext.Provider value={{ items, add, removeOne, removeAll, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
