import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  const stats = [
    { num: "5000+", label: "Khách hàng hài lòng" },
    { num: "12", label: "Năm kinh nghiệm" },
    { num: "50+", label: "Giải thưởng uy tín" },
    { num: "24/7", label: "Hỗ trợ kỹ thuật" }
  ];

  const team = [
    { name: "Nguyễn Đức Lập", role: "CEO & Founder", img: "nsl.png" },
    { name: "Trần Văn A", role: "Head of Design", img: "cus1.png" },
    { name: "Lê Thị B", role: "Marketing Lead", img: "cus3.png" },
  ];

  return (
    <div style={{ backgroundColor: "#f8f9fa", overflowX: "hidden" }}>
      {/* 1. Hero Section - Parallax Style */}
      <section style={{ position: "relative", height: "80vh", overflow: "hidden" }}>
        <motion.img 
          src="/react-car-shop/images/banner-bg1.png" 
          alt="About Hero"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5)" }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
        />
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white w-75">
          <motion.h1 
            className="display-1 fw-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textShadow: "0 4px 15px rgba(0,0,0,0.5)" }}
          >
            ĐAM MÊ TỐC ĐỘ
          </motion.h1>
          <motion.p 
            className="lead fs-3 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            "Chúng tôi không chỉ bán xe, chúng tôi kiến tạo phong cách sống."
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
             <i className="bi bi-chevron-down fs-1 animate-bounce text-warning"></i>
          </motion.div>
        </div>
      </section>

      {/* 2. Story Section */}
      <section className="container py-5 my-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h5 className="text-warning text-uppercase letter-spacing-2 fw-bold mb-3">Câu chuyện của chúng tôi</h5>
              <h2 className="display-4 fw-bold mb-4 text-dark">Khởi đầu từ một gara nhỏ</h2>
              <p className="text-muted fs-5" style={{ lineHeight: "1.8", textAlign: "justify" }}>
                Sport-Cars được thành lập vào năm 2010 với một niềm tin đơn giản: Ai cũng xứng đáng được cầm lái chiếc xe mơ ước của mình. Trải qua hơn 1 thập kỷ, từ một cửa hàng sửa chữa nhỏ, chúng tôi đã vươn mình trở thành hệ thống showroom siêu xe hàng đầu Việt Nam.
              </p>
              <p className="text-muted mt-3">
                Chúng tôi cam kết minh bạch, tận tâm và đẳng cấp trong từng giao dịch.
              </p>
            </motion.div>
          </div>
          <div className="col-lg-6">
            <motion.div 
              className="position-relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src="/react-car-shop/images/cus5.png" alt="Story" className="img-fluid rounded-5 shadow-lg" />
              <div className="position-absolute bottom-0 start-0 bg-white p-4 rounded-4 shadow-lg m-4 d-none d-md-block" style={{ maxWidth: '250px' }}>
                 <p className="fst-italic m-0 text-dark">"Sự hài lòng của khách hàng là thước đo duy nhất cho thành công của chúng tôi."</p>
                 <small className="fw-bold text-warning d-block mt-2">- Founder</small>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Stats Counter */}
      <section className="bg-dark text-white py-5">
        <div className="container py-5">
          <div className="row text-center g-4">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                className="col-6 col-md-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h2 className="display-3 fw-bold text-warning mb-2">{stat.num}</h2>
                <p className="fs-5 text-white-50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Team Section */}
      <section className="container py-5 my-5">
        <div className="text-center mb-5">
          <h5 className="text-warning text-uppercase fw-bold">Đội ngũ lãnh đạo</h5>
          <h2 className="display-5 fw-bold">Những người dẫn đường</h2>
        </div>
        <div className="row g-4 justify-content-center">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100 position-relative group-hover-effect">
                <img 
                  src={`/react-car-shop/images/${member.img}`} 
                  alt={member.name} 
                  className="card-img-top" 
                  style={{ height: '400px', objectFit: 'cover', transition: 'transform 0.5s' }}
                />
                <div className="card-body text-center bg-white position-relative z-1">
                  <h4 className="fw-bold mb-1">{member.name}</h4>
                  <p className="text-warning fw-bold mb-0">{member.role}</p>
                </div>
                {/* Hover Overlay */}
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 opacity-0 hover-opacity-100 transition-opacity">
                   <div className="d-flex gap-3">
                      <button className="btn btn-warning rounded-circle"><i className="bi bi-linkedin"></i></button>
                      <button className="btn btn-warning rounded-circle"><i className="bi bi-twitter"></i></button>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-5" style={{ background: "linear-gradient(45deg, #ff9900, #ffc107)" }}>
        <div className="container text-center py-5">
          <motion.h2 
            className="display-4 fw-bold mb-4 text-dark"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            Sẵn sàng trải nghiệm?
          </motion.h2>
          <Link to="/contact" className="btn btn-dark btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg">
            Liên hệ ngay hôm nay
          </Link>
        </div>
      </section>
      
      <style>{`
        .hover-opacity-100:hover { opacity: 1 !important; }
        .transition-opacity { transition: opacity 0.3s ease; }
      `}</style>
    </div>
  );
}

