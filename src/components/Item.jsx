import { Link } from "react-router-dom";
import "../App.css";

const Item = ({ product }) => {
return (
    <div className="card">
    <img src={product.img} alt={product.name} />
    <h3>{product.name}</h3>
    <p>${product.price}</p>
    <Link to={`/item/${product.id}`}>Ver detalles</Link>
    </div>
);
};

export default Item;
