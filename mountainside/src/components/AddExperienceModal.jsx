// AddExperienceModal.jsx
import { useState } from "react";
import "./Modal.css";

const AddExperienceModal = ({ closeModal, addExperience }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Uploading...");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      const res = await fetch("https://mountainsidenode.onrender.com/api/amenities", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        const newAmenity = await res.json();
        addExperience(newAmenity);
        setStatus("Experience added!");
        closeModal();
      } else {
        const err = await res.json();
        setStatus(err.error || "Upload failed");
      }
    } catch (error) {
      setStatus("Error connecting to server");
    }
  };

  return (
    <div className="w3-modal" style={{ display: "block" }}>
      <div className="w3-modal-content">
        <div className="w3-container">
          <span className="w3-button w3-display-topright" onClick={closeModal}>
            &times;
          </span>
          <h3>Share Your Experience</h3>
          <form onSubmit={handleSubmit}>
            <p>
              <input
                type="text"
                name="name"
                placeholder="Title"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <input type="file" name="image" accept="image/*" onChange={handleChange} required />
            </p>
            <button type="submit">Submit</button>
            <p>{status}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExperienceModal;
