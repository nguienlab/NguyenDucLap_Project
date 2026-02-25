// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // 👈 dùng BrowserRouter
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ProductDetailProvider } from "./context/ProductDetailContext.jsx";

import 'bootstrap/dist/css/bootstrap.min.css'; // nếu dùng bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css'; // quan trọng để hiển thị icons


import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 👇 Bọc App bằng BrowserRouter và basename */}
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ProductDetailProvider>
            <App />
          </ProductDetailProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
