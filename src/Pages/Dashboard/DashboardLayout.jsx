import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar'; // Correctly import the new Sidebar component
import './DashboardLayout.css';

const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="dashboard-main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;