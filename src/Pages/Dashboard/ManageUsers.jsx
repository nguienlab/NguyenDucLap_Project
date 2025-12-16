import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { api, user: currentUser } = useAuth();
    
    const roleOptions = ['user', 'admin', 'customer'];

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get('/users');
            setUsers(res.data.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch users.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [api]);
    
    const handleRoleChange = async (userId, newRole) => {
        try {
            await api.put(`/users/${userId}`, { role: newRole });
             setUsers(prevUsers => 
                prevUsers.map(user => 
                    user._id === userId ? { ...user, role: newRole } : user
                )
            );
        } catch(err) {
            alert('Failed to update user role.');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await api.delete(`/users/${userId}`);
                setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
            } catch (err) {
                alert('Failed to delete user.');
            }
        }
    };

    if (loading) return <div>Loading users...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <h2>Manage Users</h2>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {currentUser._id === user._id ? (
                                        <span>{user.role} (You)</span>
                                    ) : (
                                        <select 
                                            className="form-select form-select-sm"
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        >
                                            {roleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    )}
                                </td>
                                <td>
                                    {currentUser._id !== user._id && (
                                        <button 
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDeleteUser(user._id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;