import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
    const { user } = useAuth(); // No need to check token here, as it's protected by ProtectedRoute

    if (!user) {
        return <div className="profile-container">Loading user data...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2 className="mb-4">Welcome, {user.name}!</h2>
                <p>This is your personal dashboard where you can manage your details and view your activity.</p>
                
                <hr />

                <h5>Your Information</h5>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                
                <hr />

                <h5>Your Activity</h5>
                <Link to="/profile/my-orders" className="btn btn-primary me-2">
                    <i className="bi bi-box-seam-fill me-2"></i> View My Orders
                </Link>
                 <Link to="/profile" className="btn btn-secondary disabled">
                    <i className="bi bi-pencil-square me-2"></i> Edit Profile (Coming Soon)
                </Link>
            </div>
        </div>
    );
}