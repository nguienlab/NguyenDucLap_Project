import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { api } = useAuth();
    
    const statusOptions = ['Chờ xử lý', 'Đã xác nhận', 'Đang giao', 'Đã giao', 'Đã hủy'];

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await api.get('/orders');
            setOrders(res.data.data);
            setError(null);
        } catch (err) {
            setError('Không thể tải danh sách đơn hàng.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [api]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}`, { status: newStatus });
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (err) {
            alert('Cập nhật trạng thái đơn hàng thất bại.');
            console.error(err);
        }
    };
    
    const formattedPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    if (loading) return <div>Đang tải đơn hàng...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <h2 className="mb-4">Quản Lý Đơn Hàng</h2>
            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Mã Đơn</th>
                            <th>Khách Hàng</th>
                            <th>Ngày Đặt</th>
                            <th>Tổng Tiền</th>
                            <th>Trạng Thái</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <tr key={order._id}>
                                    <td><small>{order._id.substring(0, 8)}...</small></td>
                                    <td>{order.user?.name || 'N/A'}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                                    <td className="text-danger fw-bold">{formattedPrice(order.totalPrice)}</td>
                                    <td>
                                        <span className={`badge bg-${
                                            order.status === 'Đã giao' ? 'success' : 
                                            order.status === 'Đã hủy' ? 'danger' : 
                                            order.status === 'Đang giao' ? 'info' : 'warning'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <select 
                                            className="form-select form-select-sm"
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            style={{width: '150px'}}
                                        >
                                            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">Chưa có đơn hàng nào.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;