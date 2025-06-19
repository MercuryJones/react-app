// Amenities.jsx
import { useState, useEffect } from "react";
import "./Amenities.css";

const Amenities = () => {
  const [allAmenities, setAllAmenities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchAmenities = async () => {
    const res = await fetch("https://mountainsidenode.onrender.com/api/amenities");
    const data = await res.json();
    setAllAmenities(data);
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bodyData = new FormData();
    bodyData.append("name", formData.name);
    bodyData.append("description", formData.description);
    if (formData.image) bodyData.append("image", formData.image);

    let url = "https://mountainsidenode.onrender.com/api/amenities";
    let method = "POST";

    if (editingId) {
      url += `/${editingId}`;
      method = "PUT";
    }

    const res = await fetch(url, {
      method,
      body: bodyData,
    });

    if (res.ok) {
      const updatedAmenity = await res.json();
      const updatedList = editingId
        ? allAmenities.map((a) => (a.id === editingId ? updatedAmenity : a))
        : [...allAmenities, updatedAmenity];

      setAllAmenities(updatedList);
      setStatus(editingId ? "Amenity updated!" : "Amenity added!");
      setFormData({ name: "", description: "", image: null });
      setEditingId(null);
    } else {
      const error = await res.json();
      setStatus(`Error: ${error.error}`);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`https://mountainsidenode.onrender.com/api/amenities/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setAllAmenities(allAmenities.filter((a) => a.id !== id));
    }
  };

  const handleEdit = (amenity) => {
    setEditingId(amenity.id);
    setFormData({ name: amenity.name, description: amenity.description, image: null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fixedAmenities = allAmenities.slice(0, 4);
  const userAmenities = allAmenities.slice(4);

  return (
    <section className="amenities-section">
      <h2>Amenities</h2>

      <div className="amenity-list">
        {fixedAmenities.map((a) => (
          <div key={a.id} className="amenity">
            <img src={`https://mountainsidenode.onrender.com${a.image}`} alt={a.name} />
            <h3>{a.name}</h3>
            <p>{a.description}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="amenity-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">{editingId ? "Update Amenity" : "Add Amenity"}</button>
      </form>

      <p>{status}</p>

      <h3>Your Experiences</h3>
      <div className="amenity-list">
        {userAmenities.map((a) => (
          <div key={a.id} className="amenity">
            <img src={`https://mountainsidenode.onrender.com${a.image}`} alt={a.name} />
            <h3>{a.name}</h3>
            <p>{a.description}</p>
            <button onClick={() => handleEdit(a)}>Edit</button>
            <button onClick={() => handleDelete(a.id)}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
