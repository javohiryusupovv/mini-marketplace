import { useEffect, useState } from "react";
import CartList from "./CartList";

export default function CartApp() {
  const [cart, setCart] = useState([]);

  // localStorage get
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  // localStorage add
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🔥 event check
  useEffect(() => {
    const handler = (e) => {
      const product = e.detail;

      setCart(prev => {
        const exist = prev.find(i => i.id === product.id);

        if (exist) {
          return prev.map(i =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }

        return [...prev, { ...product, quantity: 1 }];
      });
    };

    window.addEventListener("add-to-cart", handler);
    return () => window.removeEventListener("add-to-cart", handler);
  }, []);

  return <CartList cart={cart} setCart={setCart} />;
}
