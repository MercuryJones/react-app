// EditAmenityModal.jsx
import { useState } from "react";
import "./Modal.css";

const EditAmenityModal = ({ amenity, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: amenity.name,
    description: amenity.description,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

    await onSave(data);
  };

  return (
    <div className="w3-modal" style={{ display: "block" }}>
      <div className="w3-modal-content w3-animate-top">
        <div className="w3-container">
          <span onClick={onClose} className="w3-button w3-display-topright">
            &times;
          </span>
          <h3>Edit Amenity</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAmenityModal;
