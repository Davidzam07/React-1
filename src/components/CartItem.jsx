import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeItem } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.img} alt={item.name} />
      </div>
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p>Precio: ${item.price}</p>
        <p>Cantidad: {item.quantity}</p>
        <p>Subtotal: ${item.price * item.quantity}</p>
        <button
          onClick={() => removeItem(item.id)}
          className="cart-button"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;

