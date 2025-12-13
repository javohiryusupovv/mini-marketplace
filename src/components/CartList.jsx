import CartItem from "./CartItem";

export default function CartList({ cart, setCart }) {
  const increaseQty = (id) => {
    setCart((cart) =>
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((cart) =>
      cart.flatMap((item) => {
        if (item.id !== id) return item;
        if (item.quantity === 1) return [];
        return { ...item, quantity: item.quantity - 1 };
      })
    );
  };

  const removeItem = (id) => {
    setCart((cart) => cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <aside className="cart-box">
      <h2 className="cart-title">Cart</h2>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <h3 className="cart-empty-title">Your cart is empty</h3>
          <p className="cart-empty-desc">No items have been added yet</p>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={increaseQty}
              onDecrease={decreaseQty}
              onRemove={removeItem}
            />
          ))}

          <div className="cart-total">
            <span>Total:</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </aside>
  );
}
