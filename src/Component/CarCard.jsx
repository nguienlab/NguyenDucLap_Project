import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

export default function CarCard({ car }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  // Construct the full image URL
  const imageUrl = `${apiBaseUrl}${car.image}`;
  
  // Format price to VND
  const formattedPrice = new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(car.price);

  const handleAddToCart = () => {
    addToCart(car, 1);
    alert(`${car.name} has been added to your cart.`);
  };

  return (
    <div className="card h-100 shadow-sm">
      <img src={imageUrl} className="card-img-top" alt={car.name} style={{ height: 180, objectFit: "cover" }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{car.name}</h5>
        <p className="card-text text-muted small flex-grow-1">{car.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold text-primary">{formattedPrice}</span>
          {user?.role === 'customer' && (
             <button 
                className="btn btn-sm btn-primary" 
                onClick={handleAddToCart}
                disabled={car.quantity === 0}
              >
                {car.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
          )}
        </div>
      </div>
    </div>
  );
}
