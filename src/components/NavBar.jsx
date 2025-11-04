import { CartWidget } from "./CartWidget.jsx";
import { Link } from "react-router-dom";
import "../App.css";

export const NavBar = () => {
return (
    <nav className="navbar">
    <h1 className="logo">AURAX</h1>
<ul className="nav-links">
    <li>
        <Link to="/">Inicio</Link>
    </li>
    <li>
        <Link to="/category/ropa">Ropa</Link>
    </li>
    <li>
        <Link to="/category/calzado">Calzado</Link>
    </li>
    <li>
        <Link to="/category/accesorios">Accesorios</Link>
    </li>
    <li>
        <Link to="/cart">Carrito</Link>
    </li>
    <li>
        <Link to="/checkout">Checkout</Link>
    </li>
</ul>
    <CartWidget />
    </nav>
);
};



