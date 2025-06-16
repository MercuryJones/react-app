import React from 'react';
import GalleryImage from './GalleryImage';
import './Gallery.css';

const galleryImages = ['one.jpg', 'two.jpg', 'three.jpg', 'four.jpg'];

const Gallery = () => {
  return (
    <section id="gallery" className="gallery">
      <h2>Gallery</h2>
      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <GalleryImage
            key={index}
            src={`${import.meta.env.BASE_URL}images/${image}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
