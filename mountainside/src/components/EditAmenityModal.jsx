import React, { useState } from "react";

const EditAmenityModal = ({ amenity, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: amenity.name,
    description: amenity.description,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/amenities/${amenity._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedAmenity = await response.json();
        onSave(updatedAmenity); // update in parent
        onClose(); // close modal
      } else {
        const errorText = await response.text();
        alert("Error: " + errorText);
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting server.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>Edit Experience</h3>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditAmenityModal;
