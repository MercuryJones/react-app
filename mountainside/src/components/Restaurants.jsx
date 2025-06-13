import React from 'react';
import RestaurantCard from './RestaurantCard';
import './Restaurants.css';

const restaurantData = [
  { image: 'backstreets-bar-and-grill.jpg', name: 'Backstreets Bar & Grill' },
  { image: 'boca.jpg', name: 'Boca' },
  { image: 'fourk.jpg', name: 'Fourk' },
  { image: 'olde-hickory-station.jpg', name: 'Olde Hickory Station' },
  { image: 'olde-hickory-tap-room.jpg', name: 'Olde Hickory Tap Room' },
  { image: 'taj-indian-cuisine.jpg', name: 'Taj Indian Cuisine' },
  { image: 'vintage-house.jpg', name: 'Vintage House' },
  { image: 'willow-creek-inn.jpg', name: 'Willow Creek Inn' },
];

const Restaurants = () => {
  return (
    <section id="restaurants" className="restaurants">
      <h2>Local Restaurants</h2>
      <div className="restaurant-grid">
        {restaurantData.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            src={`${process.env.PUBLIC_URL}/images/${restaurant.image}`}
            name={restaurant.name}
          />
        ))}
      </div>
    </section>
  );
};

export default Restaurants;
