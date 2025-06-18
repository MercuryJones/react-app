import { useState } from "react";

const AmenityForm = ({ onAddAmenity }) => {
  const [formData, setFormData] = useState({ name: "", description: "", image: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.name || !formData.description || !formData.image) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const res = await fetch("https://mountainsidenode.onrender.com/api/amenities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        setMessage(`Error: ${err.error}`);
        return;
      }

      const data = await res.json();
      setMessage("Amenity added successfully!");
      onAddAmenity(data.amenity);
      setFormData({ name: "", description: "", image: "" });
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="amenity-form">
      <h3>Add a New Amenity</h3>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <input name="image" placeholder="Image Path (e.g. /images/firepit.jpg)" value={formData.image} onChange={handleChange} />
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AmenityForm;
