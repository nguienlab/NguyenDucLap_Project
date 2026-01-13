import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Contact() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.hash === '#feedback-form') {
      const element = document.getElementById('feedback-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await axios.post(
        import.meta.env.VITE_API_BASE_URL + "/feedback",
        formData
      );
      setSuccess("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: "bi-geo-alt", title: "Trụ Sở Chính", desc: "123 Đường Đua F1, Hà Nội" },
    { icon: "bi-telephone", title: "Hotline 24/7", desc: "+84 0354 157 057" },
    { icon: "bi-envelope", title: "Email Hỗ Trợ", desc: "support@sportcars.vn" },
  ];

  return (
    <div style={{ backgroundColor: "#f4f6f8", minHeight: "100vh", color: "#1a1a1a", paddingTop: "100px", paddingBottom: "50px", overflowX: "hidden" }}>
      
      {/* Background Decor (Light Mode) */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
         <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(255,153,0,0.08) 0%, rgba(0,0,0,0) 70%)" }}></div>
         <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(79,70,229,0.05) 0%, rgba(0,0,0,0) 70%)" }}></div>
      </div>

      <div className="container position-relative z-1">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h5 className="text-warning text-uppercase letter-spacing-3 fw-bold mb-2">Trung Tâm Hỗ Trợ</h5>
          <h1 className="display-4 fw-bolder text-dark">Kết Nối Với Chúng Tôi</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn về siêu xe và dịch vụ.</p>
        </motion.div>

        <div className="row g-5">
          {/* Left Column: Contact Info & Map */}
          <motion.div 
            className="col-lg-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="d-flex flex-column gap-4">
              {contactInfo.map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="p-4 rounded-4 shadow-sm bg-white"
                  whileHover={{ x: 10, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
                  style={{ border: "1px solid #eee" }}
                >
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-warning d-flex align-items-center justify-content-center text-dark me-3 shadow-sm" style={{ width: "50px", height: "50px", fontSize: "1.5rem" }}>
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold text-dark mb-1">{item.title}</h5>
                      <p className="mb-0 text-muted">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Google Maps Showroom */}
              <div className="rounded-4 overflow-hidden shadow-md mt-2" style={{ height: "300px", border: "1px solid #eee" }}>
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29793.988211049866!2d105.8369637!3d21.022739599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2sHanoi!5e0!3m2!1sen!2s!4v1768275407116!5m2!1sen!2s" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                 ></iframe>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            id="feedback-form"
            className="col-lg-7"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="p-5 rounded-5 shadow-lg h-100 bg-white" style={{ border: "1px solid #f0f0f0" }}>
              <h3 className="fw-bold text-dark mb-4">Gửi Tin Nhắn</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input 
                        type="text" 
                        className="form-control bg-light border-0 text-dark" 
                        id="name" 
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ height: "60px" }}
                      />
                      <label htmlFor="name" className="text-muted">Họ và Tên</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input 
                        type="email" 
                        className="form-control bg-light border-0 text-dark" 
                        id="email" 
                        placeholder="Email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ height: "60px" }}
                      />
                      <label htmlFor="email" className="text-muted">Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input 
                        type="text" 
                        className="form-control bg-light border-0 text-dark" 
                        id="subject" 
                        placeholder="Subject" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        style={{ height: "60px" }}
                      />
                      <label htmlFor="subject" className="text-muted">Chủ Đề</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea 
                        className="form-control bg-light border-0 text-dark" 
                        placeholder="Message" 
                        id="message" 
                        style={{ height: "150px" }}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                      <label htmlFor="message" className="text-muted">Nội Dung Tin Nhắn</label>
                    </div>
                  </div>
                  
                  {error && <div className="col-12 text-danger"><i className="bi bi-exclamation-circle me-2"></i>{error}</div>}
                  {success && <div className="col-12 text-success"><i className="bi bi-check-circle me-2"></i>{success}</div>}

                  <div className="col-12 mt-4">
                    <motion.button 
                      type="submit" 
                      className="btn btn-warning w-100 py-3 rounded-pill fw-bold fs-5 text-dark shadow-lg"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(255, 153, 0, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      {loading ? 'Đang Gửi...' : 'Gửi Ngay'} <i className="bi bi-send-fill ms-2"></i>
                    </motion.button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}