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
                setError('Không thể tải đơn hàng của bạn.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [api]);
    
    const formattedPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    if (loading) return <div>Đang tải đơn hàng của bạn...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <h2 className="mb-4">Đơn Hàng Của Tôi</h2>
            {orders.length === 0 ? (
                <div className="alert alert-info">
                    Bạn chưa có đơn hàng nào. <Link to="/cars" className="alert-link">Bắt đầu mua sắm ngay!</Link>
                </div>
            ) : (
                <div className="accordion" id="ordersAccordion">
                    {orders.map((order, index) => (
                        <div className="accordion-item mb-3 border-0 shadow-sm rounded-3 overflow-hidden" key={order._id}>
                            <h2 className="accordion-header" id={`heading${index}`}>
                                <button className="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                                    <div className="d-flex flex-wrap w-100 justify-content-between align-items-center pe-3">
                                        <span className="fw-bold text-dark">Mã Đơn: #{order._id.substring(18).toUpperCase()}</span>
                                        <span className="text-muted small">Ngày: {new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                                        <span className="text-danger fw-bold">Tổng: {formattedPrice(order.totalPrice)}</span>
                                        <span className={`badge rounded-pill bg-${
                                            order.status === 'Đã giao' ? 'success' : 
                                            order.status === 'Đã hủy' ? 'danger' : 
                                            order.status === 'Đang giao' ? 'info' : 'warning'
                                        }`}>{order.status}</span>
                                    </div>
                                </button>
                            </h2>
                            <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#ordersAccordion">
                                <div className="accordion-body bg-light">
                                    <h6 className="fw-bold mb-3">Chi tiết sản phẩm</h6>
                                    <ul className="list-group list-group-flush rounded-3 shadow-sm">
                                        {order.orderItems.map(item => (
                                            <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                                <div className="d-flex align-items-center">
                                                    <img 
                                                        src={item.image.startsWith('http') ? item.image : `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${item.image}`} 
                                                        alt={item.name} 
                                                        style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', marginRight: '1rem'}} 
                                                    />
                                                    <div>
                                                        <div className="fw-bold">{item.name}</div>
                                                        <small className="text-muted">Số lượng: {item.quantity}</small>
                                                    </div>
                                                </div>
                                                <span className="fw-bold">{formattedPrice(item.price * item.quantity)}</span>
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