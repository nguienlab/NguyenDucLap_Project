import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }
        try {
            await register(name, email, password);
            navigate('/profile');
        } catch (err) {
            const message = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Đăng ký thất bại.';
            setError(message);
        }
    };

    return (
        <div className="d-flex" style={{ minHeight: '100vh', background: '#fff' }}>
            {/* Left Side - Benefits & Image */}
             <div className="d-none d-lg-flex col-lg-6 position-relative align-items-center justify-content-center overflow-hidden">
                <motion.img 
                    src="/images/cbr1000rrr.png" 
                    alt="Register Background" 
                    className="position-absolute w-100 h-100"
                    style={{ objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
                
                {/* Benefits Card Overlay */}
                <motion.div 
                    className="position-relative z-2 p-5"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h1 className="display-5 fw-bold mb-4" style={{ color: '#1a1a1a', textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}>Tham Gia Cùng<br/>Sport-Cars</h1>
                    <p className="lead mb-5 fw-bold" style={{ color: '#ff9900', textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}>Tạo tài khoản ngay để mở khóa những đặc quyền dành riêng cho bạn.</p>
                    
                    <div className="d-flex flex-column gap-4">
                        <div className="d-flex align-items-center">
                            <div className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'}}>
                                <i className="bi bi-tag-fill fs-4"></i>
                            </div>
                            <div style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>
                                <h5 className="fw-bold mb-0 text-dark">Ưu Đãi Độc Quyền</h5>
                                <small className="text-muted fw-bold">Nhận thông báo giảm giá sớm nhất</small>
                            </div>
                        </div>
                        
                        <div className="d-flex align-items-center">
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'}}>
                                <i className="bi bi-truck fs-4"></i>
                            </div>
                            <div style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>
                                <h5 className="fw-bold mb-0 text-dark">Theo Dõi Đơn Hàng</h5>
                                <small className="text-muted fw-bold">Cập nhật trạng thái vận chuyển real-time</small>
                            </div>
                        </div>

                        <div className="d-flex align-items-center">
                            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'}}>
                                <i className="bi bi-shield-check fs-4"></i>
                            </div>
                            <div style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>
                                <h5 className="fw-bold mb-0 text-dark">Bảo Hành Mở Rộng</h5>
                                <small className="text-muted fw-bold">Gói chăm sóc xe VIP cho thành viên</small>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Side - Register Form */}
            <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5 bg-white">
                <motion.div 
                    className="w-100" 
                    style={{ maxWidth: '450px' }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-5">
                        <img 
                            src="/images/logo1.png" 
                            alt="Logo" 
                            style={{ 
                                width: '100px', 
                                height: '100px', 
                                borderRadius: '50%', 
                                objectFit: 'cover', 
                                marginBottom: '1.5rem',
                                border: '3px solid #ff9900'
                            }} 
                        />
                        <h2 className="fw-bold text-dark">Tạo Tài Khoản</h2>
                        <p className="text-muted">Điền thông tin bên dưới để bắt đầu</p>
                    </div>

                    {error && (
                        <motion.div 
                            className="alert alert-danger d-flex align-items-center" 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }}
                        >
                            <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit}>
                         <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control rounded-3"
                                id="floatingName"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={{ border: '2px solid #f0f0f0' }}
                            />
                            <label htmlFor="floatingName">Họ và Tên</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control rounded-3"
                                id="floatingInput"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ border: '2px solid #f0f0f0' }}
                            />
                            <label htmlFor="floatingInput">Địa chỉ Email</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input
                                type="password"
                                className="form-control rounded-3"
                                id="floatingPassword"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ border: '2px solid #f0f0f0' }}
                            />
                            <label htmlFor="floatingPassword">Mật khẩu (tối thiểu 6 ký tự)</label>
                        </div>

                        <div className="form-check mb-4">
                            <input className="form-check-input" type="checkbox" id="terms" required />
                            <label className="form-check-label text-muted small" htmlFor="terms">
                                Tôi đồng ý với <a href="#" className="text-dark fw-bold text-decoration-none">Điều khoản sử dụng</a> và <a href="#" className="text-dark fw-bold text-decoration-none">Chính sách bảo mật</a>
                            </label>
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" 
                            className="btn btn-dark w-100 py-3 rounded-pill fw-bold"
                            style={{ background: 'linear-gradient(90deg, #ff9900, #ffb347)', border: 'none', color: '#000' }}
                        >
                            Đăng Ký Tài Khoản <i className="bi bi-person-plus-fill ms-2"></i>
                        </motion.button>
                    </form>

                    <div className="text-center mt-5">
                        <p className="text-muted">Bạn đã có tài khoản? <Link to="/login" className="text-dark fw-bold text-decoration-none border-bottom border-dark">Đăng nhập tại đây</Link></p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

