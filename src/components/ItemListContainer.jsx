import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import ItemList from "./ItemList";

const ItemListContainer = ({ saludo }) => {
const [items, setItems] = useState([]);
const { categoryId } = useParams();

useEffect(() => {
    const getProducts = new Promise((resolve) => {
    setTimeout(() => resolve(products), 800);
    });

    getProducts.then((res) => {
    if (categoryId) {
        setItems(res.filter((prod) => prod.category === categoryId));
} else {
        setItems(res);
}
    });
}, [categoryId]);

return (
    <div>
    <h2>{saludo || "Catálogo de productos"}</h2>
    <div className="catalog">
        <ItemList items={items} />
    </div>
    </div>
);
};

export default ItemListContainer;

