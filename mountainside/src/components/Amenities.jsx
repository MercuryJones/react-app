// Amenities.jsx
import { useState, useEffect } from "react";
import "./Amenities.css";
import EditAmenityModal from "./EditAmenityModal";
import DeleteAmenityModal from "./DeleteAmenityModal";

const Amenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "", image: null });
  const [status, setStatus] = useState("");
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

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
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("image", formData.image);

    const res = await fetch("https://mountainsidenode.onrender.com/api/amenities", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      const newAmenity = await res.json();
      setAmenities([...amenities, newAmenity]);
      setFormData({ name: "", description: "", image: null });
      setStatus("Amenity added!");
    } else {
      const error = await res.json();
      setStatus(`Error: ${error.error}`);
    }
  };

  const handleSave = (updatedAmenity) => {
    setAmenities((prev) => prev.map((a) => (a.id === updatedAmenity.id ? updatedAmenity : a)));
    setEditing(null);
  };

  const handleDelete = (id) => {
    setAmenities((prev) => prev.filter((a) => a.id !== id));
    setDeleting(null);
  };

  return (
    <section className="amenities-section">
      <h2>Amenities</h2>
      <form onSubmit={handleSubmit} className="amenity-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="file" name="image" onChange={handleChange} required />
        <button type="submit">Add Amenity</button>
      </form>
      <p>{status}</p>

      <h3>Main Amenities</h3>
      <div className="amenity-list">
        {amenities.slice(0, 4).map((a) => (
          <div key={a.id} className="amenity">
            <img src={`https://mountainsidenode.onrender.com${a.image}`} alt={a.name} />
            <h3>{a.name}</h3>
            <p>{a.description}</p>
          </div>
        ))}
      </div>

      <h3>Your Experiences</h3>
      <div className="amenity-list">
        {amenities.slice(4).map((a) => (
          <div key={a.id} className="amenity">
            <img src={`https://mountainsidenode.onrender.com${a.image}`} alt={a.name} />
            <h3>{a.name}</h3>
            <p>{a.description}</p>
            <button onClick={() => setEditing(a)}>Edit</button>
            <button onClick={() => setDeleting(a)}>Delete</button>
          </div>
        ))}
      </div>

      {editing && <EditAmenityModal amenity={editing} onClose={() => setEditing(null)} onSave={handleSave} />}
      {deleting && <DeleteAmenityModal amenity={deleting} onClose={() => setDeleting(null)} onDelete={handleDelete} />}
    </section>
  );
};

export default Amenities;
