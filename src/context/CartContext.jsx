import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItem = (item, quantity) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        
        if (existingItem) {
            setCart(cart.map((cartItem) => 
                cartItem.id === item.id 
                    ? { ...cartItem, quantity: cartItem.quantity + quantity }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity }]);
        }
    };

    const removeItem = (itemId) => {
        setCart(cart.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addItem, 
            removeItem, 
            clearCart, 
            totalItems, 
            total 
        }}>
            {children}
        </CartContext.Provider>
    );
};


