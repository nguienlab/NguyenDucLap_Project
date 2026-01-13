import { motion, AnimatePresence } from 'framer-motion';
import { useProductDetail } from '../context/ProductDetailContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProductDetailPanel = () => {
    const { vehicle, isPanelOpen, closePanel } = useProductDetail();
    const { addToCart } = useCart();
    const { user } = useAuth();

    if (!vehicle) return null;

    const handleAddToCart = () => {
        addToCart(vehicle, 1);
        // Có thể thêm toast notification ở đây thay vì alert
    };
    
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(vehicle.price);
    const imageUrl = `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${vehicle.image}`;

    // Backdrop animation
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    // Panel animation
    const panelVariants = {
        hidden: { x: '100%', opacity: 0.5 },
        visible: { x: 0, opacity: 1 },
    };

    return (
        <AnimatePresence>
            {isPanelOpen && (
                <>
                    {/* Backdrop mờ */}
                    <motion.div
                        className="fixed-top w-100 h-100"
                        style={{ 
                            backgroundColor: 'rgba(0,0,0,0.5)', 
                            backdropFilter: 'blur(5px)', 
                            zIndex: 1040 
                        }}
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={closePanel}
                    />

                    {/* Expanded Modal (Morphing from Card) */}
                    <div className="fixed-top w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1050, pointerEvents: 'none' }}>
                        <motion.div
                            layoutId={`card-container-${vehicle._id}`}
                            className="bg-white shadow-2xl overflow-hidden d-flex flex-column"
                            style={{ 
                                width: '95%', 
                                maxWidth: '1100px', 
                                maxHeight: '75vh', // Giảm chiều cao xuống để ảnh không bị kéo quá dài
                                borderRadius: '30px',
                                pointerEvents: 'auto',
                                position: 'relative'
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        >
                            <div className="row g-0 h-100" style={{ overflowX: 'hidden' }}>
                                {/* Left Side: Image */}
                                <div className="col-lg-6 position-relative d-flex align-items-center justify-content-center" style={{ minHeight: '350px', backgroundColor: '#fdfdfd' }}>
                                    <motion.img 
                                        layoutId={`card-image-${vehicle._id}`}
                                        src={imageUrl} 
                                        alt={vehicle.name} 
                                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px' }} // Dùng contain để hiện toàn bộ xe
                                    />
                                    <button 
                                        onClick={closePanel}
                                        className="position-absolute top-0 start-0 m-4 btn btn-white rounded-circle d-flex align-items-center justify-content-center shadow-lg"
                                        style={{ width: '45px', height: '45px', border: 'none', zIndex: 10, background: 'white' }}
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>

                                {/* Right Side: Content */}
                                <div className="col-lg-6 d-flex flex-column p-4 p-md-5 overflow-auto" style={{ maxHeight: '75vh', overflowX: 'hidden' }}>
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="mb-2">
                                            <span className="badge bg-warning text-dark px-3 py-2 text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>{vehicle.brand}</span>
                                        </div>
                                        <h2 className="fw-bold mb-3 display-5 text-dark">{vehicle.name}</h2>
                                        
                                        <div className="d-flex align-items-center mb-4 pb-4 border-bottom">
                                            <h3 className="text-warning fw-bold m-0 me-4 display-6">{formattedPrice}</h3>
                                            <div className="d-flex gap-2">
                                                <div className="d-flex flex-column align-items-center px-3 border-end">
                                                    <small className="text-muted text-uppercase" style={{fontSize: '0.65rem'}}>Năm SX</small>
                                                    <span className="fw-bold">{vehicle.year}</span>
                                                </div>
                                                <div className="d-flex flex-column align-items-center px-3">
                                                    <small className="text-muted text-uppercase" style={{fontSize: '0.65rem'}}>Phân khúc</small>
                                                    <span className="fw-bold text-capitalize">{vehicle.type}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <h6 className="fw-bold text-uppercase small text-muted mb-3" style={{ letterSpacing: '1px' }}>Giới thiệu chi tiết</h6>
                                            <p className="text-secondary mb-0" style={{ lineHeight: '1.8', fontSize: '1rem', textAlign: 'justify' }}>
                                                {vehicle.description}
                                            </p>
                                        </div>

                                        {/* Key highlights (Giả lập thêm cho đẹp) */}
                                        <div className="row g-3 mb-4">
                                            <div className="col-6">
                                                <div className="p-3 border rounded-4 d-flex align-items-center">
                                                    <i className="bi bi-shield-check text-success me-2 fs-4"></i>
                                                    <span className="small fw-bold">Bảo hành 5 năm</span>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-3 border rounded-4 d-flex align-items-center">
                                                    <i className="bi bi-lightning-charge text-primary me-2 fs-4"></i>
                                                    <span className="small fw-bold">Bảo dưỡng free</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stock Status */}
                                        <div className={`mb-4 p-3 rounded-4 d-flex align-items-center ${vehicle.quantity > 0 ? 'bg-light border-start border-success border-4' : 'bg-light border-start border-danger border-4'}`}>
                                            <div className={`rounded-circle p-2 me-3 ${vehicle.quantity > 0 ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                                                <i className={`bi ${vehicle.quantity > 0 ? 'bi-check-lg' : 'bi-x-lg'}`}></i>
                                            </div>
                                            <div>
                                                <h6 className="m-0 fw-bold">{vehicle.quantity > 0 ? 'Sẵn Sàng Giao Xe' : 'Tạm Hết Hàng'}</h6>
                                                <small className="text-muted">Showroom còn lại: {vehicle.quantity} xe</small>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <div className="mt-auto pt-4">
                                        {user ? (
                                            <button 
                                                className="btn btn-warning w-100 py-3 rounded-pill fw-bold shadow-lg d-flex align-items-center justify-content-center gap-2"
                                                onClick={handleAddToCart}
                                                disabled={vehicle.quantity === 0}
                                                style={{ transition: 'all 0.3s' }}
                                            >
                                                <i className="bi bi-bag-check-fill fs-5"></i>
                                                <span style={{ fontSize: '1.1rem' }}>Thêm Vào Giỏ Hàng</span>
                                            </button>
                                        ) : (
                                            <Link to="/login" className="btn btn-outline-warning w-100 py-3 rounded-pill fw-bold">
                                                <i className="bi bi-person-lock me-2"></i> Đăng nhập để mua ngay
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProductDetailPanel;
