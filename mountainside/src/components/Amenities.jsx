// Amenities.jsx
import { useState, useEffect } from "react";
import "./Amenities.css";

const Amenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "", image: null });
  const [status, setStatus] = useState("");
  const [editingAmenity, setEditingAmenity] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

    const res = await fetch("https://mountainsidenode.onrender.com/api/amenities", {
      method: "POST",
      body: data,
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

  const handleEditClick = (amenity) => {
    setEditingAmenity(amenity);
    setShowModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", editingAmenity.name);
    data.append("description", editingAmenity.description);
    if (formData.image) data.append("image", formData.image);

    const res = await fetch(`https://mountainsidenode.onrender.com/api/amenities/${editingAmenity.id}`, {
      method: "PUT",
      body: data,
    });

    if (res.ok) {
      const updated = await res.json();
      setAmenities(amenities.map((a) => (a.id === updated.id ? updated : a)));
      setShowModal(false);
      setEditingAmenity(null);
      setFormData({ name: "", description: "", image: null });
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`https://mountainsidenode.onrender.com/api/amenities/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setAmenities(amenities.filter((a) => a.id !== id));
    }
  };

  const mainAmenities = amenities.slice(0, 4);
  const userAmenities = amenities.slice(4);

  return (
    <section className="amenities-section">
      <h2>Amenities</h2>
      <form onSubmit={handleSubmit} className="amenity-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        <button type="submit">Add Amenity</button>
      </form>
      <p>{status}</p>

      <h3>Main Amenities</h3>
      <div className="amenity-list">
        {mainAmenities.map((a) => (
          <div key={a.id} className="amenity">
            <img src={`https://mountainsidenode.onrender.com${a.image}`} alt={a.name} />
            <p>{a.description}</p>
          </div>
        ))}
      </div>

      <h3>Your Experiences</h3>
      <div className="amenity-list">
        {userAmenities.map((a) => (
          <div key={a.id} className="amenity">
            <img src={`https://mountainsidenode.onrender.com${a.image}`} alt={a.name} />
            <h3>{a.name}</h3>
            <p>{a.description}</p>
            <button onClick={() => handleEditClick(a)}>Edit</button>
            <button onClick={() => handleDelete(a.id)}>Delete</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Amenity</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="name"
                value={editingAmenity.name}
                onChange={(e) => setEditingAmenity({ ...editingAmenity, name: e.target.value })}
                required
              />
              <input
                type="text"
                name="description"
                value={editingAmenity.description}
                onChange={(e) => setEditingAmenity({ ...editingAmenity, description: e.target.value })}
                required
              />
              <input type="file" name="image" accept="image/*" onChange={handleChange} />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Amenities;
