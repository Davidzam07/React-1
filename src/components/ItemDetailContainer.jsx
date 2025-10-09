import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";

const ItemDetailContainer = () => {
const [product, setProduct] = useState(null);
const { id } = useParams();

useEffect(() => {
    const getProduct = new Promise((resolve) => {
    setTimeout(() => {
        resolve(products.find((p) => p.id === parseInt(id)));
    }, 1000);
    });

    getProduct.then((res) => setProduct(res));
}, [id]);

if (!product) return <h2 style={{ textAlign: "center" }}>Cargando...</h2>;

return (
    <div className="detalle">
    <img src={product.img} alt={product.name} />
    <h2>{product.name}</h2>
    <p>Precio: ${product.price}</p>
    <p>Categoría: {product.category}</p>
    </div>
);
};

export default ItemDetailContainer;
