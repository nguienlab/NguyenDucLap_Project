import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import CarCard from "../Component/CarCard";
import "./Cars.css";
import CarouselHero from "../Component/Carousel";

export default function Cars() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [type, setType] = useState("all");
  const [brand, setBrand] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const keyword = searchParams.get("keyword") || "";

  // Local search query state
  const [q, setQ] = useState(keyword);
  
  useEffect(() => {
    // Sync local search input with URL keyword
    setQ(keyword);

    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const apiUrl = keyword ? `/vehicles?keyword=${keyword}` : '/vehicles';
        
        // Temporarily using fetch instead of api from useAuth if it's not configured for this
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${apiUrl}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        
        setAllCars(data.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch cars. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [keyword]); // Refetch when keyword changes

  // Get unique brands for the filter dropdown from the fetched cars
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(allCars.map(c => c.brand))];
    return uniqueBrands.sort();
  }, [allCars]);

  // Client-side filtering on the fetched results
  const filtered = useMemo(() => {
    return allCars.filter(c => {
      const matchType = type === "all" ? true : c.type === type;
      const matchBrand = brand === "all" ? true : c.brand === brand;
      const matchPrice = maxPrice ? c.price <= Number(maxPrice) : true;
      return matchType && matchBrand && matchPrice;
    });
  }, [type, brand, maxPrice, allCars]);

  const handleLocalSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/cars?keyword=${q.trim()}`);
  }

  return (
    <div className="cars-page">
      <div className="cars-bg" />
      <div className="container px-2 px-md-5 cars-content">
        <CarouselHero />
        <motion.h2
          className="cars-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {keyword ? `Results for "${keyword}"` : "All Cars"}
        </motion.h2>

        <motion.form
          className="row g-3 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          onSubmit={handleLocalSearchSubmit}
        >
          <div className="col-12 col-md-3">
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              className="form-control"
              placeholder="Search by name..."
            />
          </div>
          <div className="col-6 col-md-2">
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="form-select"
            >
              <option value="all">All types</option>
              <option value="ô tô">Ô tô</option>
              <option value="xe máy">Xe máy</option>
            </select>
          </div>
          <div className="col-6 col-md-2">
            <select
              value={brand}
              onChange={e => setBrand(e.target.value)}
              className="form-select"
            >
              <option value="all">All brands</option>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="col-12 col-md-3">
            <input
              type="number"
              min="0"
              step="10000000"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="form-control"
              placeholder="Max price (VND)"
            />
          </div>
           <div className="col-12 col-md-2">
            <button type="submit" className="btn btn-primary w-100">Filter</button>
           </div>
        </motion.form>

        {loading && <p className="text-center w-100">Loading cars...</p>}
        {error && <p className="text-danger text-center w-100">{error}</p>}

        <div className="row g-4">
          <AnimatePresence>
            {!loading && !error && filtered.map((c, i) => (
              <motion.div
                key={c._id}
                className="col-12 col-sm-6 col-lg-4"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <CarCard car={c} />
              </motion.div>
            ))}
          </AnimatePresence>

          {!loading && filtered.length === 0 && (
            <motion.p
              className="text-muted text-center w-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Không tìm thấy xe phù hợp.
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
