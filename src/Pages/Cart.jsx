import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px' }}>
            <div className="container">
                {/* Header */}
                <motion.div 
                    className="d-flex justify-content-between align-items-end mb-5"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div>
                        <h5 className="text-uppercase text-muted fw-bold letter-spacing-2 mb-1" style={{ letterSpacing: '2px', fontSize: '0.8rem' }}>Showroom Sport-Cars</h5>
                        <h1 className="display-5 fw-bolder mb-0">Gara Của Bạn <span className="text-warning">({cartItems.length})</span></h1>
                    </div>
                    {cartItems.length > 0 && (
                        <button 
                            onClick={clearCart} 
                            className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold"
                        >
                            <i className="bi bi-trash me-1"></i> Xóa tất cả
                        </button>
                    )}
                </motion.div>

                {cartItems.length === 0 ? (
                    <motion.div 
                        className="text-center py-5 bg-white rounded-5 shadow-sm"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <div className="mb-4">
                            <i className="bi bi-cart-x display-1 text-muted" style={{ opacity: 0.3 }}></i>
                        </div>
                        <h2 className="fw-bold text-dark">Gara của bạn đang trống!</h2>
                        <p className="text-muted mb-4">Hãy lấp đầy nó bằng những siêu xe đẳng cấp nhất.</p>
                        <Link to="/cars" className="btn btn-warning btn-lg rounded-pill px-5 fw-bold shadow">
                            Dạo Showroom Ngay
                        </Link>
                    </motion.div>
                ) : (
                    <div className="row g-5">
                        {/* Cart Items List */}
                        <div className="col-lg-8">
                            <AnimatePresence>
                                {cartItems.map((item, idx) => (
                                    <motion.div
                                        key={item._id}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="card border-0 rounded-4 shadow-sm mb-4 overflow-hidden position-relative"
                                        style={{ transition: 'transform 0.2s' }}
                                        whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                                    >
                                        <div className="row g-0 align-items-center">
                                            {/* Image */}
                                            <div className="col-md-4 position-relative">
                                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                                    <img 
                                                        src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${item.image}`} 
                                                        alt={item.name}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <div className="position-absolute top-0 start-0 m-3">
                                                    <span className="badge bg-light text-dark shadow-sm">{item.brand}</span>
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="col-md-8">
                                                <div className="card-body p-4">
                                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                                        <div>
                                                            <h4 className="card-title fw-bold mb-1">{item.name}</h4>
                                                            <p className="text-muted small mb-0">Năm SX: {item.year} | Loại: {item.type}</p>
                                                        </div>
                                                        <h5 className="text-warning fw-bold mb-0">{formattedPrice(item.price)}</h5>
                                                    </div>

                                                    <div className="d-flex justify-content-between align-items-center mt-4">
                                                        {/* Qty Control */}
                                                        <div className="d-flex align-items-center bg-light rounded-pill p-1 border">
                                                            <button 
                                                                className="btn btn-sm btn-white rounded-circle shadow-sm" 
                                                                style={{ width: 32, height: 32 }}
                                                                onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                                            >
                                                                <i className="bi bi-dash"></i>
                                                            </button>
                                                            <input 
                                                                type="text" 
                                                                value={item.quantity} 
                                                                readOnly 
                                                                className="form-control border-0 bg-transparent text-center fw-bold p-0 mx-2"
                                                                style={{ width: '40px' }}
                                                            />
                                                            <button 
                                                                className="btn btn-sm btn-white rounded-circle shadow-sm" 
                                                                style={{ width: 32, height: 32 }}
                                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                            >
                                                                <i className="bi bi-plus"></i>
                                                            </button>
                                                        </div>

                                                        <div className="d-flex align-items-center">
                                                            <div className="text-end me-4 d-none d-sm-block">
                                                                <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Tạm tính</small>
                                                                <span className="fw-bold text-dark">{formattedPrice(item.price * item.quantity)}</span>
                                                            </div>
                                                            <button 
                                                                className="btn btn-light text-danger rounded-circle p-2"
                                                                onClick={() => removeFromCart(item._id)}
                                                                title="Xóa khỏi giỏ"
                                                            >
                                                                <i className="bi bi-trash3-fill"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Summary Sidebar */}
                        <div className="col-lg-4">
                            <motion.div 
                                className="card border-0 rounded-4 shadow-lg p-4 sticky-top"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                style={{ top: '120px', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}
                            >
                                <h4 className="fw-bold mb-4">Hóa Đơn</h4>
                                
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">Tổng tiền xe</span>
                                    <span className="fw-bold">{formattedPrice(cartTotal)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">Thuế & Phí</span>
                                    <span className="text-success fw-bold">Miễn phí</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="text-muted">Vận chuyển</span>
                                    <span className="text-success fw-bold">Miễn phí</span>
                                </div>

                                <hr className="my-4" />

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <span className="fw-bold fs-5">Thành Tiền</span>
                                    <span className="fw-bolder fs-4 text-warning">{formattedPrice(cartTotal)}</span>
                                </div>

                                <button 
                                    onClick={handleCheckout}
                                    className="btn btn-dark w-100 py-3 rounded-pill fw-bold shadow-lg mb-3"
                                    style={{ background: 'linear-gradient(135deg, #111, #333)' }}
                                    disabled={!user}
                                >
                                    {!user ? 'Đăng Nhập Để Mua' : 'Tiến Hành Thanh Toán'}
                                </button>

                                <div className="text-center">
                                    <small className="text-muted d-block mb-2">Chấp nhận thanh toán</small>
                                    <div className="d-flex justify-content-center gap-3 opacity-50">
                                        <i className="bi bi-credit-card-2-front fs-4"></i>
                                        <i className="bi bi-paypal fs-4"></i>
                                        <i className="bi bi-wallet2 fs-4"></i>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

