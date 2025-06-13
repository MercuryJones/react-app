import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Mountainside Drive</div>
      <ul className="navbar-links">
        <li>
          <button onClick={() => handleScroll('banner')}>Home</button>
        </li>
        <li>
          <button onClick={() => handleScroll('about')}>About</button>
        </li>
        <li>
          <button onClick={() => handleScroll('gallery')}>Gallery</button>
        </li>
        <li>
          <button onClick={() => handleScroll('restaurants')}>Restaurants</button>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
