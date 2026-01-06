import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
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
        <div className="cart-wrapper">
            <header className="cart-hero">
                <div className="container">
                    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} >
                        🛒 Giỏ hàng của bạn
                    </motion.h1>
                    <p>Xem lại và quản lý các xe bạn yêu thích</p>
                </div>
            </header>

            <main className="cart-main container">
                {cartItems.length === 0 ? (
                    <motion.div className="empty-state" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <div className="empty-icon">📭</div>
                        <h3>Giỏ hàng trống</h3>
                        <p>Hãy bắt đầu mua sắm và thêm xe yêu thích vào giỏ</p>
                        <Link to="/cars" className="btn-empty-shop">Tiếp tục mua sắm</Link>
                    </motion.div>
                ) : (
                    <div className="cart-layout">
                        <section className="cart-items-section">
                            <h2>Các xe trong giỏ hàng</h2>
                            <div className="cart-items-list">
                                {cartItems.map((item, idx) => (
                                    <motion.div
                                        key={item._id}
                                        className="cart-item-card"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.06 }}
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <div className="item-img">
                                            <img src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${item.image}`} alt={item.name} />
                                        </div>
                                        <div className="item-info">
                                            <h4>{item.name}</h4>
                                            <p className="item-price">{formattedPrice(item.price)}</p>
                                        </div>
                                        <div className="item-qty">
                                            <label>Số lượng</label>
                                            <div className="qty-control">
                                                <button onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}>−</button>
                                                <input type="number" value={item.quantity} onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)} />
                                                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                                            </div>
                                        </div>
                                        <div className="item-total">
                                            <span className="total-label">Tổng:</span>
                                            <span className="total-price">{formattedPrice(item.price * item.quantity)}</span>
                                        </div>
                                        <button className="btn-remove" onClick={() => removeFromCart(item._id)} title="Remove">✕</button>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        <aside className="cart-sidebar">
                            <motion.div className="summary-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                <h3>Đơn hàng</h3>

                                <div className="summary-row">
                                    <span>Tổng tiền xe:</span>
                                    <span>{formattedPrice(cartTotal)}</span>
                                </div>

                                <div className="summary-row">
                                    <span>Phí vận chuyển:</span>
                                    <span className="fee-text">Miễn phí</span>
                                </div>

                                <div className="summary-divider"></div>

                                <div className="summary-total">
                                    <span>Thành tiền:</span>
                                    <span>{formattedPrice(cartTotal)}</span>
                                </div>

                                <button
                                    className="btn-checkout"
                                    onClick={handleCheckout}
                                    disabled={user && user.role !== 'customer'}
                                >
                                    {!user ? '🔐 Đăng nhập để thanh toán' : user.role === 'customer' ? '✓ Tiến hành thanh toán' : '⛔ Chỉ khách hàng có thể đặt hàng'}
                                </button>

                                <Link to="/cars" className="btn-continue-shopping">
                                    ← Tiếp tục mua sắm
                                </Link>

                                {cartItems.length > 0 && (
                                    <button className="btn-clear-cart" onClick={clearCart}>
                                        🗑️ Xóa tất cả
                                    </button>
                                )}
                            </motion.div>
                        </aside>
                    </div>
                )}
            </main>
        </div>
    );
}
