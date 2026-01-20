import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './sidebar.css'; // Import the new CSS file

const Sidebar = () => {
    const { user } = useAuth();

    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-header">
                <i className="bi bi-speedometer2"></i>
                <h3>Dashboard</h3>
            </div>
            
            <nav className="sidebar-nav">
                <NavLink to="/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <i className="bi bi-grid-fill"></i> 
                    <span>Tổng Quan</span>
                </NavLink>

                <NavLink to="/dashboard/my-profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                   <i className="bi bi-person-circle"></i> 
                   <span>Hồ Sơ Của Tôi</span>
                </NavLink>

                {(user?.role === 'admin' || (user?.role === 'user' && user?.canAccessDashboard)) && (
                    <>
                        <div className="sidebar-subtitle">Quản Trị</div>
                        <NavLink to="/dashboard/manage-vehicles" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                            <i className="bi bi-car-front-fill"></i> 
                            <span>Quản Lý Xe</span>
                        </NavLink>
                        
                        {user?.role === 'admin' && (
                            <NavLink to="/dashboard/manage-staff" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                                <i className="bi bi-person-badge-fill"></i> 
                                <span>Quản Lý Nhân Viên</span>
                            </NavLink>
                        )}

                        <NavLink to="/dashboard/manage-customers" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                            <i className="bi bi-people-fill"></i> 
                            <span>Quản Lý Khách Hàng</span>
                        </NavLink>
                        <NavLink to="/dashboard/manage-orders" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                            <i className="bi bi-receipt-cutoff"></i> 
                            <span>Quản Lý Đơn Hàng</span>
                        </NavLink>
                        <NavLink to="/dashboard/manage-feedbacks" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                            <i className="bi bi-chat-dots"></i> 
                            <span>Quản Lý Phản Hồi</span>
                        </NavLink>
                    </>
                )}
            </nav>
            
            <div className="sidebar-footer">
                <div className="user-avatar">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="user-info">
                    <span className="user-name">{user?.name}</span>
                    <span className="user-role">{user?.role}</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
