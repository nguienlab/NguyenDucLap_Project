import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ManageFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { api, user } = useAuth(); // Use the configured axios instance

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await api.get('/feedback/admin');
        setFeedbacks(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    if (user) {
      fetchFeedbacks();
    } else {
      setError("User not authenticated.");
      setLoading(false);
    }
  }, [user, api]);

  if (loading) {
    return <div className="text-center mt-5">Loading feedbacks...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5">Error: {error}</div>;
  }

  return (
    <div className="manage-feedbacks-container p-4">
      <h2 className="mb-4">Quản Lý Phản Hồi</h2>
      {feedbacks.length === 0 ? (
        <div className="alert alert-info">Không có phản hồi nào.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Người Dùng</th>
                <th>Email</th>
                <th>Chủ Đề</th>
                <th>Tin Nhắn</th>
                <th>Ngày</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td>{feedback._id}</td>
                  <td>{feedback.name}</td>
                  <td>{feedback.email}</td>
                  <td>{feedback.subject}</td>
                  <td>{feedback.message}</td>
                  <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageFeedbacks;