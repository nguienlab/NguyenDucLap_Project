import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
    const { user } = useAuth();
    return (
        <div>
            <h2>Welcome to your Dashboard, {user?.name}!</h2>
            <p>This is your overview page. From here you can manage your orders and profile.</p>
             {user?.role === 'admin' && (
                <div className="alert alert-info mt-4">
                    <strong>Admin Panel:</strong> You have access to administrative functionalities. Use the sidebar to navigate.
                </div>
            )}
        </div>
    );
}

export default UserDashboard;
