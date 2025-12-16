import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

// Create a configured axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Fetch user profile if token exists
            api.get('/auth/me')
                .then(res => {
                    setUser(res.data.data);
                })
                .catch(() => {
                    // Token is invalid
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                    delete api.defaults.headers.common['Authorization'];
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        const { token, role } = res.data;
        localStorage.setItem('token', token);
        setToken(token);
        // The useEffect will trigger to fetch the user
        return { token, role };
    };

    const register = async (name, email, password, role) => {
        const res = await api.post('/auth/register', { name, email, password, role });
        const { token: newToken, role: newRole } = res.data;
        localStorage.setItem('token', newToken);
        setToken(newToken);
        // The useEffect will trigger to fetch the user
        return { token: newToken, role: newRole };
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        api // Expose the configured axios instance
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
