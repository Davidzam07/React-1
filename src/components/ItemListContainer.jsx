import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { products as seedProducts } from "../data/products";
import ItemList from "./ItemList";

const ItemListContainer = ({ saludo }) => {
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const { categoryId } = useParams();

useEffect(() => {
    async function fetchProducts() {
        try {
            setLoading(true);
            setError("");
            if (!db) {
                throw new Error("Firebase no configurado");
            }
            const baseRef = collection(db, "items");
            const q = categoryId
                ? query(baseRef, where("category", "==", categoryId))
                : baseRef;
            let snapshot = await getDocs(q);
            // Limpiar y actualizar productos solo en la página principal (sin filtro de categoría)
            if (!categoryId) {
                // Obtener todos los documentos para limpiar
                const allSnapshot = await getDocs(baseRef);
                const validIds = new Set(seedProducts.map(p => String(p.id)));
                
                // Eliminar documentos que no sean los 4 productos válidos
                const deletePromises = [];
                allSnapshot.docs.forEach((docSnapshot) => {
                    if (!validIds.has(docSnapshot.id)) {
                        deletePromises.push(deleteDoc(docSnapshot.ref));
                    }
                });
                if (deletePromises.length > 0) {
                    await Promise.all(deletePromises);
                }
                
                // Actualizar/sembrar los 4 productos correctos
                const needsUpdate = allSnapshot.empty || allSnapshot.docs.some(d => !d.data().name);
                if (needsUpdate || deletePromises.length > 0) {
                    for (const p of seedProducts) {
                        const ref = doc(baseRef, String(p.id));
                        const payload = {
                            name: p.name,
                            price: Number(p.price) || 0,
                            category: p.category,
                            img: p.img,
                            stock: typeof p.stock === "number" ? p.stock : 10,
                        };
                        // eslint-disable-next-line no-await-in-loop
                        await setDoc(ref, payload, { merge: true });
                    }
                }
                // Releer después de limpiar y actualizar
                snapshot = await getDocs(baseRef);
            }
            const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            setItems(list);
        } catch (err) {
            setError("No se pudo cargar el catálogo");
        } finally {
            setLoading(false);
        }
    }
    fetchProducts();
}, [categoryId]);

if (loading) return <h2 style={{ textAlign: "center" }}>Cargando catálogo...</h2>;
if (error) return <h2 style={{ textAlign: "center" }}>{error}</h2>;

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

