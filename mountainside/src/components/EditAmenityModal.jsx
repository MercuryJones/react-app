// src/components/EditAmenityModal.jsx
import React, { useState } from "react";
import "../components/Modal.css";

const EditAmenityModal = ({ amenity, closeEditModal, updateAmenity }) => {
  const [result, setResult] = useState("");
  const [prevSrc, setPrevSrc] = useState(
    `https://mountainsidenode.onrender.com/images/${amenity.main_image}`
  );

  const uploadImage = (event) => {
    setPrevSrc(URL.createObjectURL(event.target.files[0]));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Updating...");

    const formData = new FormData(event.target);

    const response = await fetch(
      `https://mountainsidenode.onrender.com/api/amenities/${amenity._id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (response.status === 200) {
      const updatedAmenity = await response.json();
      updateAmenity(updatedAmenity);
      setResult("Amenity updated successfully.");
      closeEditModal(); // ✅ Now closes modal after successful update
    } else {
      setResult("There was a problem updating the amenity.");
    }
  };

  return (
    <div className="w3-modal" style={{ display: "block" }}>
      <div className="w3-modal-content">
        <div className="w3-container">
          <span
            className="w3-button w3-display-topright"
            onClick={closeEditModal}
          >
            &times;
          </span>
          <h3>Edit Amenity</h3>
          <form onSubmit={onSubmit}>
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                defaultValue={amenity.name}
                required
              />
            </p>
            <p>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                defaultValue={amenity.description}
                required
              />
            </p>
            <p>
              <label>Upload New Image:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadImage}
              />
            </p>
            {prevSrc && (
              <img
                src={prevSrc}
                alt="Preview"
                style={{ maxWidth: "100px", marginTop: "10px" }}
              />
            )}
            <p>
              <button type="submit">Save Changes</button>
            </p>
            <p>{result}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAmenityModal;
