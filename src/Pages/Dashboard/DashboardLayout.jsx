import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const { user } = useAuth();

    return (
        <div className="dashboard-container">
            <aside className="dashboard-sidebar">
                <h3 className="sidebar-title">Dashboard</h3>
                <nav className="sidebar-nav">
                    {/* Common for all logged-in users */}
                    <NavLink to="/dashboard" end className="sidebar-link">
                        <i className="bi bi-grid-fill me-2"></i> Overview
                    </NavLink>

                    <NavLink to="/profile" className="sidebar-link">
                       <i className="bi bi-person-circle me-2"></i> My Profile
                    </NavLink>

                    {/* Admin-only links */}
                    {user?.role === 'admin' && (
                        <>
                            <hr />
                            <h4 className="sidebar-subtitle">Admin</h4>
                            <NavLink to="/dashboard/manage-vehicles" className="sidebar-link">
                                <i className="bi bi-car-front-fill me-2"></i> Manage Vehicles
                            </NavLink>
                            <NavLink to="/dashboard/manage-users" className="sidebar-link">
                                <i className="bi bi-people-fill me-2"></i> Manage Users
                            </NavLink>
                            <NavLink to="/dashboard/manage-orders" className="sidebar-link">
                                <i className="bi bi-card-list me-2"></i> Manage Orders
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
