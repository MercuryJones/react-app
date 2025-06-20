// Amenities.jsx
import { useEffect, useState } from "react";
import EditAmenityModal from "./EditAmenityModal";
import DeleteAmenityModal from "./DeleteAmenityModal";
import "./Amenities.css";

const staticAmenities = [
  {
    id: 1,
    name: "Outdoor Kitchen",
    description: "Outdoor kitchen appliances for all of your grilling dreams.",
    image: "/images/kitchen.jpg",
  },
  {
    id: 2,
    name: "Jet Ski and Paddle Boards",
    description: "Have a blast on the lake from fast action jetskis to relaxing paddleboards.",
    image: "/images/ski.jpg",
  },
  {
    id: 3,
    name: "Outdoor Fire Pit",
    description: "A quaint fireplace where you and your loved ones can enjoy conversation and s'mores",
    image: "/images/fire.jpg",
  },
  {
    id: 4,
    name: "Tanning",
    description: "Achieve a beautiful bronze from our multiple tanning deck options.",
    image: "/images/tan.jpg",
  },
];

const Amenities = () => {
  const [userAmenities, setUserAmenities] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchUserAmenities = async () => {
    const res = await fetch("https://mountainsidenode.onrender.com/api/amenities");
    const data = await res.json();
    setUserAmenities(data);
  };

  useEffect(() => {
    fetchUserAmenities();
  }, []);

  const handleDelete = async () => {
    await fetch(`https://mountainsidenode.onrender.com/api/amenities/${selectedAmenity._id}`, {
      method: "DELETE",
    });
    setUserAmenities(userAmenities.filter((a) => a._id !== selectedAmenity._id));
  };

  const handleEdit = async (formData) => {
    const res = await fetch(`https://mountainsidenode.onrender.com/api/amenities/${selectedAmenity._id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      const updatedAmenity = await res.json();
      setUserAmenities(
        userAmenities.map((a) => (a._id === updatedAmenity._id ? updatedAmenity : a))
      );
    }
    setShowEditModal(false);
  };

  return (
    <section id="amenities">
      <h2>Included Amenities</h2>
      <div className="amenity-grid">
        {staticAmenities.map((a) => (
          <div key={a.id} className="amenity-card">
            <img src={a.image} alt={a.name} />
            <h3>{a.name}</h3>
            <p>{a.description}</p>
          </div>
        ))}
      </div>

      <h2>Your Experiences</h2>
      <button onClick={() => document.getElementById("shareModal").style.display = "block"}>Share Your Experience</button>
      <div className="amenity-grid">
        {userAmenities.map((a) => (
          <div key={a._id} className="amenity-card">
            <img src={`https://mountainsidenode.onrender.com/images/${a.image}`} alt={a.name} />
            <h3>{a.name}</h3>
            <p>{a.description}</p>
            <button onClick={() => { setSelectedAmenity(a); setShowEditModal(true); }}>Edit</button>
            <button onClick={() => { setSelectedAmenity(a); setShowDeleteModal(true); }}>Delete</button>
          </div>
        ))}
      </div>

      {showEditModal && selectedAmenity && (
        <EditAmenityModal
          amenity={selectedAmenity}
          onSave={handleEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && selectedAmenity && (
        <DeleteAmenityModal
          amenity={selectedAmenity}
          onDelete={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </section>
  );
};

export default Amenities;
