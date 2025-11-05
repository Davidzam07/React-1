import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, total, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="empty-cart">
                <h2>Tu carrito está vacío</h2>
                <Link to="/" className="btn">Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2 className="cart-title">Tu Carrito</h2>
            <div className="cart-items">
                {cart.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>
            <div className="cart-summary">
                <h3>Total: ${total.toLocaleString('es-AR')}</h3>
                <div className="cart-buttons">
                    <button onClick={clearCart} className="cart-button">Vaciar carrito</button>
                    <Link to="/checkout" className="cart-button">Finalizar compra</Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;

