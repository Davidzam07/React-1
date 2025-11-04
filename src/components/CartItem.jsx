import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeItem } = useCart();
  return (
    <div className="cart-item">
      <img src={item.img} alt={item.name} style={{ width: 64, height: 64, objectFit: "cover" }} />
      <div style={{ flex: 1, marginLeft: 8 }}>
        <h4>{item.name}</h4>
        <p>Cantidad: {item.quantity}</p>
        <p>Precio unitario: ${item.price}</p>
        <p>Subtotal: ${item.price * item.quantity}</p>
      </div>
      <button onClick={() => removeItem(item.id)}>Quitar</button>
    </div>
  );
};

export default CartItem;

