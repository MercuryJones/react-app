import React, { useState } from "react";
import "./Modal.css";

const EditAmenityModal = ({ amenity, onClose, onSave }) => {
  const [name, setName] = useState(amenity.name);
  const [description, setDescription] = useState(amenity.description);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(amenity.image);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch(`https://mountainsidenode.onrender.com/api/amenities/${amenity.id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        const updatedAmenity = await res.json();
        onSave(updatedAmenity);
      } else {
        const err = await res.json();
        setStatus(`Error: ${err.error}`);
      }
    } catch (error) {
      setStatus("Failed to update.");
    }
  };

  return (
    <div className="w3-modal">
      <div className="w3-modal-content">
        <div className="w3-container">
          <span onClick={onClose} className="w3-button w3-display-topright">&times;</span>
          <h2>Edit Amenity</h2>
          <form onSubmit={handleSubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
            <input value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="file" onChange={handleFileChange} accept="image/*" />
            {preview && <img src={preview} alt="preview" style={{ maxHeight: "100px", margin: "10px 0" }} />}
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
            <p>{status}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAmenityModal;
