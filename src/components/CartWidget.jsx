import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export const CartWidget = () => {
const { totalItems } = useCart();
return (
    <Link to="/cart" className="cart-widget" aria-label="Ir al carrito">
    🛒 <span className="cart-count">{totalItems}</span>
    </Link>
);
};