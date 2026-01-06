import { motion } from "framer-motion";
import "./About.css";

export default function About() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="about-wrapper creative-about">
      <div className="about-hero">
        <div className="hero-left">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            Về Chúng Tôi
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Chúng tôi là <strong>SPORT-CARS</strong> — nơi hội tụ những chiếc xe đam mê,
            phong cách và tốc độ. Không theo lối mòn, chúng tôi thiết kế trải nghiệm
            mua sắm khác biệt cho người yêu xe.
          </motion.p>
          <motion.a
            href="/cars"
            className="btn-hero"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring" }}
          >
            Khám phá bộ sưu tập
          </motion.a>
        </div>

        <div className="hero-right">
          <div className="mosaic">
            <img src={`${baseUrl}images/logo1.png`} alt="logo" />
            <img src={`${baseUrl}images/nsl.png`} alt="founder" />
            <img src={`${baseUrl}images/banner-bg.png`} alt="banner" />
          </div>
        </div>
      </div>

      <div className="about-content container">
        <section className="values-section">
          <motion.div
            className="values-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="value-card v-orange">
              <div className="val-icon">🏁</div>
              <h4>Tốc độ & Hiệu năng</h4>
              <p>Luôn đặt trải nghiệm lái lên trên hết.</p>
            </div>
            <div className="value-card v-dark">
              <div className="val-icon">🛡️</div>
              <h4>Đảm bảo chính hãng</h4>
              <p>Bảo hành và dịch vụ theo tiêu chuẩn toàn cầu.</p>
            </div>
            <div className="value-card v-muted">
              <div className="val-icon">🤝</div>
              <h4>Trải nghiệm cá nhân hóa</h4>
              <p>Tư vấn và hỗ trợ theo nhu cầu thực tế.</p>
            </div>
            <div className="value-card v-glass">
              <div className="val-icon">🌐</div>
              <h4>Hỗ trợ 24/7</h4>
              <p>Luôn sẵn sàng khi bạn cần.</p>
            </div>
          </motion.div>
        </section>

        <section className="timeline-section">
          <h3 className="section-heading">Hành trình của chúng tôi</h3>
          <div className="timeline">
            {[2010, 2015, 2020, 2022, 2024].map((yr, i) => (
              <motion.div
                key={yr}
                className="timeline-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="timeline-year">{yr}</div>
                <div className="timeline-body">{yr === 2010 ? 'Thành lập showroom đầu tiên' : yr === 2015 ? 'Mở rộng thị trường' : yr === 2020 ? 'Đạt mốc 1000 xe' : yr === 2022 ? 'Bắt đầu dịch vụ quốc tế' : 'Đổi mới trải nghiệm khách hàng'}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="stats-cta">
          <div className="stats">
            <div className="stat">
              <div className="num">{320}</div>
              <div className="label">Xe bán ra (2024)</div>
            </div>
            <div className="stat">
              <div className="num">{12}</div>
              <div className="label">Thương hiệu</div>
            </div>
            <div className="stat">
              <div className="num">24/7</div>
              <div className="label">Hỗ trợ</div>
            </div>
          </div>

          <div className="cta-split">
            <h4>Muốn làm chủ tay lái?</h4>
            <a href="/contact" className="btn btn-primary">Liên hệ tư vấn</a>
          </div>
        </section>
      </div>
    </div>
  );
}
