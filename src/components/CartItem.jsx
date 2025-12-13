export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove
}) {
  return (
    <div className="cart-item">
      <article className="cart-item-imgbox">
        <img src={item.image} alt={item.title} />
      </article>

      <div className="cart-info">
        <h4>{item.title}</h4>
        <span className="price">${item.price}</span>

        <div className="qty-box">
          <button onClick={() => onDecrease(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onIncrease(item.id)}>+</button>
        </div>
      </div>

      <button
        className="remove-btn"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </div>
  );
}
