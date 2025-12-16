import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { token, loading } = useAuth();

    // We wait until the loading is false to check for the token
    if (loading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
