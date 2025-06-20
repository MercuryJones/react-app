// Amenities.jsx
import { useEffect, useState } from "react";
import EditAmenityModal from "./EditAmenityModal";
import DeleteAmenityModal from "./DeleteAmenityModal";
import AddExperienceModal from "./AddExperienceModal";
import "./Amenities.css";

const staticAmenities = [
  {
    id: 1,
    name: "Outdoor Kitchen",
    description: "Outdoor kitchen appliances for all of your grilling dreams.",
    image: "https://mountainsidenode.onrender.com/images/kitchen.jpg",
  },
  {
    id: 2,
    name: "Jet Ski and Paddle Boards",
    description: "Have a blast on the lake from fast action jetskis to relaxing paddleboards.",
    image: "https://mountainsidenode.onrender.com/images/ski.jpg",
  },
  {
    id: 3,
    name: "Outdoor Fire Pit",
    description: "A quaint fireplace where you and your loved ones can enjoy conversation and s'mores",
    image: "https://mountainsidenode.onrender.com/images/fire.jpg",
  },
  {
    id: 4,
    name: "Tanning",
    description: "Achieve a beautiful bronze from our multiple tanning deck options.",
    image: "https://mountainsidenode.onrender.com/images/tan.jpg",
  },
];

const Amenities = () => {
  const [userAmenities, setUserAmenities] = useState([]);
  const [editingAmenity, setEditingAmenity] = useState(null);
  const [deletingAmenity, setDeletingAmenity] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchAmenities = async () => {
    try {
      const res = await fetch("https://mountainsidenode.onrender.com/api/amenities");
      const data = await res.json();
      setUserAmenities(data);
    } catch (err) {
      console.error("Failed to fetch amenities:", err);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  const handleEdit = async (updatedAmenity) => {
    try {
      const res = await fetch(`https://mountainsidenode.onrender.com/api/amenities/${updatedAmenity._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAmenity),
      });
      const data = await res.json();
      setUserAmenities((prev) => prev.map((a) => (a._id === data._id ? data : a)));
      setEditingAmenity(null);
    } catch (err) {
      console.error("Failed to edit amenity:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://mountainsidenode.onrender.com/api/amenities/${id}`, {
        method: "DELETE",
      });
      setUserAmenities((prev) => prev.filter((a) => a._id !== id));
      setDeletingAmenity(null);
    } catch (err) {
      console.error("Failed to delete amenity:", err);
    }
  };

  const handleAdd = async (newAmenity) => {
    setUserAmenities((prev) => [...prev, newAmenity]);
    setIsAddModalOpen(false);
  };

  return (
    <section className="amenities-section">
      <h2>Included Amenities</h2>
      <div className="amenity-list">
        {staticAmenities.map((a) => (
          <div key={a.id} className="amenity">
            <img src={a.image} alt={a.name} />
            <h3>{a.name}</h3>
            <p>{a.description}</p>
          </div>
        ))}
      </div>

      <h2>Your Experiences</h2>
      <button className="share-button" onClick={() => setIsAddModalOpen(true)}>
        Share Your Experience
      </button>
      <div className="amenity-list">
        {userAmenities.map((a) => (
          <div key={a._id} className="amenity">
            <img src={`https://mountainsidenode.onrender.com/images/${a.image}`} alt={a.name} />
            <h3>{a.name}</h3>
            <p>{a.description}</p>
            <div className="button-row">
              <button onClick={() => setEditingAmenity(a)}>Edit</button>
              <button onClick={() => setDeletingAmenity(a)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingAmenity && (
        <EditAmenityModal
          amenity={editingAmenity}
          onClose={() => setEditingAmenity(null)}
          onUpdate={handleEdit}
        />
      )}

      {deletingAmenity && (
        <DeleteAmenityModal
          amenity={deletingAmenity}
          onClose={() => setDeletingAmenity(null)}
          onDelete={() => handleDelete(deletingAmenity._id)}
        />
      )}

      {isAddModalOpen && (
        <AddExperienceModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAdd}
        />
      )}
    </section>
  );
};

export default Amenities;
