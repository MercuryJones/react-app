import React from 'react';
import './RestaurantCard.css';

const RestaurantCard = ({ src, name }) => {
  return (
    <div className="restaurant-card">
      <img src={src} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default RestaurantCard;
