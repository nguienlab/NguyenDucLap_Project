import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const ManageVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { api } = useAuth();

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const fetchVehicles = async () => {
        try {
            setLoading(true);
            const res = await api.get('/vehicles');
            setVehicles(res.data.data);
            setFilteredVehicles(res.data.data); // Initially show all
            setError(null);
        } catch (err) {
            setError('Không thể tải danh sách xe.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    // Effect for filtering
    useEffect(() => {
        const lowercasedTerm = searchTerm.toLowerCase();
        const filtered = vehicles.filter(v => 
            v.name.toLowerCase().includes(lowercasedTerm) ||
            v.brand.toLowerCase().includes(lowercasedTerm)
        );
        setFilteredVehicles(filtered);
    }, [searchTerm, vehicles]);


    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentVehicle(null);
        setIsEditing(false);
        setImageFile(null);
        setPreviewUrl('');
    };

    const handleShowCreateModal = () => {
        setIsEditing(false);
        setCurrentVehicle({ name: '', brand: '', type: 'ô tô', price: 0, year: new Date().getFullYear(), description: '', image: '', quantity: 0 });
        setImageFile(null);
        setPreviewUrl('');
        setShowModal(true);
    };

    const handleShowEditModal = (vehicle) => {
        setIsEditing(true);
        setCurrentVehicle(vehicle);
        setImageFile(null);
        setPreviewUrl(vehicle.image ? `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${vehicle.image}` : '');
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa xe này không?')) {
            try {
                await api.delete(`/vehicles/${id}`);
                fetchVehicles(); // Refresh list
            } catch (err) {
                alert('Xóa xe thất bại.');
            }
        }
    };
    
    const handleFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            setImageFile(file);
            if (file) {
                setPreviewUrl(URL.createObjectURL(file));
            } else {
                setPreviewUrl('');
            }
        } else {
            setCurrentVehicle(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // Append all text fields
        Object.keys(currentVehicle).forEach(key => {
            if (key !== '_id' && key !== 'image') { // Don't append id or old image path
                 formData.append(key, currentVehicle[key]);
            }
        });

        // Append new image file if it exists
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            if (isEditing) {
                // UPDATE
                await api.put(`/vehicles/${currentVehicle._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                // CREATE
                 if (!imageFile) {
                    alert('Vui lòng chọn ảnh để tải lên.');
                    return;
                }
                await api.post('/vehicles', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            handleCloseModal();
            fetchVehicles();
        } catch (err) {
            const errorMsg = err.response?.data?.message || (isEditing ? 'Cập nhật xe thất bại.' : 'Thêm xe mới thất bại.');
            alert(errorMsg);
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quản Lý Xe</h2>
                <Button variant="warning" className="text-dark" onClick={handleShowCreateModal}>Thêm Xe Mới</Button>
            </div>
            
            <Form.Control
                type="text"
                placeholder="Tìm kiếm theo tên xe, hãng..."
                className="mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>Tên Xe</th>
                            <th>Hãng</th>
                            <th>Loại</th>
                            <th>Giá (VND)</th>
                            <th>Kho</th>
                            <th className="text-end">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVehicles.map(v => (
                            <tr key={v._id}>
                                <td>
                                    <img 
                                        src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${v.image}`} 
                                        alt={v.name} 
                                        style={{ width: '100px', height: 'auto', objectFit: 'cover', borderRadius: '8px' }} 
                                    />
                                </td>
                                <td className="fw-bold">{v.name}</td>
                                <td>{v.brand}</td>
                                <td>{v.type}</td>
                                <td className="text-danger fw-bold">{new Intl.NumberFormat('vi-VN').format(v.price)}</td>
                                <td>{v.quantity}</td>
                                <td className="text-end">
                                    <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleShowEditModal(v)}>
                                        <i className="bi bi-pencil-square"></i> Sửa
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(v._id)}>
                                        <i className="bi bi-trash"></i> Xóa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create/Edit Modal */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Chỉnh Sửa Xe' : 'Thêm Xe Mới'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentVehicle && (
                        <Form onSubmit={handleFormSubmit}>
                            <Row>
                                {/* Left Column: Image Preview & Upload */}
                                <Col md={5}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>{isEditing ? 'Ảnh Hiện Tại / Mới' : 'Ảnh Xe'}</Form.Label>
                                        <div 
                                            className="w-100 d-flex justify-content-center align-items-center bg-light" 
                                            style={{ 
                                                height: '200px', 
                                                borderRadius: '8px', 
                                                border: '2px dashed #ddd',
                                                overflow: 'hidden' 
                                            }}
                                        >
                                            {previewUrl ? (
                                                <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div className="text-center text-muted">
                                                    <i className="bi bi-image" style={{fontSize: '3rem'}}></i>
                                                    <p>Chưa có ảnh</p>
                                                </div>
                                            )}
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="d-none">Image Upload</Form.Label>
                                        <Form.Control 
                                            type="file" 
                                            name="image" 
                                            onChange={handleFormChange} 
                                            accept="image/*" 
                                        />
                                    </Form.Group>
                                </Col>

                                {/* Right Column: Form Fields */}
                                <Col md={7}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tên Xe</Form.Label>
                                        <Form.Control type="text" name="name" value={currentVehicle.name} onChange={handleFormChange} required />
                                    </Form.Group>
                                     <Form.Group className="mb-3">
                                        <Form.Label>Hãng Xe</Form.Label>
                                        <Form.Control type="text" name="brand" value={currentVehicle.brand} onChange={handleFormChange} required />
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Loại Xe</Form.Label>
                                                <Form.Select name="type" value={currentVehicle.type} onChange={handleFormChange}>
                                                    <option value="ô tô">Ô tô</option>
                                                    <option value="xe máy">Xe máy</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Giá (VND)</Form.Label>
                                                <Form.Control type="number" name="price" value={currentVehicle.price} onChange={handleFormChange} required />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Năm</Form.Label>
                                                <Form.Control type="number" name="year" value={currentVehicle.year} onChange={handleFormChange} required />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                             <Form.Group className="mb-3">
                                                <Form.Label>Kho</Form.Label>
                                                <Form.Control type="number" name="quantity" value={currentVehicle.quantity} onChange={handleFormChange} required />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Mô Tả</Form.Label>
                                <Form.Control as="textarea" rows={3} name="description" value={currentVehicle.description} onChange={handleFormChange} required />
                            </Form.Group>
                            <Button variant="warning" type="submit" className="w-100 text-dark fw-bold mt-3">
                                {isEditing ? 'Lưu Thay Đổi' : 'Tạo Xe Mới'}
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ManageVehicles;