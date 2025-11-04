import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext";

const ItemDetail = ({ product }) => {
  const { addItem } = useCart();
  const stock = typeof product.stock === "number" ? product.stock : Infinity;

  function handleAdd(quantity) {
    addItem(product, quantity);
  }

  const imgSrc = product?.img
    ? (product.img.startsWith("http") ? product.img : (product.img.startsWith("/") ? product.img : `/${product.img}`))
    : "/img/remera.jpg";

  return (
    <div className="detalle">
      <img src={imgSrc} alt={product.name} onError={(e) => { e.currentTarget.src = "/img/remera.jpg"; }} />
      <h2>{product.name}</h2>
      <p>Precio: ${product.price}</p>
      <p>Categoría: {product.category}</p>
      <ItemCount stock={stock} onAdd={handleAdd} />
    </div>
  );
};

export default ItemDetail;
