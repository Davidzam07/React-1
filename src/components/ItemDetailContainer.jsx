import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const { id } = useParams();

useEffect(() => {
    async function fetchProduct() {
        try {
            setLoading(true);
            setError("");
            if (!db) {
                throw new Error("Firebase no configurado");
            }
            const ref = doc(db, "items", id);
            const snapshot = await getDoc(ref);
            if (!snapshot.exists()) {
                setError("Producto no encontrado");
                setProduct(null);
                return;
            }
            setProduct({ id: snapshot.id, ...snapshot.data() });
        } catch (err) {
            setError("No se pudo cargar el producto");
        } finally {
            setLoading(false);
        }
    }
    fetchProduct();
}, [id]);

if (loading) return <h2 style={{ textAlign: "center" }}>Cargando...</h2>;
if (error) return <h2 style={{ textAlign: "center" }}>{error}</h2>;

return <ItemDetail product={product} />;
};

export default ItemDetailContainer;
