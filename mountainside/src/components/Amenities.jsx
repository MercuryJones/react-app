//Amenities.jsx
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

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append("name", formData.name);
    newForm.append("description", formData.description);
    newForm.append("image", formData.image);

    const res = await fetch("https://mountainsidenode.onrender.com/api/amenities", {
      method: "POST",
      body: newForm,
    });

    if (res.ok) {
      setFormData({ name: "", description: "", image: null });
      setStatus("Amenity added!");
      fetchAmenities();
    } else {
      const err = await res.json();
      setStatus(`Error: ${err.error}`);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`https://mountainsidenode.onrender.com/api/amenities/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setAmenities((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const openEditModal = (amenity) => {
    setEditingAmenity(amenity);
    setFormData({ name: amenity.name, description: amenity.description, image: null });
    setShowModal(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const updateForm = new FormData();
    updateForm.append("name", formData.name);
    updateForm.append("description", formData.description);
    if (formData.image) updateForm.append("image", formData.image);

    const res = await fetch(`https://mountainsidenode.onrender.com/api/amenities/${editingAmenity.id}`, {
      method: "PUT",
      body: updateForm,
    });

    if (res.ok) {
      setShowModal(false);
      setEditingAmenity(null);
      fetchAmenities();
    }
  };

  const isFixedAmenity = (id) => [1, 2, 3, 4].includes(id);

  return (
    <section className="amenities-section">
      <h2>Amenities</h2>
      <form onSubmit={handleAdd} encType="multipart/form-data" className="amenity-form">
        <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleFormChange} required />
        <input name="description" type="text" placeholder="Description" value={formData.description} onChange={handleFormChange} required />
        <input name="image" type="file" onChange={handleFormChange} accept="image/*" required />
        <button type="submit">Add Amenity</button>
      </form>
      <p>{status}</p>

      <h3>Main Amenities</h3>
      <div className="amenity-list">
        {amenities.filter((a) => isFixedAmenity(a.id)).map((a) => (
          <div key={a.id} className="amenity">
            <img src={`https://mountainsidenode.onrender.com${a.image}`} alt={a.name} />
            <h3>{a.name}</h3>
            <p>{a.description}</p>
          </div>
        ))}
      </div>

      <h3>Your Experiences</h3>
      <div className="amenity-list">
        {amenities.filter((a) => !isFixedAmenity(a.id)).map((a) => (
          <div key={a.id} className="amenity">
            <img src={`https://mountainsidenode.onrender.com${a.image}`} alt={a.name} />
            <h3>{a.name}</h3>
            <p>{a.description}</p>
            <button onClick={() => openEditModal(a)}>Edit</button>
            <button onClick={() => handleDelete(a.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Amenity</h2>
            <form onSubmit={handleEdit}>
              <input name="name" value={formData.name} onChange={handleFormChange} required />
              <input name="description" value={formData.description} onChange={handleFormChange} required />
              <input name="image" type="file" onChange={handleFormChange} />
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
