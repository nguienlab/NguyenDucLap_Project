import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
    const { user } = useAuth();
    return (
        <div>
            <h2>Chào mừng đến Dashboard của bạn, {user?.name}!</h2>
            <p>Đây là trang tổng quan của bạn. Từ đây bạn có thể quản lý đơn hàng và hồ sơ của mình.</p>
             {user?.role === 'admin' && (
                <div className="alert alert-info mt-4">
                    <strong>Bảng Điều Khiển Quản Trị:</strong> Bạn có quyền truy cập các chức năng quản trị. Sử dụng thanh bên để điều hướng.
                </div>
            )}
        </div>
    );
}

export default UserDashboard;
