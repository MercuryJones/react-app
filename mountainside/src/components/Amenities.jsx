// Amenities.jsx
import { useState, useEffect } from "react";
import "./Amenities.css";

const Amenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
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
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("image", formData.image);

    const res = await fetch("https://mountainsidenode.onrender.com/api/amenities", {
      method: "POST",
      body: payload,
    });

    if (res.ok) {
      const newAmenity = await res.json();
      setAmenities([...amenities, newAmenity]);
      setStatus("Amenity added!");
      setFormData({ name: "", description: "", image: null });
    } else {
      const error = await res.json();
      setStatus(`Error: ${error.error}`);
    }
  };

  return (
    <section className="amenities-section">
      <h2>Amenities</h2>
      <form onSubmit={handleSubmit} className="amenity-form" encType="multipart/form-data">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        <button type="submit">Add Amenity</button>
      </form>
      <p>{status}</p>
      <div className="amenity-list">
        {amenities.map((a) => (
          <div key={a.id} className="amenity">
            <img src={`https://mountainsidenode.onrender.com${a.image}`} alt={a.name} />
            <h3>{a.name}</h3>
            <p>{a.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
