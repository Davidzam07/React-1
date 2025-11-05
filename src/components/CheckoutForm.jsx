import { useState } from "react";
import { useCart } from "../context/CartContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../main.jsx"; // Update Firebase import
import { Link } from "react-router-dom";

const CheckoutForm = () => {
    const [orderId, setOrderId] = useState("");
    const { cart, total, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const order = {
            buyer: formData,
            items: cart,
            total: total,
            date: new Date()
        };

        try {
            const docRef = await addDoc(collection(db, "orders"), order);
            setOrderId(docRef.id);
            clearCart();
            setFormData({
                name: "",
                email: "",
                phone: "",
                address: ""
            });
        } catch (error) {
            console.error("Error al crear la orden:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (orderId) {
        return (
            <div className="checkout-success">
                <h2>¡Gracias por tu compra!</h2>
                <p>Tu número de orden es: <span>{orderId}</span></p>
                <Link to="/" className="btn-back">Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h2>Finalizar Compra</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-group">
                    <label htmlFor="name">Nombre completo</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Dirección</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-summary">
                    <p>Total a pagar: <span>${total.toLocaleString('es-AR')}</span></p>
                </div>
                <button type="submit" className="btn-submit">Confirmar Compra</button>
            </form>
        </div>
    );
};

export default CheckoutForm;
