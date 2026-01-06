import { motion } from "framer-motion";
import CarouselHero from "../Component/Carousel";
import CarCard from "../Component/CarCard";
import "./Home.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/vehicles?limit=12`);
        if (!res.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data = await res.json();
        setVehicles(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
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
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Featured Cars
          </motion.h2>

          <div className="cards-grid">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              vehicles.map((c, index) => (
                <motion.div
                  key={c._id}
                  className="card-item"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.06, duration: 0.45 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <CarCard car={c} />
                </motion.div>
              ))
            )}
          </div>
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
            <motion.img src="/react-car-shop/images/sale1.png" alt="sale" className="split-img" initial={{ x: 30, opacity:0 }} whileInView={{ x:0, opacity:1 }} transition={{duration:0.6}} />
            <motion.img src="/react-car-shop/images/sale2.png" alt="sale2" className="split-img" initial={{ x: -30, opacity:0 }} whileInView={{ x:0, opacity:1 }} transition={{duration:0.6}} />
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
            <motion.img src="/react-car-shop/images/cus1.png" alt="cus1" className="split-img" initial={{ x: -30, opacity:0 }} whileInView={{ x:0, opacity:1 }} transition={{duration:0.6}} />
            <motion.img src="/react-car-shop/images/cus5.png" alt="cus5" className="split-img" initial={{ x: 30, opacity:0 }} whileInView={{ x:0, opacity:1 }} transition={{duration:0.6}} />
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
