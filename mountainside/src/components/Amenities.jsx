// Amenities.jsx
import { useState, useEffect } from "react";
import "./Amenities.css";

const fixedAmenities = [
  {
    id: 1,
    title: "Outdoor Kitchen",
    description: "Outdoor kitchen appliances for all of your grilling dreams.",
    image: "https://mountainsidenode.onrender.com/images/kitchen.jpg"
  },
  {
    id: 2,
    title: "Jet Ski and Paddle Boards",
    description: "Have a blast on the lake from fast action jetskis to relaxing paddleboards.",
    image: "https://mountainsidenode.onrender.com/images/ski.jpg"
  },
  {
    id: 3,
    title: "Outdoor Fire Pit",
    description: "A quaint fireplace where you and your loved ones can enjoy conversation and s'mores",
    image: "https://mountainsidenode.onrender.com/images/fire.jpg"
  },
  {
    id: 4,
    title: "Tanning",
    description: "Achieve a beautiful bronze from our multiple tanning deck options.",
    image: "https://mountainsidenode.onrender.com/images/tan.jpg"
  },
];

const Amenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null
  });
  const [status, setStatus] = useState("");
  const [editId, setEditId] = useState(null);

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
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

    if (editId !== null) {
      const res = await fetch(`https://mountainsidenode.onrender.com/api/amenities/${editId}`, {
        method: "PUT",
        body: data
      });
      if (res.ok) {
        fetchAmenities();
        setEditId(null);
        setFormData({ name: "", description: "", image: null });
        setStatus("Amenity updated!");
      } else {
        const err = await res.json();
        setStatus(`Error: ${err.error}`);
      }
    } else {
      const res = await fetch("https://mountainsidenode.onrender.com/api/amenities", {
        method: "POST",
        body: data
      });
      if (res.ok) {
        fetchAmenities();
        setFormData({ name: "", description: "", image: null });
        setStatus("Amenity added!");
      } else {
        const err = await res.json();
        setStatus(`Error: ${err.error}`);
      }
    }
  };

  const handleEdit = (a) => {
    setEditId(a.id);
    setFormData({ name: a.name, description: a.description, image: null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const res = await fetch(`https://mountainsidenode.onrender.com/api/amenities/${id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      setAmenities(amenities.filter((a) => a.id !== id));
    } else {
      const err = await res.json();
      setStatus(`Error: ${err.error}`);
    }
  };

  return (
    <section className="amenities-section">
      <h2>Amenities</h2>
      <form onSubmit={handleSubmit} className="amenity-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">{editId ? "Update Amenity" : "Add Amenity"}</button>
      </form>
      <p>{status}</p>

      <h3>Main Amenities</h3>
      <div className="amenity-list">
        {fixedAmenities.map((a) => (
          <div key={a.id} className="amenity">
            <img src={a.image} alt={a.title} />
            <p>{a.description}</p>
          </div>
        ))}
      </div>

      <h3>Your Experiences</h3>
      <div className="amenity-list">
        {amenities.map((a) => (
          <div key={a.id} className="amenity">
            <img src={`https://mountainsidenode.onrender.com${a.image}`} alt={a.name} />
            <h3>{a.name}</h3>
            <p>{a.description}</p>
            <div className="actions">
              <button type="button" onClick={() => handleEdit(a)}>Edit</button>
              <button type="button" onClick={() => handleDelete(a.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
