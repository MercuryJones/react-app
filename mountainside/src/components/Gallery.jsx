import React, { useState } from "react";
import "./Gallery.css";

const images = [
  "./images/one.jpg",
  "./images/two.jpg",
  "./images/three.jpg",
  "./images/four.jpg",
];

const Gallery = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % images.length);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <section className="gallery">
      <img src={images[current]} alt="Gallery Slide" />
      <div className="gallery-buttons">
        <button onClick={prev}>⟨ Prev</button>
        <button onClick={next}>Next ⟩</button>
      </div>
    </section>
  );
};

export default Gallery;
