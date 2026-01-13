import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import CarCard from "../Component/CarCard";
import "./Cars.css";
import CarouselHero from "../Component/Carousel";

export default function Cars() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [type, setType] = useState("all");
  const [brand, setBrand] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const keyword = searchParams.get("keyword") || "";

  // Local search query state
  const [q, setQ] = useState(keyword);
  
  useEffect(() => {
    // Sync local search input with URL keyword
    setQ(keyword);

    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const apiUrl = keyword ? `/vehicles?keyword=${keyword}` : '/vehicles';
        
        // Temporarily using fetch instead of api from useAuth if it's not configured for this
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${apiUrl}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        
        setAllCars(data.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch cars. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [keyword]); // Refetch when keyword changes

  // Get unique brands for the filter dropdown from the fetched cars
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(allCars.map(c => c.brand))];
    return uniqueBrands.sort();
  }, [allCars]);

  // Client-side filtering on the fetched results
  const filtered = useMemo(() => {
    return allCars.filter(c => {
      const matchType = type === "all" ? true : c.type === type;
      const matchBrand = brand === "all" ? true : c.brand === brand;
      const matchPrice = maxPrice ? c.price <= Number(maxPrice) : true;
      return matchType && matchBrand && matchPrice;
    });
  }, [type, brand, maxPrice, allCars]);

  const handleLocalSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/cars?keyword=${q.trim()}`);
  }

  return (
    <div className="cars-page">
      <div className="cars-bg" />
      <div className="cars-content">
        {/* Hero Banner */}
        <div className="cars-hero-section">
          <CarouselHero />
        </div>

        {/* Main Content */}
        <div className="container px-2 px-md-5 py-5">
          {/* Title Section */}
          <motion.div
            className="title-section mb-5 text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h5 className="text-warning text-uppercase letter-spacing-2 mb-2">Showroom Trực Tuyến</h5>
            <h1 className="cars-title display-4 fw-bold">
              {keyword ? `Tìm Kiếm: "${keyword}"` : "Bộ Sưu Tập Xe"}
            </h1>
            <p className="cars-subtitle text-muted mt-2" style={{maxWidth: '600px', margin: '0 auto'}}>
              Khám phá danh sách {filtered.length} mẫu xe đẳng cấp, được tuyển chọn kỹ lưỡng để đáp ứng mọi nhu cầu của bạn.
            </p>
          </motion.div>

          <div className="row">
            {/* Filter Sidebar (Left Column) */}
            <motion.div 
              className="col-lg-3 mb-5 mb-lg-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="filter-sidebar sticky-top" style={{ top: '100px', zIndex: 10 }}>
                <div className="card border-0 shadow-sm rounded-4 p-4">
                  <div className="d-flex align-items-center mb-4">
                    <i className="bi bi-sliders text-warning me-2 fs-5"></i>
                    <h5 className="fw-bold m-0">Bộ Lọc Tìm Kiếm</h5>
                  </div>
                  
                  <form onSubmit={handleLocalSearchSubmit}>
                    {/* Search Input */}
                    <div className="mb-4">
                      <label className="form-label fw-bold small text-muted text-uppercase">Từ khóa</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><i className="bi bi-search"></i></span>
                        <input
                          value={q}
                          onChange={e => setQ(e.target.value)}
                          className="form-control bg-light border-start-0"
                          placeholder="Tìm theo tên xe..."
                        />
                      </div>
                    </div>

                    {/* Type Filter */}
                    <div className="mb-4">
                      <label className="form-label fw-bold small text-muted text-uppercase">Loại Xe</label>
                      <div className="d-flex flex-column gap-2">
                        {['all', 'ô tô', 'xe máy'].map(opt => (
                           <div className="form-check" key={opt}>
                              <input 
                                className="form-check-input" 
                                type="radio" 
                                name="typeOptions" 
                                id={`type-${opt}`} 
                                value={opt}
                                checked={type === opt}
                                onChange={(e) => setType(e.target.value)}
                                style={{ cursor: 'pointer' }}
                              />
                              <label className="form-check-label text-capitalize" htmlFor={`type-${opt}`} style={{ cursor: 'pointer' }}>
                                {opt === 'all' ? 'Tất cả' : opt}
                              </label>
                           </div>
                        ))}
                      </div>
                    </div>

                    {/* Brand Filter */}
                    <div className="mb-4">
                      <label className="form-label fw-bold small text-muted text-uppercase">Thương Hiệu</label>
                      <select
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                        className="form-select bg-light"
                      >
                        <option value="all">Tất cả thương hiệu</option>
                        {brands.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>

                    {/* Price Filter */}
                    <div className="mb-4">
                       <label className="form-label fw-bold small text-muted text-uppercase">Ngân Sách Tối Đa</label>
                       <input
                          type="range"
                          className="form-range"
                          min="0"
                          max="5000000000"
                          step="10000000"
                          value={maxPrice || 5000000000}
                          onChange={e => setMaxPrice(e.target.value)}
                       />
                       <div className="d-flex justify-content-between small text-muted mt-1">
                          <span>0 đ</span>
                          <span className="fw-bold text-dark">
                             {maxPrice ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(maxPrice) : 'Không giới hạn'}
                          </span>
                       </div>
                    </div>

                    <button type="submit" className="btn btn-warning w-100 fw-bold py-2 rounded-3 text-dark">
                      Áp Dụng
                    </button>
                    
                    <button 
                      type="button" 
                      className="btn btn-link text-decoration-none text-muted w-100 mt-2 btn-sm"
                      onClick={() => {
                        setType("all");
                        setBrand("all");
                        setMaxPrice("");
                        setQ("");
                        navigate('/cars');
                      }}
                    >
                      Xóa bộ lọc
                    </button>
                  </form>
                </div>
                
                {/* Mini Stats in Sidebar */}
                <div className="card border-0 shadow-sm rounded-4 p-4 mt-4 bg-primary text-white" style={{background: 'linear-gradient(135deg, #0d6efd, #0dcaf0)'}}>
                   <h6 className="fw-bold mb-3"><i className="bi bi-graph-up me-2"></i>Thống Kê Nhanh</h6>
                   <div className="d-flex justify-content-between mb-2">
                      <span>Tổng xe:</span>
                      <span className="fw-bold">{allCars.length}</span>
                   </div>
                   <div className="d-flex justify-content-between">
                      <span>Đang hiển thị:</span>
                      <span className="fw-bold">{filtered.length}</span>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Product Grid (Right Column) */}
            <div className="col-lg-9">
                {/* Stats Section (Horizontal above grid) */}
                {!loading && !error && (
                  <motion.div
                    className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="text-muted">Hiển thị <strong>{filtered.length}</strong> kết quả</span>
                    <div className="d-flex gap-2">
                       {/* Sort placeholder if needed later */}
                    </div>
                  </motion.div>
                )}

                {/* Loading & Error States */}
                {loading && (
                  <motion.div className="text-center py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="spinner-border text-warning" role="status"></div>
                  </motion.div>
                )}
                {error && (
                  <motion.div className="alert alert-danger text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>
                )}

                {/* Cars Grid */}
                {!loading && !error && (
                  <motion.div
                    className="cars-grid-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {filtered.length > 0 ? (
                      <div className="row g-4">
                        <AnimatePresence>
                          {filtered.map((c, i) => (
                            <motion.div
                              key={c._id}
                              className="col-12 col-md-6 col-xl-4"
                              initial={{ opacity: 0, scale: 0.9, y: 30 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.4, delay: i * 0.05 }}
                              whileHover={{ zIndex: 10 }}
                            >
                              <CarCard car={c} />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <i className="bi bi-search" style={{ fontSize: "3rem", color: "#eee" }}></i>
                        <h4 className="mt-3 text-muted">Không tìm thấy xe nào phù hợp</h4>
                        <button 
                           className="btn btn-outline-warning mt-2"
                           onClick={() => {
                              setType("all");
                              setBrand("all");
                              setMaxPrice("");
                              setQ("");
                           }}
                        >
                           Xóa bộ lọc & Thử lại
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {!loading && !error && (
          <motion.div
            className="cta-section py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="container px-2 px-md-5">
              <div className="cta-card">
              <h3>Không tìm thấy những gì bạn đang tìm kiếm?</h3>
              <p>Liên hệ với đội bán hàng của chúng tôi để có thêm tùy chọn</p>
              <a href="/contact" className="btn btn-cta">Liên Lạc Với Chúng Tôi</a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
