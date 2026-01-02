import { motion } from "framer-motion";
import "./Contact.css";
import CarouselHero from "../Component/Carousel";
import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/feedback",
        formData
      );
      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="contact-wrapper">
      {/* Ảnh nền cho phần Contact */}
      <div className="contact-bg" />

      {/* Nội dung chính */}
      <div className="container contact-content">
        {/* Hero */}
        <CarouselHero />

        <motion.h2
          className="text-center mb-5 mt-3 fw-bold"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>

        <motion.form
          className="row g-4 shadow-lg p-4 contact-form"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
        >
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          {/* Name */}
          <motion.div className="col-md-6">
            <label className="form-label fw-semibold">
              Name <i className="fas fa-user"></i>
            </label>
            <motion.input
              className="form-control custom-input"
              placeholder="Your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              required
            />
          </motion.div>

          {/* Email */}
          <motion.div className="col-md-6">
            <label className="form-label fw-semibold">
              Email <i className="fas fa-envelope"></i>
            </label>
            <motion.input
              type="email"
              className="form-control custom-input"
              placeholder="you@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              required
            />
          </motion.div>

          {/* Message */}
          <motion.div className="col-12">
            <label className="form-label fw-semibold">
              Message <i className="fas fa-comment-dots"></i>
            </label>
            <motion.textarea
              className="form-control custom-input"
              rows="4"
              placeholder="How can we help?"
              name="message"
              value={formData.message}
              onChange={handleChange}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              required
            ></motion.textarea>
          </motion.div>

          {/* Button */}
          <div className="col-12 text-center">
            <motion.button
              type="submit"
              className="btn btn-primary contact-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message <i className="fas fa-paper-plane"></i>
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
