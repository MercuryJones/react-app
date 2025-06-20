import React, { useState } from "react";
import "./Gallery.css";

const images = [
  "https://mountainsidenode.onrender.com/images/one.jpg",
  "https://mountainsidenode.onrender.com/images/two.jpg",
  "https://mountainsidenode.onrender.com/images/three.jpg",
  "https://mountainsidenode.onrender.com/images/four.jpg",
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
