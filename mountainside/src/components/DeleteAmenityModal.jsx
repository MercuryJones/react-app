import React, { useState } from "react";
import "./Modal.css";

const DeleteAmenityModal = ({ amenity, onClose, onDelete }) => {
  const [status, setStatus] = useState("");

  const handleDelete = async () => {
    try {
      const res = await fetch(`https://mountainsidenode.onrender.com/api/amenities/${amenity.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete(amenity.id);
      } else {
        const err = await res.json();
        setStatus(`Error: ${err.error}`);
      }
    } catch (error) {
      setStatus("Failed to delete.");
    }
  };

  return (
    <div className="w3-modal">
      <div className="w3-modal-content">
        <div className="w3-container">
          <span onClick={onClose} className="w3-button w3-display-topright">&times;</span>
          <h2>Delete Amenity</h2>
          <p>Are you sure you want to delete <strong>{amenity.name}</strong>?</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={onClose}>No</button>
          </div>
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
};

export default DeleteAmenityModal;
