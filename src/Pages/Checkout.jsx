import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user, api } = useAuth();
    const navigate = useNavigate();

    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        city: '',
        phoneNo: '',
        postalCode: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const orderData = {
            items: cartItems.map(item => ({
                vehicle: item._id,
                quantity: item.quantity
            })),
            shippingInfo
        };

        try {
            await api.post('/orders', orderData);
            clearCart();
            alert('Order placed successfully!');
            navigate('/dashboard/my-orders');
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to place order.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };
    
    const formattedPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    return (
        <div className="container py-5">
            <h2 className="mb-4">Checkout</h2>
            <div className="row">
                <div className="col-md-7">
                    <h4>Shipping Information</h4>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handlePlaceOrder}>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" id="address" name="address" value={shippingInfo.address} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" className="form-control" id="city" name="city" value={shippingInfo.city} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNo" className="form-label">Phone Number</label>
                            <input type="text" className="form-control" id="phoneNo" name="phoneNo" value={shippingInfo.phoneNo} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="postalCode" className="form-label">Postal Code</label>
                            <input type="text" className="form-control" id="postalCode" name="postalCode" value={shippingInfo.postalCode} onChange={handleInputChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </form>
                </div>
                <div className="col-md-5">
                    <h4>Order Summary</h4>
                    <ul className="list-group mb-3">
                        {cartItems.map(item => (
                            <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="my-0">{item.name}</h6>
                                    <small className="text-muted">Quantity: {item.quantity}</small>
                                </div>
                                <span className="text-muted">{formattedPrice(item.price * item.quantity)}</span>
                            </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (VND)</span>
                            <strong>{formattedPrice(cartTotal)}</strong>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
