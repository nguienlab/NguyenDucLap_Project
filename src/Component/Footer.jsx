import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div style={{ position: 'relative', marginTop: '120px' }}>
      
      {/* Floating CTA Card - Nằm đè lên Footer */}
      <div className="container" style={{ position: 'relative', zIndex: 2, marginBottom: '-60px' }}>
        <div 
          className="rounded-5 p-5 d-flex flex-column flex-md-row align-items-center justify-content-between shadow-lg"
          style={{ 
            background: "linear-gradient(135deg, #ff9900 0%, #ffb347 100%)",
            color: "#000",
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative Circle */}
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
          
          <div className="mb-4 mb-md-0 position-relative z-1">
            <h2 className="fw-bolder display-6 mb-2">Bạn đã sẵn sàng lăn bánh?</h2>
            <p className="lead fw-medium mb-0">Đăng ký lái thử ngay hôm nay để trải nghiệm sự khác biệt.</p>
          </div>
          <Link 
            to="/contact#feedback-form" 
            className="btn btn-dark btn-lg rounded-pill px-5 fw-bold position-relative z-1 border-0"
            style={{ transition: 'transform 0.2s', backgroundColor: '#000', color: '#fff' }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Liên Hệ Ngay
          </Link>
        </div>
      </div>

      {/* Main Footer Area */}
      <footer style={{ backgroundColor: "#0f0f0f", color: "#b0b0b0", paddingTop: "100px", paddingBottom: "30px", position: 'relative', overflow: 'hidden' }}>
        
        {/* Giant Watermark Text */}
        <div style={{
          position: 'absolute',
          bottom: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '15vw',
          fontWeight: '900',
          color: 'rgba(255, 255, 255, 0.03)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0
        }}>
          SPORT CARS
        </div>

        <div className="container position-relative z-1">
          <div className="row g-5">
            {/* Cột 1: Brand & About */}
            <div className="col-lg-4 col-md-6">
              <div className="d-flex align-items-center mb-4">
                <div className="p-1 rounded-circle border border-2 border-warning me-3">
                   <img 
                      src="/react-car-shop/images/logo1.png" 
                      alt="Logo" 
                      style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} 
                   />
                </div>
                <div>
                   <h3 className="fw-bold text-white m-0 lh-1">SPORT-CARS</h3>
                   <small className="text-warning text-uppercase letter-spacing-2" style={{ fontSize: '0.7rem', letterSpacing: '3px' }}>Automotive</small>
                </div>
              </div>
              <p className="mb-4 text-justify" style={{ lineHeight: '1.8', opacity: 0.8 }}>
                Chúng tôi không chỉ bán xe, chúng tôi mang đến phong cách sống. Với bộ sưu tập siêu xe hàng đầu, Sport-Cars cam kết trải nghiệm tốc độ đỉnh cao và dịch vụ thượng lưu.
              </p>
              <div className="d-flex gap-3">
                {['facebook', 'instagram', 'youtube', 'tiktok'].map((icon, idx) => (
                  <motion.a 
                    key={idx}
                    href="#"
                    whileHover={{ y: -5, color: '#ff9900' }}
                    className="text-white fs-5"
                    style={{ transition: 'color 0.3s' }}
                  >
                    <i className={`bi bi-${icon}`}></i>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Cột 2: Navigation */}
            <div className="col-lg-2 col-md-6">
              <h5 className="text-white fw-bold mb-4 position-relative d-inline-block">
                Khám Phá
                <span style={{ position: 'absolute', bottom: '-8px', left: 0, width: '30px', height: '3px', background: '#ff9900' }}></span>
              </h5>
              <ul className="list-unstyled d-flex flex-column gap-3">
                {['Trang Chủ', 'Về Chúng Tôi', 'Bộ Sưu Tập', 'Tin Tức', 'Liên Hệ'].map((item, idx) => (
                   <li key={idx}>
                     <Link to="/" className="text-decoration-none d-flex align-items-center footer-link" style={{ color: '#b0b0b0', transition: '0.3s' }}
                        onMouseOver={(e) => {e.target.style.color = '#ff9900'; e.target.style.paddingLeft = '10px'}}
                        onMouseOut={(e) => {e.target.style.color = '#b0b0b0'; e.target.style.paddingLeft = '0'}}
                     >
                       <i className="bi bi-chevron-right me-2" style={{ fontSize: '0.7rem' }}></i> {item}
                     </Link>
                   </li>
                ))}
              </ul>
            </div>

            {/* Cột 3: Contact Info */}
            <div className="col-lg-3 col-md-6">
               <h5 className="text-white fw-bold mb-4 position-relative d-inline-block">
                Liên Hệ
                <span style={{ position: 'absolute', bottom: '-8px', left: 0, width: '30px', height: '3px', background: '#ff9900' }}></span>
              </h5>
              <ul className="list-unstyled d-flex flex-column gap-4">
                <li className="d-flex">
                   <div className="bg-dark rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-geo-alt text-warning"></i>
                   </div>
                   <div>
                      <h6 className="text-white mb-1">Showroom Chính</h6>
                      <span className="small">Số 123, Đường Đua F1, Hà Nội</span>
                   </div>
                </li>
                <li className="d-flex">
                   <div className="bg-dark rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-telephone text-warning"></i>
                   </div>
                   <div>
                      <h6 className="text-white mb-1">Hotline 24/7</h6>
                      <span className="small fw-bold text-white">(+84) 0354 157 057</span>
                   </div>
                </li>
                <li className="d-flex">
                   <div className="bg-dark rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-envelope text-warning"></i>
                   </div>
                   <div>
                      <h6 className="text-white mb-1">Email Hỗ Trợ</h6>
                      <span className="small">support@sportcars.vn</span>
                   </div>
                </li>
              </ul>
            </div>

            {/* Cột 4: Gallery/Instagram */}
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white fw-bold mb-4 position-relative d-inline-block">
                Thư Viện Ảnh
                <span style={{ position: 'absolute', bottom: '-8px', left: 0, width: '30px', height: '3px', background: '#ff9900' }}></span>
              </h5>
              <div className="row g-2">
                 {[
                    'AudiTTCoupe.png', 
                    'BMWZ4.png', 
                    'ToyotaGRSupra.png', 
                    'cbr1000rrr.png', 
                    'NissanZ.png', 
                    'DodgeChallenger.png'
                 ].map((img, idx) => (
                    <div className="col-4" key={idx}>
                       <div style={{ width: '100%', paddingBottom: '100%', position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
                          <img 
                             src={`/react-car-shop/images/${img}`} 
                             alt="Gallery"
                             style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', background: '#222', transition: 'transform 0.3s' }}
                             onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                             onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                          />
                       </div>
                    </div>
                 ))}
              </div>
              <div className="mt-4">
                 <small className="d-block mb-2 fw-bold text-uppercase" style={{ color: '#ff9900', letterSpacing: '1px' }}>Đăng ký nhận tin:</small>
                 <div className="input-group">
                    <input type="text" className="form-control bg-dark border-secondary text-white" placeholder="Email..." />
                    <button className="btn btn-warning"><i className="bi bi-send"></i></button>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="container position-relative z-1 mt-5">
           <div className="border-top border-secondary pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center opacity-50">
              <p className="small mb-2 mb-md-0">&copy; 2026 Sport-Cars Vietnam. Designed by You.</p>
              <div className="d-flex gap-3">
                 <Link to="#" className="text-decoration-none text-white small">Privacy Policy</Link>
                 <Link to="#" className="text-decoration-none text-white small">Terms of Service</Link>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}


