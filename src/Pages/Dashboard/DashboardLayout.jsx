import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const { user } = useAuth();

    return (
        <div className="dashboard-container">
            <aside className="dashboard-sidebar">
                <div className="d-flex align-items-center mb-4 px-3">
                    <i className="bi bi-speedometer2 fs-3 text-primary me-2"></i>
                    <h3 className="sidebar-title m-0 p-0 text-dark">DashBoard</h3>
                </div>
                
                <nav className="sidebar-nav">
                    {/* Common for all logged-in users */}
                    <NavLink to="/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <i className="bi bi-grid-fill"></i> Tổng Quan
                    </NavLink>

                    <NavLink to="/dashboard/my-profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                       <i className="bi bi-person-circle"></i> Hồ Sơ Của Tôi
                    </NavLink>

                    {/* Admin & Staff Management Links */}
                    {(user?.role === 'admin' || (user?.role === 'user' && user?.canAccessDashboard)) && (
                        <>
                            <div className="sidebar-subtitle">Quản Trị Hệ Thống</div>
                            <NavLink to="/dashboard/manage-vehicles" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                                <i className="bi bi-car-front-fill"></i> Quản Lý Xe
                            </NavLink>
                            
                            {/* Chỉ Admin mới được quản lý nhân viên */}
                            {user?.role === 'admin' && (
                                <NavLink to="/dashboard/manage-staff" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                                    <i className="bi bi-person-badge-fill"></i> Quản Lý Nhân Viên
                                </NavLink>
                            )}

                            <NavLink to="/dashboard/manage-customers" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                                <i className="bi bi-people-fill"></i> Quản Lý Khách Hàng
                            </NavLink>
                            <NavLink to="/dashboard/manage-orders" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                                <i className="bi bi-receipt-cutoff"></i> Quản Lý Đơn Hàng
                            </NavLink>
                            <NavLink to="/dashboard/manage-feedbacks" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                                <i className="bi bi-chat-dots"></i> Quản Lý Phản Hồi
                            </NavLink>
                        </>
                    )}
                </nav>
                
                <div className="mt-auto px-3 py-3">
                    <div className="d-flex align-items-center p-2 rounded bg-light border">
                        <div className="avatar-placeholder bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="d-flex flex-column" style={{lineHeight: '1.2'}}>
                            <small className="fw-bold text-truncate" style={{maxWidth: '140px'}}>{user?.name}</small>
                            <small className="text-muted" style={{fontSize: '0.7rem'}}>{user?.role}</small>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="dashboard-content">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;