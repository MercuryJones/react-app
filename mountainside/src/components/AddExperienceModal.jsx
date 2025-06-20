// AddExperienceModal.jsx
import { useState } from "react";
import "./Modal.css";

const AddExperienceModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submission = new FormData();
    submission.append("name", formData.name);
    submission.append("description", formData.description);
    if (formData.image) {
      submission.append("img", formData.image);
    }

    try {
      const res = await fetch("https://mountainsidenode.onrender.com/api/amenities", {
        method: "POST",
        body: submission,
      });

      if (!res.ok) {
        const err = await res.text();
        setError(err);
        return;
      }

      const newAmenity = await res.json();
      onAdd(newAmenity);
    } catch (err) {
      setError("Error contacting server");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>Share Your Experience</h3>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input name="name" onChange={handleChange} required />

          <label>Description:</label>
          <input name="description" onChange={handleChange} required minLength={3} />

          <label>Image:</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddExperienceModal;
