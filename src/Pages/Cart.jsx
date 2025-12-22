import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Cart.css';

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!user) {
            navigate('/login?redirect=/cart');
        } else {
            navigate('/checkout');
        }
    };

    const formattedPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    return (
        <div className="cart-container container py-5">
            <h2 className="mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <div className="alert alert-info">Your cart is empty. <Link to="/cars">Go shopping!</Link></div>
            ) : (
                <>
                    <div className="cart-items-list m-5">
                        {cartItems.map(item => (
                            <div key={item._id} className="cart-item row align-items-center mb-3">
                                <div className="col-2 col-md-1">
                                    <img src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${item.image}`} alt={item.name} className="img-fluid rounded" />
                                </div>
                                <div className="col-10 col-md-4">
                                    <p className="mb-0 fw-bold">{item.name}</p>
                                    <small className="text-muted">{formattedPrice(item.price)}</small>
                                </div>
                                <div className="col-5 col-md-3 mt-2 mt-md-0">
                                    <div className="input-group input-group-sm" style={{maxWidth: '120px'}}>
                                        <button className="btn btn-outline-secondary" type="button" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                                        <input type="number" className="form-control text-center" value={item.quantity} onChange={(e) => updateQuantity(item._id, e.target.value)} />
                                        <button className="btn btn-outline-secondary" type="button" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                                <div className="col-5 col-md-3 mt-2 mt-md-0 text-md-end">
                                    <span className="fw-bold">{formattedPrice(item.price * item.quantity)}</span>
                                </div>
                                <div className="col-2 col-md-1 text-end">
                                    <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item._id)}>&times;</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr />
                    <div className="cart-summary text-end">
                        <h4>Total: <span className="text-primary">{formattedPrice(cartTotal)}</span></h4>
                        <button 
                            className="btn btn-primary mt-3" 
                            onClick={handleCheckout} 
                            disabled={user && user.role !== 'customer'}
                        >
                            {!user 
                                ? 'Login to Checkout' 
                                : user.role === 'customer' 
                                    ? 'Proceed to Checkout'
                                    : 'Only customers can order'
                            }
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
