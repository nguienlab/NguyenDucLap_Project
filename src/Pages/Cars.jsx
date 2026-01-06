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
            className="title-section mb-5"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="cars-title">
              {keyword ? `Kết quả tìm kiếm cho "${keyword}"` : "Khám Phá Các Phương Tiện"}
            </h1>
            <p className="cars-subtitle">
              Tìm thấy {filtered.length} phương tiện
            </p>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            className="filter-section mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className="filter-card">
              <h5 className="filter-title mb-4">🔍 Lọc Phương Tiện</h5>
              <form onSubmit={handleLocalSearchSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-md-3">
                    <label className="form-label">Tìm Kiếm</label>
                    <input
                      value={q}
                      onChange={e => setQ(e.target.value)}
                      className="form-control filter-input"
                      placeholder="Theo tên..."
                    />
                  </div>
                  <div className="col-12 col-md-2">
                    <label className="form-label">Loại</label>
                    <select
                      value={type}
                      onChange={e => setType(e.target.value)}
                      className="form-select filter-input"
                    >
                      <option value="all">Tất cả loại</option>
                      <option value="ô tô">Ô tô</option>
                      <option value="xe máy">Xe máy</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-2">
                    <label className="form-label">Thương Hiệu</label>
                    <select
                      value={brand}
                      onChange={e => setBrand(e.target.value)}
                      className="form-select filter-input"
                    >
                      <option value="all">Tất cả thương hiệu</option>
                      {brands.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-md-3">
                    <label className="form-label">Giá Tối Đa (VND)</label>
                    <input
                      type="number"
                      min="0"
                      step="10000000"
                      value={maxPrice}
                      onChange={e => setMaxPrice(e.target.value)}
                      className="form-control filter-input"
                      placeholder="ví dụ: 500000000"
                    />
                  </div>
                  <div className="col-12 col-md-2 d-flex align-items-end">
                    <button type="submit" className="btn btn-filter w-100">Áp Dụng</button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Stats Section */}
          {!loading && !error && (
            <motion.div
              className="stats-section mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="row g-3">
                <div className="col-6 col-md-3">
                  <div className="stat-card">
                    <div className="stat-number">{allCars.length}</div>
                    <div className="stat-label">Tổng Phương Tiện</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-card">
                    <div className="stat-number">{filtered.length}</div>
                    <div className="stat-label">Kết Quả Khớp</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-card">
                    <div className="stat-number">{brands.length}</div>
                    <div className="stat-label">Thương Hiệu Có Sẵn</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-card">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">Hỗ Trợ</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Loading & Error States */}
          {loading && (
            <motion.div
              className="text-center py-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Đang tải...</span>
              </div>
              <p className="mt-3">Đang tải phương tiện...</p>
            </motion.div>
          )}
          {error && (
            <motion.div
              className="alert alert-danger text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          {/* Cars Grid */}
          {!loading && !error && (
            <motion.div
              className="cars-grid-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {filtered.length > 0 ? (
                <div className="row g-4">
                  <AnimatePresence>
                    {filtered.map((c, i) => (
                      <motion.div
                        key={c._id}
                        className="col-12 col-sm-6 col-lg-4"
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <CarCard car={c} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  className="empty-state text-center py-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <i className="bi bi-inbox" style={{ fontSize: "3rem", color: "#ccc" }}></i>
                  <h4 className="mt-3">Không tìm thấy phương tiện</h4>
                  <p className="text-muted">Thử điều chỉnh bộ lọc của bạn</p>
                </motion.div>
              )}
            </motion.div>
          )}
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
