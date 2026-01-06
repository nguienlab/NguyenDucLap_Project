import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const MyProfile = () => {
    const { user, api } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (user) {
            setProfile(user);
            setFormData(user);
            setLoading(false);
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await api.put('/users/profile', formData);
            setProfile(response.data.data);
            setEditMode(false);
            alert('Profile updated successfully!');
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="my-profile-container p-4">
            <h2 className="mb-4">Hồ Sơ Của Tôi</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            {!editMode ? (
                <div className="profile-view card p-4">
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Tên:</strong> {profile?.name}</p>
                            <p><strong>Email:</strong> {profile?.email}</p>
                            <p><strong>Vai Trò:</strong> <span className="badge bg-info">{profile?.role}</span></p>
                            <p><strong>Thành Viên Từ:</strong> {new Date(profile?.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <button 
                        className="btn btn-primary mt-3"
                        onClick={() => setEditMode(true)}
                    >
                        Chỉnh Sửa Hồ Sơ
                    </button>
                </div>
            ) : (
                <div className="profile-edit card p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Tên</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData?.name || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData?.email || ''}
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Vai Trò</label>
                            <input
                                type="text"
                                className="form-control"
                                name="role"
                                value={formData?.role || ''}
                                disabled
                            />
                        </div>
                        <div className="button-group">
                            <button type="submit" className="btn btn-success me-2">
                                Lưu Thay Đổi
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-secondary"
                                onClick={() => {
                                    setEditMode(false);
                                    setFormData(profile);
                                }}
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
