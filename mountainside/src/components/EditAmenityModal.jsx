import React, { useState, useEffect } from "react";
import "./Modal.css";

const EditAmenityModal = ({ amenity, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (amenity) {
      setFormData({
        name: amenity.name,
        description: amenity.description,
        image: null,
      });
    }
  }, [amenity]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAmenity = new FormData();
    updatedAmenity.append("name", formData.name);
    updatedAmenity.append("description", formData.description);
    if (formData.image) {
      updatedAmenity.append("img", formData.image);
    }

    try {
      const response = await fetch(`/api/amenities/${amenity._id}`, {
        method: "PUT",
        body: updatedAmenity,
      });

      if (!response.ok) {
        throw new Error("Failed to update amenity");
      }

      const data = await response.json();
      onUpdate(data); // trigger parent to update state
      onClose(); // close modal
    } catch (err) {
      console.error("Error updating amenity:", err);
    }
  };

  if (!amenity) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h3>Edit Amenity</h3>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} required />

          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>Image (optional):</label>
          <input type="file" name="image" onChange={handleChange} />

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditAmenityModal;
