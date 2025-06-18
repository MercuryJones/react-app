import { useEffect, useState } from "react";
import './Amenities.css';

const Amenities = () => {
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await fetch("https://mountainsidenode.onrender.com/api/amenities");
        const data = await response.json();
        setAmenities(data);
      } catch (error) {
        console.error("Failed to fetch amenities:", error);
      }
    };

    fetchAmenities();
  }, []);

  return (
    <section className="amenities">
      <h2>Amenities</h2>
      <div className="amenities-grid">
        {amenities.map((item) => (
          <div key={item.id} className="amenity-card">
            <img src={`https://mountainsidenode.onrender.com/images/${item.image}`} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Amenities;