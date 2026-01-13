import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ManageCustomers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { api } = useAuth();
    
    const roleOptions = ['user', 'admin', 'customer'];

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get('/users');
            // Chỉ lấy role customer
            const customers = res.data.data.filter(u => u.role === 'customer');
            setUsers(customers);
            setError(null);
        } catch (err) {
            setError('Không thể tải danh sách khách hàng.');
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
            fetchUsers();
        } catch(err) {
            alert('Cập nhật vai trò thất bại.');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
            try {
                await api.delete(`/users/${userId}`);
                setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
            } catch (err) {
                alert('Xóa người dùng thất bại.');
            }
        }
    };

    if (loading) return <div>Đang tải danh sách khách hàng...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <h2 className="mb-4">Quản lý Khách hàng</h2>
            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-success">
                        <tr>
                            <th>Mã KH</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Vai trò</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                         {users.length > 0 ? (
                            users.map(user => (
                                <tr key={user._id}>
                                    <td><small>{user._id}</small></td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <select 
                                            className="form-select form-select-sm"
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            style={{width: '120px'}}
                                        >
                                            {roleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDeleteUser(user._id)}
                                        >
                                            <i className="bi bi-trash"></i> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">Không tìm thấy khách hàng nào.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCustomers;