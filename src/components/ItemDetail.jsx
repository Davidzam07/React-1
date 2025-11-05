import { useState } from "react";
import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext";
import Notification from "./Notification";

const ItemDetail = ({ product }) => {
  const { addItem } = useCart();
  const [showNotification, setShowNotification] = useState(false);

  function handleAdd(quantity) {
    addItem(product, quantity);
    setShowNotification(true);
  }

  return (
    <div className="detalle">
      {showNotification && (
        <Notification 
          message="¡Producto agregado al carrito!"
          onClose={() => setShowNotification(false)}
        />
      )}
      <div className="detalle-imagen">
        <img src={product.img} alt={product.name} />
      </div>
      <div className="detalle-info">
        <h2>{product.name}</h2>
        <p>$ {product.price}</p>
        <p>Categoría: {product.category}</p>
        <ItemCount stock={product.stock} onAdd={handleAdd} />
      </div>
    </div>
  );
};

export default ItemDetail;
