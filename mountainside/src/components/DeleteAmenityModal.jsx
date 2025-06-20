import React from "react";
import "./Modal.css";

const DeleteAmenityModal = ({ onClose, onDelete }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Are you sure you want to delete this experience?</h2>
        <div className="modal-buttons">
          <button onClick={onDelete}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAmenityModal;
