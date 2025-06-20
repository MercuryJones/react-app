import React, { useState } from "react";
import "./Modal.css";

const EditAmenityModal = ({ amenity, onClose, onUpdate }) => {
  const [name, setName] = useState(amenity.name);
  const [description, setDescription] = useState(amenity.description);

  const handleSubmit = () => {
    onUpdate({ ...amenity, name, description });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Edit Your Experience</h2>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default EditAmenityModal;
