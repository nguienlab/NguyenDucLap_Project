import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';
    const isStaff = user?.role === 'user' && user?.canAccessDashboard;

    // Placeholder data (Trong thực tế sẽ fetch từ API)
    const stats = (isAdmin || isStaff) ? [
        { title: 'Tổng Đơn Hàng', value: '124', icon: 'bi-cart-check', color: 'blue' },
        { title: 'Doanh Thu', value: '1.2 tỷ', icon: 'bi-currency-dollar', color: 'green' },
        { title: 'Khách Hàng', value: '1,203', icon: 'bi-people', color: 'orange' },
        { title: 'Phản Hồi Mới', value: '8', icon: 'bi-star', color: 'red' },
    ] : [
        { title: 'Đơn Hàng Của Tôi', value: '5', icon: 'bi-bag', color: 'blue' },
        { title: 'Xe Đã Mua', value: '1', icon: 'bi-car-front', color: 'green' },
    ];

    return (
        <div className="fade-in">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                        <h2 className="fw-bold text-dark m-0">Xin chào, {user?.name}!</h2>
                        {isAdmin && <span className="badge bg-danger rounded-pill">Quản Trị Viên</span>}
                        {isStaff && <span className="badge bg-success rounded-pill">Nhân Viên</span>}
                    </div>
                    <p className="text-muted mt-1">Đây là bảng điều khiển {(isAdmin || isStaff) ? 'hệ thống' : 'cá nhân'} của bạn.</p>
                </div>
                <div className="d-flex gap-2">
                    <Link to="/" className="btn btn-outline-warning text-dark rounded-pill px-4">
                        <i className="bi bi-house me-2"></i> Về Trang Chủ
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className={`stat-icon ${stat.color}`}>
                            <i className={`bi ${stat.icon}`}></i>
                        </div>
                        <div className="stat-info">
                            <h4>{stat.title}</h4>
                            <p>{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity / Shortcuts */}
            <div className="row mt-4">
                <div className="col-lg-8 mb-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
                        <h5 className="fw-bold mb-3">Hoạt động gần đây</h5>
                        <div className="list-group list-group-flush">
                            <div className="list-group-item border-0 px-0 py-3 d-flex align-items-center">
                                <div className="bg-light rounded-circle p-2 me-3 text-primary">
                                    <i className="bi bi-person-check"></i>
                                </div>
                                <div>
                                    <h6 className="m-0 fw-bold">Đăng nhập thành công</h6>
                                    <small className="text-muted">Vừa xong</small>
                                </div>
                            </div>
                            <div className="list-group-item border-0 px-0 py-3 d-flex align-items-center">
                                <div className="bg-light rounded-circle p-2 me-3 text-success">
                                    <i className="bi bi-shield-check"></i>
                                </div>
                                <div>
                                    <h6 className="m-0 fw-bold">Hệ thống hoạt động bình thường</h6>
                                    <small className="text-muted">Luôn luôn</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-lg-4 mb-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
                        <h5 className="fw-bold mb-3">Lối tắt</h5>
                        <div className="d-grid gap-2">
                            <Link to="/profile/my-orders" className="btn btn-outline-secondary fw-bold text-start">
                                <i className="bi bi-box-seam me-2"></i> Kiểm tra đơn hàng
                            </Link>
                            <Link to="/cars" className="btn btn-outline-secondary fw-bold text-start">
                                <i className="bi bi-search me-2"></i> Tìm xe mới
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;