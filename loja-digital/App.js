import React from "react";
import { AppNavigation } from "./src/navigation/AppNavigation";
import { CartProvider } from "./src/context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <AppNavigation />
    </CartProvider>
  );
}
