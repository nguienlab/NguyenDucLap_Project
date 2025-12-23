import { motion } from "framer-motion";
import "./Footer.css"; // import CSS riêng cho gọn

export default function Footer() {
  const linkHover = { scale: 1.1, color: "#0d6efd" }; // hiệu ứng hover

  return (
    <div className="footer_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="footeer_logo">
              <img src="images/logo3.png" alt="Logo" />
            </div>
          </div>
        </div>
        <div className="footer_section_2">
          <div className="row">
            {/* Subscribe */}
            <div className="col">
              <h4 className="footer_taital">Subscribe Now</h4>
              <p className="footer_text ">
                There are many variations of passages of Lorem Ipsum available,
              </p>
              <div className="form-group">
                <input
                  className="update_mail mb-3"
                  placeholder="Enter Your Email"
                  rows="5"
                  id="comment"
                  name="Enter Your Email"
                ></input>
                <motion.div whileHover={linkHover} className="subscribe_bt">
                  <a href="#">Subscribe</a>
                </motion.div>
              </div>
            </div>

            {/* Information */}
            <div className="col">
              <h4 className="footer_taital">Information</h4>
              <p className="lorem_text">
                There are many variations of passages of Lorem Ipsum available,
                but the majority
              </p>
            </div>

            {/* Helpful Links */}
            <div className="col">
              <h4 className="footer_taital">Helpful Links</h4>
              <p className="lorem_text">
                There are many variations of passages of Lorem Ipsum available,
                but the majority
              </p>
            </div>

            {/* Investments */}
            <div className="col">
              <h4 className="footer_taital">Invesments</h4>
              <p className="lorem_text">
                There are many variations of passages of Lorem Ipsum available,
                but the majority
              </p>
            </div>

            {/* Contact Us */}
            <div className="col">
              <h4 className="footer_taital">Contact Us</h4>
              <div className="location_text">
                <a>
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  <span className="padding_left_15"> Location: Hanoi, Vietnam</span>
                </a>
              </div>
              <div className="location_text">
                <a>
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <span className="padding_left_15"> (+84) 0354157057</span>
                </a>
              </div>
              <div className="location_text">
                <a>
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <span className="padding_left_15"> CSKH@gmail.com</span>
                </a>
              </div>

              {/* Social Icons */}
              <div className="social_icon">
                <ul>
                  <li>
                    <motion.a whileHover={linkHover} href="https://www.facebook.com/">
                      <i className="fab fa-facebook" aria-hidden="true"></i>
                    </motion.a>
                  </li>
                  <li>
                    <motion.a whileHover={linkHover} href="https://twitter.com/">
                      <i className="fab fa-twitter" aria-hidden="true"></i>
                    </motion.a>
                  </li>
                  <li>
                    <motion.a whileHover={linkHover} href="https://www.linkedin.com/">
                      <i className="fab fa-linkedin" aria-hidden="true"></i>
                    </motion.a>
                  </li>
                  <li>
                    <motion.a whileHover={linkHover} href="https://www.instagram.com/">
                      <i className="fab fa-instagram" aria-hidden="true"></i>
                    </motion.a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
