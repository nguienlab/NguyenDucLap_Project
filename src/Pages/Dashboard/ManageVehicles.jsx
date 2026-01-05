import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Modal, Button, Form } from 'react-bootstrap';

const ManageVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { api } = useAuth();

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    
    const fetchVehicles = async () => {
        try {
            setLoading(true);
            const res = await api.get('/vehicles');
            setVehicles(res.data.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch vehicles.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentVehicle(null);
        setIsEditing(false);
        setImageFile(null);
    };

    const handleShowCreateModal = () => {
        setIsEditing(false);
        setCurrentVehicle({ name: '', brand: '', type: 'ô tô', price: 0, year: new Date().getFullYear(), description: '', image: '', quantity: 0 });
        setImageFile(null);
        setShowModal(true);
    };

    const handleShowEditModal = (vehicle) => {
        setIsEditing(true);
        setCurrentVehicle(vehicle);
        setImageFile(null);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            try {
                await api.delete(`/vehicles/${id}`);
                fetchVehicles(); // Refresh list
            } catch (err) {
                alert('Failed to delete vehicle.');
            }
        }
    };
    
    const handleFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setImageFile(files[0]);
        } else {
            setCurrentVehicle(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            // Handle update logic (no file change)
            try {
                await api.put(`/vehicles/${currentVehicle._id}`, currentVehicle);
                handleCloseModal();
                fetchVehicles();
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to update vehicle.');
            }
        } else {
            // Handle create logic with file upload
            if (!imageFile) {
                alert('Please select an image to upload.');
                return;
            }

            const formData = new FormData();
            formData.append('name', currentVehicle.name);
            formData.append('brand', currentVehicle.brand);
            formData.append('type', currentVehicle.type);
            formData.append('price', currentVehicle.price);
            formData.append('year', currentVehicle.year);
            formData.append('description', currentVehicle.description);
            formData.append('quantity', currentVehicle.quantity);
            formData.append('image', imageFile);

            try {
                await api.post('/vehicles', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                handleCloseModal();
                fetchVehicles();
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to create vehicle.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Manage Vehicles</h2>
                <Button variant="primary" onClick={handleShowCreateModal}>Create New Vehicle</Button>
            </div>
            
            <div className="row g-4">
                {vehicles.map(v => (
                    <div key={v._id} className="col-12 col-sm-6 col-lg-3">
                        <div className="card h-100 shadow-sm">
                             <img 
                                src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${v.image}`} 
                                className="card-img-top" 
                                alt={v.name} 
                                style={{ height: '180px', objectFit: 'cover' }} 
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{v.name}</h5>
                                <p className="card-text mb-1"><strong>Brand:</strong> {v.brand}</p>
                                <p className="card-text mb-1"><strong>Type:</strong> {v.type}</p>
                                <p className="card-text mb-1"><strong>Price:</strong> {new Intl.NumberFormat('vi-VN').format(v.price)} VND</p>
                                <p className="card-text"><strong>Stock:</strong> {v.quantity}</p>
                                <div className="mt-auto d-flex justify-content-end">
                                    <Button variant="secondary" size="sm" className="me-2" onClick={() => handleShowEditModal(v)}>Edit</Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(v._id)}>Delete</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create/Edit Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit Vehicle' : 'Create Vehicle'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentVehicle && (
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={currentVehicle.name} onChange={handleFormChange} required />
                            </Form.Group>
                             <Form.Group className="mb-3">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type="text" name="brand" value={currentVehicle.brand} onChange={handleFormChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Form.Select name="type" value={currentVehicle.type} onChange={handleFormChange}>
                                    <option value="ô tô">Ô tô</option>
                                    <option value="xe máy">Xe máy</option>
                                </Form.Select>
                            </Form.Group>
                             <Form.Group className="mb-3">
                                <Form.Label>Price (VND)</Form.Label>
                                <Form.Control type="number" name="price" value={currentVehicle.price} onChange={handleFormChange} required />
                            </Form.Group>
                             <Form.Group className="mb-3">
                                <Form.Label>Year</Form.Label>
                                <Form.Control type="number" name="year" value={currentVehicle.year} onChange={handleFormChange} required />
                            </Form.Group>
                             <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} name="description" value={currentVehicle.description} onChange={handleFormChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>{isEditing ? 'Image URL' : 'Image'}</Form.Label>
                                {isEditing ? (
                                     <Form.Control type="text" name="image" value={currentVehicle.image} disabled />
                                ) : (
                                     <Form.Control type="file" name="image" onChange={handleFormChange} required />
                                )}
                            </Form.Group>
                             <Form.Group className="mb-3">
                                <Form.Label>Quantity (Stock)</Form.Label>
                                <Form.Control type="number" name="quantity" value={currentVehicle.quantity} onChange={handleFormChange} required />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                {isEditing ? 'Save Changes' : 'Create Vehicle'}
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ManageVehicles;