import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import CarCard from "../Component/CarCard";
import "./Cars.css";
import CarouselHero from "../Component/Carousel";

export default function Cars() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  
  const { api } = useAuth();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const res = await api.get('/vehicles');
        setAllCars(res.data.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch cars. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [api]);

  const filtered = useMemo(() => {
    return allCars.filter(c => {
      const matchName = c.name.toLowerCase().includes(q.toLowerCase());
      const matchType = type === "all" ? true : c.type === type;
      const matchPrice = maxPrice ? c.price <= Number(maxPrice) : true;
      return matchName && matchType && matchPrice;
    });
  }, [q, type, maxPrice, allCars]);

  const handleBuy = (car) => alert(`Bạn đã chọn mua: ${car.name}`);

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
          All Cars
        </motion.h2>

        <motion.div
          className="row g-3 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="col-12 col-md-4">
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              className="form-control"
              placeholder="Search by name..."
            />
          </div>
          <div className="col-6 col-md-4">
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
          <div className="col-6 col-md-4">
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
        </motion.div>

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
                <CarCard car={c} onBuy={handleBuy} />
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
