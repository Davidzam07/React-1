import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

const Cart = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>Carrito vacío</h2>
        <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Tu carrito</h2>
      {items.map((it) => (
        <CartItem key={it.id} item={it} />
      ))}
      <hr />
      <p>Total de unidades: {totalItems}</p>
      <h3>Total: ${totalPrice}</h3>
      <button onClick={clearCart}>Vaciar carrito</button>
      <Link to="/checkout" style={{ marginLeft: 12 }}>Ir al checkout</Link>
    </div>
  );
};

export default Cart;

