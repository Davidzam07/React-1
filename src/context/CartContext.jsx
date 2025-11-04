import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); 

  function addItem(product, quantity) {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      const maxStock = typeof product.stock === "number" ? product.stock : Infinity;
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, maxStock);
        return prev.map((p) => (p.id === product.id ? { ...p, quantity: newQty } : p));
      }
      const clampedQty = Math.min(quantity, maxStock);
      return [...prev, { ...product, quantity: clampedQty }];
    });
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = useMemo(() => items.reduce((acc, it) => acc + it.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((acc, it) => acc + it.quantity * (it.price || 0), 0), [items]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, clearCart, totalItems, totalPrice }),
    [items, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


