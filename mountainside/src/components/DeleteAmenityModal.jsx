// DeleteAmenityModal.jsx
import "./Modal.css";

const DeleteAmenityModal = ({ amenity, onDelete, onClose }) => {
  const handleConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <div className="w3-modal" style={{ display: "block" }}>
      <div className="w3-modal-content w3-animate-top">
        <div className="w3-container">
          <span onClick={onClose} className="w3-button w3-display-topright">
            &times;
          </span>
          <h3>Are you sure you want to delete {amenity.name}?</h3>
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAmenityModal;
