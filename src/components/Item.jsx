import { Link } from "react-router-dom";
import "../App.css";

const Item = ({ product }) => {
const imgSrc = product?.img
  ? (product.img.startsWith("http") ? product.img : (product.img.startsWith("/") ? product.img : `/${product.img}`))
  : "/img/remera.jpg"; 

const productName = product?.name || "Sin nombre";

return (
    <div className="card">
    <img src={imgSrc} alt={productName} onError={(e) => { e.currentTarget.src = "/img/remera.jpg"; }} />
    <h3 style={{ display: "block", visibility: "visible" }}>{productName}</h3>
    <p>${product?.price || 0}</p>
    <Link to={`/item/${product?.id}`}>Ver detalles</Link>
    </div>
);
};

export default Item;
