import React, { useState } from "react";
import "./Modal.css";

const EditAmenityModal = ({ amenity, onClose, onUpdate }) => {
  const [name, setName] = useState(amenity.name);
  const [description, setDescription] = useState(amenity.description);
  const [preview, setPreview] = useState(
    amenity.main_image ? `https://mountainsidenode.onrender.com/images/${amenity.main_image}` : ""
  );
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Updating...");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (file) formData.append("img", file);

    const response = await fetch(`https://mountainsidenode.onrender.com/api/amenities/${amenity._id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      const updatedAmenity = await response.json();
      onUpdate(updatedAmenity);
      setResult("Updated!");
      onClose();
    } else {
      setResult("Update failed.");
    }
  };

  return (
    <div className="w3-modal" style={{ display: "block" }}>
      <div className="w3-modal-content">
        <div className="w3-container">
          <span className="w3-button w3-display-topright" onClick={onClose}>
            &times;
          </span>
          <h2>Edit Amenity</h2>
          <form onSubmit={handleSubmit}>
            <p>
              <label>Name:</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </p>
            <p>
              <label>Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </p>
            <p>
              <label>Upload new image:</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </p>
            {preview && <img src={preview} alt="Preview" style={{ maxWidth: "100%" }} />}
            <p>
              <button type="submit">Save</button>
            </p>
            <p>{result}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAmenityModal;
