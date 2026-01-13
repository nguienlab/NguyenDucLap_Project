import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Đưa cửa sổ trình duyệt về đầu trang khi chuyển Route
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // Dùng instant để nhảy ngay lập tức về đầu trang
    });
  }, [pathname]);

  return null;
}
