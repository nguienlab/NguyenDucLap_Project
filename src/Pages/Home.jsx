import { motion } from "framer-motion";
import CarouselHero from "../Component/Carousel";
import CarCard from "../Component/CarCard";
import "./Home.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVehicles = async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      // Bỏ limit=12 để hiện tất cả xe
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/vehicles?t=${new Date().getTime()}`);
      if (!res.ok) {
        throw new Error('Failed to fetch vehicles');
      }
      const data = await res.json();
      
      // Chỉ cập nhật nếu dữ liệu thực sự thay đổi để tránh render thừa
      setVehicles(data.data);
    } catch (err) {
      if (!isSilent) setError(err.message);
    } finally {
      if (!isSilent) setLoading(false);
    }
  };

  useEffect(() => {
    // Lần đầu tải dữ liệu
    fetchVehicles();

    // Thiết lập polling mỗi 5 giây để cập nhật xe mới 'ngầm'
    const interval = setInterval(() => {
      fetchVehicles(true);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-wrapper">
      <header className="home-hero">
        <div className="hero-inner container">
          <div className="hero-left">
            <motion.h1
              className="hero-head"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Chọn xe mơ ước — Dễ dàng và Uy tín
            </motion.h1>
            <motion.p
              className="hero-lead"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hàng trăm mẫu xe, giá tốt và dịch vụ hậu mãi tận tâm. Khám phá bộ sưu tập
              của chúng tôi ngay hôm nay.
            </motion.p>
            <div className="hero-cta">
              <a className="btn-hero" href="/cars">Xem xe nổi bật</a>
              <a className="btn-ghost ms-3" href="/contact">Liên hệ ngay</a>
            </div>
          </div>

          <div className="hero-right">
            <div className="carousel-frame">
              <CarouselHero />
            </div>
          </div>
        </div>
      </header>

      <main className="home-content container">
        <section className="featured-section">
          <motion.div
            className="d-flex justify-content-between align-items-end mb-5"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h5 className="text-warning text-uppercase letter-spacing-2 mb-2">Bộ Sưu Tập</h5>
              <h2 className="section-title m-0 display-5 fw-bold">Xe Nổi Bật</h2>
            </div>
            <a href="/cars" className="btn btn-outline-dark rounded-pill px-4">Xem Tất Cả <i className="bi bi-arrow-right ms-2"></i></a>
          </motion.div>

          {loading ? (
            <div className="text-center py-5"><div className="spinner-border text-warning" role="status"></div></div>
          ) : error ? (
            <p className="text-danger text-center">{error}</p>
          ) : (
            <>
               {/* Bento Grid Layout */}
               <div className="row g-4 mb-5">
                  {/* Spotlight Item (Big Left) */}
                  {vehicles.length > 0 && (
                    <div className="col-lg-7">
                        <motion.div 
                          className="h-100 position-relative rounded-4 overflow-hidden shadow-lg"
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          style={{ minHeight: '500px' }}
                        >
                           <img 
                              src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${vehicles[0].image}`} 
                              alt={vehicles[0].name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                           />
                           <div className="position-absolute bottom-0 start-0 w-100 p-5" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                              <span className="badge bg-warning text-dark mb-3 px-3 py-2">MỚI NHẤT</span>
                              <h2 className="text-white display-6 fw-bold mb-2">{vehicles[0].name}</h2>
                              <p className="text-white-50 mb-4" style={{ maxWidth: '80%' }}>{vehicles[0].description.substring(0, 100)}...</p>
                              <div className="d-flex align-items-center gap-3">
                                <h3 className="text-warning m-0 fw-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(vehicles[0].price)}</h3>
                                <button className="btn btn-light rounded-circle" style={{width: 50, height: 50}} onClick={() => window.location.href=`/cars`}>
                                   <i className="bi bi-arrow-right"></i>
                                </button>
                              </div>
                           </div>
                        </motion.div>
                    </div>
                  )}

                  {/* Secondary Items (Right Column) */}
                  <div className="col-lg-5 d-flex flex-column gap-4">
                      {vehicles.slice(1, 3).map((car, idx) => (
                         <motion.div 
                            key={car._id}
                            className="flex-grow-1 position-relative rounded-4 overflow-hidden shadow"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            style={{ minHeight: '240px' }}
                         >
                            <img 
                              src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${car.image}`} 
                              alt={car.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                           />
                           <div className="position-absolute top-0 start-0 w-100 h-100 p-4 d-flex flex-column justify-content-end" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)' }}>
                              <h4 className="text-white fw-bold">{car.name}</h4>
                              <p className="text-warning fw-bold mb-0">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(car.price)}</p>
                           </div>
                         </motion.div>
                      ))}
                  </div>
               </div>
               
               {/* Rest of Collection */}
               <h4 className="fw-bold mb-4">Các mẫu xe khác</h4>
               <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {vehicles.slice(3).map((c, index) => (
                  <motion.div
                    key={c._id}
                    className="card-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <CarCard car={c} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </section>

        <section className="sales-section">
          <h3 className="section-title">📊 Doanh số cửa hàng (2021–2025)</h3>
          <div className="sales-grid">
            {[
              { year: 2021, count: "320 xe", rev: "35 tỷ" },
              { year: 2022, count: "450 xe", rev: "50 tỷ" },
              { year: 2023, count: "500 xe", rev: "60 tỷ" },
              { year: 2024, count: "610 xe", rev: "75 tỷ" },
              { year: 2025, count: "700 xe", rev: "85 tỷ" },
            ].map((d, i) => (
              <motion.div
                key={d.year}
                className="sales-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="sales-year">{d.year}</div>
                <div className="sales-count">{d.count}</div>
                <div className="sales-rev">Doanh thu: {d.rev}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="split-section">
          <div className="split-media">
            <motion.img src="/images/sale1.png" alt="sale" className="split-img" initial={{ x: 30, opacity:0 }} whileInView={{ x:0, opacity:1 }} transition={{duration:0.6}} />
            <motion.img src="/images/sale2.png" alt="sale2" className="split-img" initial={{ x: -30, opacity:0 }} whileInView={{ x:0, opacity:1 }} transition={{duration:0.6}} />
          </div>

          <div className="split-text">
            <h3>Doanh số 2024</h3>
            <p className="lead">Chúng tôi đã bán hơn <strong>10.000 xe</strong> trong năm qua, mở rộng khắp 20 tỉnh thành, đạt tỷ lệ hài lòng 98%.</p>
            <ul>
              <li>10 showroom trên toàn quốc</li>
              <li>Dịch vụ hậu mãi tận tâm</li>
              <li>Khuyến mãi hấp dẫn quanh năm</li>
            </ul>
          </div>
        </section>

        <section className="split-section reverse">
          <div className="split-media">
            <motion.img src="/images/cus1.png" alt="cus1" className="split-img" initial={{ x: -30, opacity:0 }} whileInView={{ x:0, opacity:1 }} transition={{duration:0.6}} />
            <motion.img src="/images/cus5.png" alt="cus5" className="split-img" initial={{ x: 30, opacity:0 }} whileInView={{ x:0, opacity:1 }} transition={{duration:0.6}} />
          </div>

          <div className="split-text">
            <h3>Khách hàng & Dịch vụ</h3>
            <p className="lead">Hơn <strong>5000 khách hàng</strong> đã tin tưởng. Chúng tôi xây dựng cộng đồng yêu xe năng động với nhiều ưu đãi.</p>
            <ul>
              <li>Hỗ trợ tài chính linh hoạt</li>
              <li>Bảo hành lên tới 5 năm</li>
              <li>Sự kiện lái thử thường xuyên</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
