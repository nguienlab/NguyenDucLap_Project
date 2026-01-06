import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const { user } = useAuth();

    return (
        <div className="dashboard-container">
            <aside className="dashboard-sidebar">
                <h3 className="sidebar-title">Bảng Điều Khiển</h3>
                <nav className="sidebar-nav">
                    {/* Common for all logged-in users */}
                    <NavLink to="/dashboard" end className="sidebar-link">
                        <i className="bi bi-grid-fill me-2"></i> Tổng Quan
                    </NavLink>

                    <NavLink to="/dashboard/my-profile" className="sidebar-link">
                       <i className="bi bi-person-circle me-2"></i> Hồ Sơ Của Tôi
                    </NavLink>

                    {/* Admin-only links */}
                    {user?.role === 'admin' && (
                        <>
                            <hr />
                            <h4 className="sidebar-subtitle">Quản Trị</h4>
                            <NavLink to="/dashboard/manage-vehicles" className="sidebar-link">
                                <i className="bi bi-car-front-fill me-2"></i> Quản Lý Xe
                            </NavLink>
                            <NavLink to="/dashboard/manage-users" className="sidebar-link">
                                <i className="bi bi-people-fill me-2"></i> Quản Lý Người Dùng
                            </NavLink>
                            <NavLink to="/dashboard/manage-orders" className="sidebar-link">
                                <i className="bi bi-receipt-cutoff me-2"></i> Quản Lý Đơn Hàng
                            </NavLink>
                            <NavLink to="/dashboard/manage-feedbacks" className="sidebar-link">
                                <i className="bi bi-chat-dots me-2"></i> Quản Lý Phản Hồi
                            </NavLink>
                        </>
                    )}
                </nav>
            </aside>
            <main className="dashboard-content">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
