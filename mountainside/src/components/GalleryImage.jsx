import React from 'react';
import './Gallery.css';

const GalleryImage = ({ src }) => {
  return (
    <div className="gallery-image">
      <img src={src} alt="Gallery Item" />
    </div>
  );
};

export default GalleryImage;
