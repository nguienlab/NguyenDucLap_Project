import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

export default function Navbar() {
  const [searchText, setSearchText] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/cars?keyword=${searchText.trim()}`);
      setSearchText("");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Vehicles", path: "/cars" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.nav
        className={`navbar navbar-expand-lg fixed-top px-3 transition-all ${isScrolled ? "scrolled-nav" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: isScrolled ? "95%" : "90%",
          maxWidth: "1400px",
          margin: "20px auto 0",
          borderRadius: "50px",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          transition: "all 0.3s ease-in-out",
          zIndex: 1000,
        }}
      >
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center me-4" to="/">
            <motion.img
              src="/react-car-shop/images/logo1.png"
              alt="logo"
              style={{
                height: 45,
                width: 45,
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: 10,
                border: "2px solid #ff9900",
              }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            />
            <span className="fw-bold text-dark" style={{ letterSpacing: "1px" }}>
              SPORT<span style={{ color: "#ff9900" }}>CARS</span>
            </span>
          </Link>

          {/* Mobile Toggler */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarContent">
            {/* Centered Links */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
              {navLinks.map((link) => (
                <li className="nav-item px-2" key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `nav-link fw-bold position-relative px-3 ${isActive ? "text-warning" : "text-dark"}`
                    }
                    style={{ fontSize: "0.95rem", transition: "color 0.3s" }}
                  >
                    {({ isActive }) => (
                      <>
                        {link.name}
                        {isActive && (
                          <motion.div
                            layoutId="navbar-underline"
                            className="position-absolute bottom-0 start-0 w-100"
                            style={{
                              height: "3px",
                              background: "#ff9900",
                              borderRadius: "2px",
                            }}
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Right Side: Search & User Actions */}
            <div className="d-flex align-items-center gap-3">
              {/* Desktop Search */}
              <form className="d-none d-lg-flex position-relative" onSubmit={handleSearchSubmit}>
                <input
                  className="form-control rounded-pill pe-5 border-0 bg-light"
                  type="search"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: "200px", transition: "width 0.3s" }}
                  onFocus={(e) => (e.target.style.width = "250px")}
                  onBlur={(e) => (e.target.style.width = "200px")}
                />
                <button
                  className="btn position-absolute end-0 top-50 translate-middle-y rounded-circle text-muted"
                  type="submit"
                  style={{ right: "5px" }}
                >
                  <i className="bi bi-search"></i>
                </button>
              </form>

              {/* Cart */}
              <Link to="/cart" className="position-relative btn btn-light rounded-circle shadow-sm" style={{width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <i className="bi bi-bag-fill"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Dropdown */}
              {user ? (
                <div className="dropdown">
                  <button
                    className="btn btn-light rounded-pill shadow-sm dropdown-toggle d-flex align-items-center gap-2 px-3"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: 28, height: 28 }}>
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="d-none d-md-block small fw-bold">{user.name.split(" ")[0]}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-4 p-2 mt-2">
                    {(user?.role === 'admin' || (user?.role === 'user' && user?.canAccessDashboard)) && (
                      <li>
                        <Link className="dropdown-item rounded-3 py-2" to="/dashboard">
                          <i className="bi bi-grid-fill me-2 text-warning"></i> Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link className="dropdown-item rounded-3 py-2" to="/profile">
                        <i className="bi bi-person-circle me-2 text-primary"></i> Profile
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item rounded-3 py-2 text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" className="btn btn-dark rounded-pill px-4 fw-bold shadow-lg" style={{ background: "linear-gradient(45deg, #111, #333)" }}>
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div style={{ height: "100px" }}></div>
    </>
  );
}