import { useState, useEffect } from "react";

const ItemCount = ({ initial = 1, stock = Infinity, onAdd }) => {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    setCount((c) => Math.min(Math.max(c, 1), stock));
  }, [stock]);

  function dec() {
    setCount((c) => Math.max(1, c - 1));
  }

  function inc() {
    setCount((c) => Math.min(stock, c + 1));
  }

  const disabled = stock <= 0;

  return (
    <div className="item-count">
      {disabled ? (
        <p>Producto sin stock</p>
      ) : (
        <>
          <div className="controls">
            <button onClick={dec} disabled={count <= 1}>-</button>
            <span>{count}</span>
            <button onClick={inc} disabled={count >= stock}>+</button>
          </div>
          <button onClick={() => onAdd?.(count)} disabled={disabled}>
            Agregar al carrito
          </button>
        </>
      )}
    </div>
  );
};

export default ItemCount;

