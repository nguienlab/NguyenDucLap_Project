import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CarouselHero from "../Component/Carousel";
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

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
            navigate('/profile'); // Redirect to profile page after login
        } catch (err) {
            const message = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to log in.';
            setError(message);
        }
    };

    return (
        <div className="login-container">
            {/* Hero */}
        <CarouselHero />
            <div className="login-form-wrapper">
                <h2 className="text-center mb-4">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" style={{ width: "100%", color: "#040000ff", backgroundColor: "#ff9900ff" }} className="btn w-100">Login</button>
                </form>
                <p className="mt-3 text-center">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}
