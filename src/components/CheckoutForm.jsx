import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useCart } from "../context/CartContext";

const CheckoutForm = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [orderId, setOrderId] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (items.length === 0) {
      setError("El carrito está vacío");
      return;
    }
    try {
      setSending(true);
      const order = {
        buyer: form,
        items: items.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
        total: totalPrice,
        createdAt: serverTimestamp(),
      };
      const ref = await addDoc(collection(db, "orders"), order);
      setOrderId(ref.id);
      clearCart();
    } catch (err) {
      setError("No se pudo generar la orden");
    } finally {
      setSending(false);
    }
  }

  if (orderId) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>¡Gracias por tu compra!</h2>
        <p>Id de la orden: {orderId}</p>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Teléfono"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <button type="submit" disabled={sending}>
          {sending ? "Generando orden..." : "Confirmar compra"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
