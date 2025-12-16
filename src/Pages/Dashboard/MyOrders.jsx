import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { api } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await api.get('/orders/my-orders');
                setOrders(res.data.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch orders.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [api]);
    
    const formattedPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    if (loading) return <div>Loading your orders...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <h2>My Orders</h2>
            {orders.length === 0 ? (
                <p>You have no orders yet. <Link to="/cars">Start shopping!</Link></p>
            ) : (
                <div className="accordion" id="ordersAccordion">
                    {orders.map((order, index) => (
                        <div className="accordion-item" key={order._id}>
                            <h2 className="accordion-header" id={`heading${index}`}>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                                    <span className="me-3">Order #{order._id.substring(0, 8)}...</span>
                                    <span className="me-3">Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                                    <span className="me-3">Total: {formattedPrice(order.totalPrice)}</span>
                                    <span className={`badge bg-${order.status === 'Đã hủy' ? 'danger' : 'success'}`}>{order.status}</span>
                                </button>
                            </h2>
                            <div id={`collapse${index}`} className="accordion-collapse collapse show" aria-labelledby={`heading${index}`} data-bs-parent="#ordersAccordion">
                                <div className="accordion-body">
                                    <h5>Order Items</h5>
                                    <ul className="list-group">
                                        {order.orderItems.map(item => (
                                            <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    <img src={item.image} alt={item.name} style={{width: '50px', height: '50px', objectFit: 'cover', marginRight: '1rem'}} />
                                                    {item.name} (x{item.quantity})
                                                </div>
                                                <span>{formattedPrice(item.price * item.quantity)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;