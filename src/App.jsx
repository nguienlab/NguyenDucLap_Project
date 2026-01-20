import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAuth } from "./context/AuthContext"; // Import useAuth

// Layout Components (Load immediately for LCP)
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import ProductDetailPanel from "./Component/ProductDetailPanel";
import ScrollToTop from "./Component/ScrollToTop";
import { useProductDetail } from "./context/ProductDetailContext";
import "bootstrap/dist/css/bootstrap.min.css";

// Lazy Load Pages
const Home = lazy(() => import("./Pages/Home"));
const Cars = lazy(() => import("./Pages/Cars"));
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contact"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const Cart = lazy(() => import("./Pages/Cart"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const Profile = lazy(() => import("./Pages/Profile"));

// Dashboard Lazy Load
const DashboardLayout = lazy(() => import("./Pages/Dashboard/DashboardLayout"));
const UserDashboard = lazy(() => import("./Pages/Dashboard/UserDashboard"));
const MyOrders = lazy(() => import("./Pages/Dashboard/MyOrders"));
const MyProfile = lazy(() => import("./Pages/Dashboard/MyProfile"));
const ManageVehicles = lazy(() => import("./Pages/Dashboard/ManageVehicles"));
const ManageStaff = lazy(() => import("./Pages/Dashboard/ManageStaff"));
const ManageCustomers = lazy(() => import("./Pages/Dashboard/ManageCustomers"));
const ManageOrders = lazy(() => import("./Pages/Dashboard/ManageOrders"));
const ManageFeedbacks = lazy(() => import("./Pages/Dashboard/ManageFeedbacks"));

// Routes
import ProtectedRoute from "./Component/ProtectedRoute";
import AdminRoute from "./Component/AdminRoute";

// Loading Component
const Loading = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
    <div className="spinner-border text-warning" role="status" style={{width: '3rem', height: '3rem'}}>
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default function App() {
  const location = useLocation();
  const { user } = useAuth(); // Get user from auth context
  const { isPanelOpen } = useProductDetail();
  
  // Hide Navbar/Footer only for admin users on dashboard pages
  const isAdminOnDashboard = user?.role === 'admin' && location.pathname.startsWith('/dashboard');

  return (
    <>
      <div className={`app-container ${isPanelOpen ? 'app-container-shifted' : ''}`}>
        <ScrollToTop />
        {!isAdminOnDashboard && <Navbar />}
        <main style={{ minHeight: "80vh" }}>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />

              {/* Protected Routes (User-specific) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/my-orders" element={<MyOrders />} />
                <Route path="/checkout" element={<Checkout />} />
              </Route>

              {/* Protected Dashboard Routes (Admin Only) */}
              <Route path="/dashboard" element={<AdminRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route index element={<UserDashboard />} />
                  <Route path="my-profile" element={<MyProfile />} />
                  <Route path="manage-vehicles" element={<ManageVehicles />} />
                  <Route path="manage-staff" element={<ManageStaff />} />
                  <Route path="manage-customers" element={<ManageCustomers />} />
                  <Route path="manage-orders" element={<ManageOrders />} />
                  <Route path="manage-feedbacks" element={<ManageFeedbacks />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </main>
        {!isAdminOnDashboard && <Footer />}
      </div>
      <ProductDetailPanel />
    </>
  );
}