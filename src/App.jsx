import { Routes, Route, useLocation } from "react-router-dom";

// Components & Pages
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Home from "./Pages/Home";
import Cars from "./Pages/Cars";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";
import ProtectedRoute from "./Component/ProtectedRoute";
import AdminRoute from "./Component/AdminRoute";
import DashboardLayout from "./Pages/Dashboard/DashboardLayout";
import UserDashboard from "./Pages/Dashboard/UserDashboard";
import MyOrders from "./Pages/Dashboard/MyOrders";
import ManageVehicles from "./Pages/Dashboard/ManageVehicles";
import ManageUsers from "./Pages/Dashboard/ManageUsers";
import ManageOrders from "./Pages/Dashboard/ManageOrders";
import Checkout from "./Pages/Checkout";
import ProductDetailPanel from "./Component/ProductDetailPanel";
import { useProductDetail } from "./context/ProductDetailContext";

import "bootstrap/dist/css/bootstrap.min.css";


export default function App() {
  const location = useLocation();
  const { isPanelOpen } = useProductDetail();
  const isDashboardPage = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/profile');

  return (
    <>
      <div className={`app-container ${isPanelOpen ? 'app-container-shifted' : ''}`}>
        <Navbar />
        <main 
          style={{ 
            minHeight: "80vh",
          }}>
          
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
              <Route path="/profile" element={<Profile />} /> {/* User's Profile/Dashboard */}
              <Route path="/profile/my-orders" element={<MyOrders />} /> {/* User's Orders */}
              <Route path="/checkout" element={<Checkout />} />
            </Route>

            {/* Protected Dashboard Routes (Admin Only) */}
            <Route path="/dashboard" element={<AdminRoute />}> {/* AdminRoute here */}
              <Route element={<DashboardLayout />}>
                <Route index element={<UserDashboard />} /> {/* Admin Dashboard Home */}
                
                {/* Admin Management Routes */}
                <Route path="manage-vehicles" element={<ManageVehicles />} />
                <Route path="manage-users" element={<ManageUsers />} />
                <Route path="manage-orders" element={<ManageOrders />} />
              </Route>
            </Route>

          </Routes>
        </main>
        {!isDashboardPage && <Footer />}
      </div>
      <ProductDetailPanel />
    </>
  );
}
