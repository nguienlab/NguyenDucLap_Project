import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/profile');
        } catch (err) {
            const message = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Đăng nhập thất bại.';
            setError(message);
        }
    };

    return (
        <div className="d-flex" style={{ minHeight: '100vh', background: '#fff' }}>
            {/* Left Side - Image & Quote */}
            <div className="d-none d-lg-flex col-lg-6 position-relative align-items-center justify-content-center overflow-hidden">
                <motion.img 
                    src="/images/cbr1000rrr.png" 
                    alt="Login Background" 
                    className="position-absolute w-100 h-100"
                    style={{ objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
                <div className="position-relative text-center p-5 z-2">
                    <motion.h1 
                        className="display-4 fw-bold mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ color: '#1a1a1a', textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}
                    >
                        Chào Mừng Trở Lại
                    </motion.h1>
                    <motion.p 
                        className="lead fw-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        style={{ color: '#ff9900', textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}
                    >
                        "Tốc độ là niềm đam mê, sự an toàn là lời hứa."
                    </motion.p>
                </div>
            </div>

            {/* Right Side - Login Form */}
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
                        <h2 className="fw-bold text-dark">Đăng Nhập</h2>
                        <p className="text-muted">Nhập thông tin đăng nhập của bạn để tiếp tục</p>
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
                            <label htmlFor="floatingPassword">Mật khẩu</label>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="rememberMe" />
                                <label className="form-check-label text-muted small" htmlFor="rememberMe">
                                    Ghi nhớ đăng nhập
                                </label>
                            </div>
                            <a href="#" className="small text-decoration-none text-warning fw-bold">Quên mật khẩu?</a>
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" 
                            className="btn btn-dark w-100 py-3 rounded-pill fw-bold"
                            style={{ background: 'linear-gradient(90deg, #ff9900, #ffb347)', border: 'none', color: '#000' }}
                        >
                            Đăng Nhập Ngay <i className="bi bi-arrow-right ms-2"></i>
                        </motion.button>
                    </form>

                    <div className="text-center mt-5">
                        <p className="text-muted">Bạn chưa có tài khoản? <Link to="/register" className="text-dark fw-bold text-decoration-none border-bottom border-dark">Đăng ký ngay</Link></p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

