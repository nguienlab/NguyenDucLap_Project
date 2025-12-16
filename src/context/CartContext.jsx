import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cartItems');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Failed to parse cart items from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (vehicle, quantity = 1) => {
        setCartItems(prevItems => {
            const exist = prevItems.find(item => item._id === vehicle._id);
            if (exist) {
                // Increase quantity if item already exists
                return prevItems.map(item =>
                    item._id === vehicle._id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                // Add new item to cart
                return [...prevItems, { ...vehicle, quantity }];
            }
        });
    };

    const removeFromCart = (vehicleId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== vehicleId));
    };

    const updateQuantity = (vehicleId, quantity) => {
        const numQuantity = Number(quantity);
        if (numQuantity < 1) {
            removeFromCart(vehicleId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === vehicleId ? { ...item, quantity: numQuantity } : item
            )
        );
    };
    
    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    
    const cartTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
