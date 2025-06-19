// Amenities.jsx
import { useState, useEffect } from "react";
import "./Amenities.css";

const Amenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: ""
  });
  const [status, setStatus] = useState("");

  const fetchAmenities = async () => {
    const res = await fetch("https://mountainsidenode.onrender.com/api/amenities");
    const data = await res.json();
    setAmenities(data);
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://mountainsidenode.onrender.com/api/amenities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const newAmenity = await res.json();
      setAmenities([...amenities, newAmenity]);
      setStatus("Amenity added!");
      setFormData({ name: "", description: "", image: "" });
    } else {
      const error = await res.json();
      setStatus(`Error: ${error.error}`);
    }
  };

  return (
    <section className="amenities-section">
      <h2>Amenities</h2>
      <form onSubmit={handleSubmit} className="amenity-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
        <button type="submit">Add Amenity</button>
      </form>
      <p>{status}</p>
      <div className="amenity-list">
        {amenities.map((a) => (
          <div key={a.id} className="amenity">
            <img src={`https://mountainsidenode.onrender.com${amenity.image}`} alt={amenity.title} />
            <h3>{a.name}</h3>
            <p>{a.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
