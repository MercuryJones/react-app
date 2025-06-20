import React from "react";

const DeleteAmenityModal = ({ amenity, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/amenities/${amenity._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onDelete(amenity._id); // update UI
        onClose(); // close modal
      } else {
        alert("Error deleting amenity");
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
        <h3>Delete Experience</h3>
        <p>Are you sure you want to delete this experience?</p>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteAmenityModal;
