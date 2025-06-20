import { useEffect, useState } from "react";
import EditAmenityModal from "./EditAmenityModal";
import DeleteAmenityModal from "./DeleteAmenityModal";
import "./css/Amenities.css";

// Static amenities - these will always appear at the top
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
      }
];

const Amenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAmenities = async () => {
    try {
      const response = await fetch("https://mountainsidenode.onrender.com/api/amenities");
      const data = await response.json();
      setAmenities(data);
    } catch (error) {
      console.error("Failed to load amenities", error);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  const handleEditClick = (amenity) => {
    setSelectedAmenity(amenity);
    setShowEditModal(true);
  };

  const handleDeleteClick = (amenity) => {
    setSelectedAmenity(amenity);
    setShowDeleteModal(true);
  };

  const updateAmenity = (updatedAmenity) => {
    setAmenities((prev) =>
      prev.map((item) => (item._id === updatedAmenity._id ? updatedAmenity : item))
    );
  };

  const removeAmenity = (id) => {
    setAmenities((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <section id="amenities">
      <h2>Included Amenities</h2>
      <div className="amenity-grid">
        {staticAmenities.map((amenity, index) => (
          <div key={index} className="amenity-card">
            <img src={amenity.img} alt={amenity.name} />
            <h3>{amenity.name}</h3>
            <p>{amenity.description}</p>
          </div>
        ))}
      </div>

      <h2>Your Experiences</h2>
      <div className="amenity-grid">
        {amenities.map((amenity) => (
          <div key={amenity._id} className="amenity-card">
            <img
              src={`https://mountainsidenode.onrender.com/images/${amenity.img}`}
              alt={amenity.name}
            />
            <h3>{amenity.name}</h3>
            <p>{amenity.description}</p>
            <div className="edit-controls">
              <button onClick={() => handleEditClick(amenity)}>Edit</button>
              <button onClick={() => handleDeleteClick(amenity)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showEditModal && selectedAmenity && (
        <EditAmenityModal
          amenity={selectedAmenity}
          closeModal={() => setShowEditModal(false)}
          onSave={updateAmenity}
        />
      )}

      {showDeleteModal && selectedAmenity && (
        <DeleteAmenityModal
          amenity={selectedAmenity}
          closeModal={() => setShowDeleteModal(false)}
          onDelete={removeAmenity}
        />
      )}
    </section>
  );
};

export default Amenities;