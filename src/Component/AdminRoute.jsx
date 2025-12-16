import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { user, loading, token } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    // User must be logged in and have the 'admin' role
    return token && user?.role === 'admin' ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
