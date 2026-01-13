import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ManageStaff = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { api, user: currentUser } = useAuth();
    
    const roleOptions = ['user', 'admin', 'customer'];

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get('/users');
            // Lọc chỉ lấy role 'user' (được quy định là Nhân viên)
            const staffMembers = res.data.data.filter(u => u.role === 'user');
            setUsers(staffMembers);
            setError(null);
        } catch (err) {
            setError('Không thể tải danh sách nhân viên.');
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

    const handleAccessToggle = async (userId, currentStatus) => {
        try {
            const newStatus = !currentStatus;
            await api.put(`/users/${userId}`, { canAccessDashboard: newStatus });
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user._id === userId ? { ...user, canAccessDashboard: newStatus } : user
                )
            );
        } catch(err) {
            console.error(err);
            alert('Cập nhật quyền truy cập thất bại.');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
            try {
                await api.delete(`/users/${userId}`);
                setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
            } catch (err) {
                alert('Xóa nhân viên thất bại.');
            }
        }
    };

    if (loading) return <div>Đang tải danh sách nhân viên...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <h2 className="mb-4">Quản lý Nhân viên (Vai trò User)</h2>
            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Mã NV</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Vai trò</th>
                            <th className="text-center">Truy cập Dashboard</th>
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
                                        {currentUser._id === user._id ? (
                                            <span className="badge bg-primary">Bạn</span>
                                        ) : (
                                            <select 
                                                className="form-select form-select-sm"
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                style={{width: '120px'}}
                                            >
                                                {roleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                            </select>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <div className="form-check form-switch d-flex justify-content-center">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                role="switch"
                                                checked={user.canAccessDashboard || false}
                                                onChange={() => handleAccessToggle(user._id, user.canAccessDashboard)}
                                                disabled={currentUser._id === user._id}
                                                style={{cursor: 'pointer'}}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        {currentUser._id !== user._id && (
                                            <button 
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDeleteUser(user._id)}
                                            >
                                                <i className="bi bi-trash"></i> Xóa
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">Không tìm thấy nhân viên nào.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageStaff;