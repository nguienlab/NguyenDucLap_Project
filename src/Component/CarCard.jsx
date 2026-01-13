import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProductDetail } from '../context/ProductDetailContext';
import { motion } from 'framer-motion';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

export default function CarCard({ car }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { openPanel } = useProductDetail();
  
  const imageUrl = `${apiBaseUrl}${car.image}`;
  const formattedPrice = new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(car.price);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(car, 1);
  };

  return (
    <motion.div 
      layoutId={`card-container-${car._id}`}
      className="car-card-modern"
      onClick={() => openPanel(car)}
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      style={{
        background: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Badge Mới */}
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        background: 'rgba(255,255,255,0.9)',
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '800',
        color: '#ff9900',
        zIndex: 2,
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}>
        {car.brand.toUpperCase()}
      </div>

      {/* Image Area */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <motion.img 
          layoutId={`card-image-${car._id}`}
          src={imageUrl} 
          alt={car.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '60%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
        }}></div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h5 style={{ 
          fontWeight: '700', 
          fontSize: '1.1rem', 
          marginBottom: '8px', 
          color: '#1a1a1a',
          lineHeight: '1.4'
        }}>
          {car.name}
        </h5>
        
        <p style={{ 
          color: '#888', 
          fontSize: '0.85rem', 
          lineHeight: '1.5',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          marginBottom: '15px',
          flex: 1
        }}>
          {car.description}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Giá từ</span>
            <span style={{ color: '#ff9900', fontWeight: '800', fontSize: '1.1rem' }}>{formattedPrice}</span>
          </div>

          {user && (
             <motion.button 
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05, backgroundColor: '#e68a00' }}
                onClick={handleAddToCart}
                disabled={car.quantity === 0}
                style={{
                  background: car.quantity === 0 ? '#ccc' : '#ff9900',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: car.quantity === 0 ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(255, 153, 0, 0.3)'
                }}
              >
                <i className={`bi ${car.quantity === 0 ? 'bi-x-lg' : 'bi-bag-plus-fill'}`} style={{ fontSize: '1.2rem' }}></i>
              </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

