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
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [qrConfirmed, setQrConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // --- Dynamic QR Code URL ---
    const qrData = `Thanh toan don hang cho CarSales. So tien: ${cartTotal} VND.`;
    const encodedQrData = encodeURIComponent(qrData);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedQrData}`;
    // -------------------------

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
            // Backend does not support payment method, so this is a frontend-only flow
        };

        try {
            await api.post('/orders', orderData);
            clearCart();
            alert('Đặt hàng thành công!');
            navigate('/dashboard/my-orders');
        } catch (err) {
            const message = err.response?.data?.message || 'Không thể đặt hàng.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };
    
    const formattedPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    return (
        <div className="container py-5">
            <h2 className="mb-4">Thanh Toán</h2>
            <div className="row">
                <div className="col-md-7">
                    <form onSubmit={handlePlaceOrder}>
                        <h4>Thông tin giao hàng</h4>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Địa chỉ</label>
                            <input type="text" className="form-control" id="address" name="address" value={shippingInfo.address} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">Thành phố</label>
                            <input type="text" className="form-control" id="city" name="city" value={shippingInfo.city} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNo" className="form-label">Số điện thoại</label>
                            <input type="text" className="form-control" id="phoneNo" name="phoneNo" value={shippingInfo.phoneNo} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="postalCode" className="form-label">Mã bưu điện</label>
                            <input type="text" className="form-control" id="postalCode" name="postalCode" value={shippingInfo.postalCode} onChange={handleInputChange} required />
                        </div>
                        
                        <hr className="my-4" />

                        <h4>Phương thức thanh toán</h4>
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="paymentMethod" 
                                id="cod" 
                                value="cod"
                                checked={paymentMethod === 'cod'}
                                onChange={() => setPaymentMethod('cod')}
                            />
                            <label className="form-check-label" htmlFor="cod">
                                Thanh toán khi nhận hàng (COD)
                            </label>
                        </div>
                        <div className="form-check mb-3">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="paymentMethod" 
                                id="qr" 
                                value="qr"
                                checked={paymentMethod === 'qr'}
                                onChange={() => setPaymentMethod('qr')}
                            />
                            <label className="form-check-label" htmlFor="qr">
                                Thanh toán bằng mã QR
                            </label>
                        </div>

                        {/* QR Code Section */}
                        {paymentMethod === 'qr' && (
                            <div className="text-center p-3 border rounded">
                               <h5>Quét mã QR để thanh toán</h5>
                               <p>Sử dụng ứng dụng ngân hàng của bạn để quét mã dưới đây.</p>
                               <img 
                                    src={qrCodeUrl} 
                                    alt="QR Code" 
                                    className="img-fluid my-3"
                                    style={{maxWidth: '200px'}}
                                />
                                { !qrConfirmed ? (
                                     <button type="button" className="btn btn-success w-100" onClick={() => setQrConfirmed(true)}>
                                        Tôi đã thanh toán
                                    </button>
                                ) : (
                                    <p className="text-success fw-bold">Đã xác nhận thanh toán! Vui lòng hoàn tất đơn hàng.</p>
                                )}
                            </div>
                        )}

                        {error && <div className="alert alert-danger mt-3">{error}</div>}

                        {/* Conditional Place Order Button */}
                        {(paymentMethod === 'cod' || (paymentMethod === 'qr' && qrConfirmed)) && (
                            <button type="submit" className="btn btn-primary w-100 mt-4" disabled={loading}>
                                {loading ? 'Đang xử lý...' : 'Hoàn Tất Đặt Hàng'}
                            </button>
                        )}
                    </form>
                </div>
                <div className="col-md-5">
                    <h4>Tóm tắt đơn hàng</h4>
                    <ul className="list-group mb-3">
                        {cartItems.map(item => (
                            <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="my-0">{item.name}</h6>
                                    <small className="text-muted">Số lượng: {item.quantity}</small>
                                </div>
                                <span className="text-muted">{formattedPrice(item.price * item.quantity)}</span>
                            </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Tổng cộng (VND)</span>
                            <strong>{formattedPrice(cartTotal)}</strong>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
