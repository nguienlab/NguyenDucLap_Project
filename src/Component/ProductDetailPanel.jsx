import { motion, AnimatePresence } from 'framer-motion';
import { useProductDetail } from '../context/ProductDetailContext';
import { useCart } from '../context/CartContext';
import './ProductDetailPanel.css';

const ProductDetailPanel = () => {
    const { vehicle, isPanelOpen, closePanel } = useProductDetail();
    const { addToCart } = useCart();

    const panelVariants = {
        hidden: { x: '100%' },
        visible: { x: 0 },
    };
    
    if (!vehicle) {
        return null;
    }

    const handleAddToCart = () => {
        addToCart(vehicle, 1);
        alert(`${vehicle.name} has been added to your cart.`);
    };
    
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(vehicle.price);
    const imageUrl = `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${vehicle.image}`;

    return (
        <AnimatePresence>
            {isPanelOpen && (

                    <motion.div
                        className="product-detail-panel"
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <button className="close-btn" onClick={closePanel}>&times;</button>
                        <img src={imageUrl} alt={vehicle.name} className="panel-img" />
                        <div className="panel-content">
                            <h3>{vehicle.name}</h3>
                            <p className="panel-price">{formattedPrice}</p>
                            <p className="panel-brand"><strong>Brand:</strong> {vehicle.brand}</p>
                            <p className="panel-year"><strong>Year:</strong> {vehicle.year}</p>
                            <p className="panel-desc">{vehicle.description}</p>
                            
                            <button 
                                className="btn btn-primary w-100" 
                                onClick={handleAddToCart}
                                disabled={vehicle.quantity === 0}
                            >
                                {vehicle.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                        </div>
                    </motion.div>

            )}
        </AnimatePresence>
    );
};

export default ProductDetailPanel;
