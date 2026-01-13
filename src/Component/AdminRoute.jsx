import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { user, loading, token } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    // User must be logged in and have the 'admin' or 'user' (staff) role with permission
    const canAccess = user?.role === 'admin' || (user?.role === 'user' && user?.canAccessDashboard);
    
    return token && canAccess ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
