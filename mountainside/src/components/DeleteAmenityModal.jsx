import React from "react";
import "./Modal.css";

const DeleteAmenityModal = ({ amenityId, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/amenities/${amenityId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete amenity");
      }

      onDelete(amenityId);
      onClose();
    } catch (error) {
      console.error("Error deleting amenity:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this amenity?</p>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteAmenityModal;
