import React, { useState } from "react";
import "../css/Modal.css";

const DeleteAmenityModal = ({ amenity, onClose, onDelete }) => {
  const [result, setResult] = useState("");

  const handleDelete = async () => {
    setResult("Deleting...");

    const response = await fetch(`https://mountainsidenode.onrender.com/api/amenities/${amenity._id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setResult("Deleted!");
      onDelete(amenity._id);
      onClose();
    } else {
      setResult("Delete failed.");
    }
  };

  return (
    <div className="w3-modal" style={{ display: "block" }}>
      <div className="w3-modal-content">
        <div className="w3-container">
          <span className="w3-button w3-display-topright" onClick={onClose}>
            &times;
          </span>
          <h3>Are you sure you want to delete "{amenity.name}"?</h3>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={onClose}>No</button>
          <p>{result}</p>
        </div>
      </div>
    </div>
  );
};

export default DeleteAmenityModal;
