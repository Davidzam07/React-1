import { CartWidget } from "./CartWidget";
export const NavBar = () => {
return (
<>
    <nav className="navbar">
    <h1 className="logo">AURA</h1>
    <ul className="nav-links">
    <li>
        <a href="#">Inicio</a>
    </li>
    <li>
        <a href="#">Productos</a>
    </li>
    <li>
        <a href="#">Contacto</a>
    </li>
    </ul>
    <CartWidget />
    </nav>
    
</>
);
};


