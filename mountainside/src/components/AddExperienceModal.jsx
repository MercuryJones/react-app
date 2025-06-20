import React, { useState } from "react";
import "./Modal.css";

const AddExperienceModal = ({ onClose, onAdd }) => {
  const [newAmenity, setNewAmenity] = useState({
    name: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setNewAmenity({ ...newAmenity, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    const formData = new FormData();
    formData.append("name", newAmenity.name);
    formData.append("description", newAmenity.description);
    if (image) formData.append("img", image);

    try {
      const response = await fetch("https://mountainsidenode.onrender.com/api/amenities", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server returned an error");
      }

      const savedAmenity = await response.json();
      onAdd(savedAmenity);
      onClose(); // Close modal after successful add
    } catch (err) {
      setError("Error contacting server. Please try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Share Your Experience</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="name" value={newAmenity.name} onChange={handleChange} required />
          </label>
          <label>
            Description:
            <textarea name="description" value={newAmenity.description} onChange={handleChange} required />
          </label>
          <label>
            Upload Image:
            <input type="file" accept="image/*" onChange={handleFileChange} required />
          </label>
          <button type="submit">Submit</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default AddExperienceModal;
