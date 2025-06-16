import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <section
      id="banner"
      className="banner"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}images/one.jpg)`
      }}
    >
      <h1>Mountainside Drive</h1>
      <p>Welcome to our scenic lakeside retreat in the Blue Ridge Mountains.</p>
    </section>
  );
};

export default Banner;
