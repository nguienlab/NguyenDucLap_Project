import { motion } from "framer-motion";
import "./Contact.css";
import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_BASE_URL + "/feedback",
        formData
      );
      setSuccess("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: "📞",
      title: "Điện Thoại",
      content: "+84 (0) 123 456 789",
      delay: 0.1
    },
    {
      icon: "📧",
      title: "Email",
      content: "support@sportcars.com",
      delay: 0.2
    },
    {
      icon: "📍",
      title: "Địa Chỉ",
      content: "123 Phố Ô Tô, Hà Nội, Việt Nam",
      delay: 0.3
    },
    {
      icon: "⏰",
      title: "Giờ Làm Việc",
      content: "Thứ Hai - Thứ Sáu: 8am-6pm",
      delay: 0.4
    }
  ];

  const features = [
    { icon: "⚡", title: "Phản Hồi Nhanh", desc: "Trả lời trong 24 giờ" },
    { icon: "🎯", title: "Đội Chuyên Gia", desc: "Nhân viên hỗ trợ chuyên nghiệp" },
    { icon: "🔒", title: "An Toàn", desc: "Dữ liệu của bạn được bảo vệ" },
    { icon: "🌍", title: "24/7", desc: "Luôn sẵn sàng giúp đỡ" }
  ];

  return (
    <div className="contact-wrapper">
      <div className="contact-bg" />
      
      {/* Hero Section */}
      <motion.section 
        className="contact-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Liên Hệ Với Chúng Tôi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Có câu hỏi? Chúng tôi rất muốn nghe từ bạn. Gửi cho chúng tôi một tin nhắn!
          </motion.p>
        </div>
        <motion.div 
          className="hero-decoration"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🏎️
        </motion.div>
      </motion.section>

      {/* Contact Methods Grid */}
      <section className="contact-methods py-5">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Thông Tin Liên Hệ Nhanh
          </motion.h2>
          
          <div className="methods-grid">
            {contactMethods.map((method, idx) => (
              <motion.div
                key={idx}
                className="method-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: method.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="method-icon">{method.icon}</div>
                <h3>{method.title}</h3>
                <p>{method.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            {/* Left Column - Form */}
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="form-wrapper">
                <h2 className="form-title">Gửi Cho Chúng Tôi Một Tin Nhắn</h2>
                <p className="form-subtitle">Cho chúng tôi biết thêm về yêu cầu của bạn</p>
                <form onSubmit={handleSubmit} className="contact-form">
                  {error && (
                    <motion.div
                      className="alert alert-danger"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <i className="bi bi-exclamation-circle me-2"></i>Gửi tin nhắn thất bại. Vui lòng thử lại.
                    </motion.div>
                  )}
                  {success && (
                    <motion.div
                      className="alert alert-success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <i className="bi bi-check-circle me-2"></i>Tin nhắn đã gửi thành công! Chúng tôi sẽ liên lạc với bạn sớm.
                    </motion.div>
                  )}

                  <motion.div 
                    className="form-group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <label className="form-label">Tên của Bạn</label>
                    <input
                      type="text"
                      className="form-control form-input"
                      placeholder="Nguyễn Văn A"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>

                  <motion.div 
                    className="form-group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    viewport={{ once: true }}
                  >
                    <label className="form-label">Địa Chỉ Email</label>
                    <input
                      type="email"
                      className="form-control form-input"
                      placeholder="nguyen@example.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>

                  <motion.div 
                    className="form-group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label className="form-label">Chủ Đề</label>
                    <input
                      type="text"
                      className="form-control form-input"
                      placeholder="Chúng tôi có thể giúp gì?"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>

                  <motion.div 
                    className="form-group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    viewport={{ once: true }}
                  >
                    <label className="form-label">Tin Nhắn</label>
                    <textarea
                      className="form-control form-input"
                      rows="5"
                      placeholder="Cho chúng tôi biết thêm về yêu cầu của bạn..."
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="btn btn-submit w-100"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send me-2"></i>Gửi Tin Nhắn
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Right Column - Features */}
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="features-box">
                <h2 className="features-title">Tại Sao Chọn Chúng Tôi?</h2>
                
                <div className="features-grid">
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      className="feature-item"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
                      viewport={{ once: true }}
                      whileHover={{ x: 10 }}
                    >
                      <div className="feature-icon">{feature.icon}</div>
                      <div className="feature-content">
                        <h4>{feature.title}</h4>
                        <p>{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="info-box"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3>📍 Ghé Thăm Showroom Của Chúng Tôi</h3>
                  <p>123 Phố Ô Tô, Hà Nội, Việt Nam</p>
                  <p>Thứ Hai - Thứ Sáu: 8am-6pm | Thứ Bảy - Chủ Nhật: 10am-4pm</p>
                </motion.div>

                <motion.div
                  className="social-links"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4>Theo Dõi Chúng Tôi</h4>
                  <div className="social-icons">
                    <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="social-icon"><i className="bi bi-twitter"></i></a>
                    <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
                    <a href="#" className="social-icon"><i className="bi bi-youtube"></i></a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="contact-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container text-center">
          <h2>Sẵn Sàng Bắt Đầu?</h2>
          <p>Chọn phương tiện hoàn hảo của bạn ngày hôm nay</p>
          <motion.a
            href="/cars"
            className="btn btn-cta-large"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Duyệt Bộ Sưu Tập Của Chúng Tôi
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}
