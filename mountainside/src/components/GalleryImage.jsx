import React from 'react';
import './GalleryImage.css';

const GalleryImage = ({ src }) => {
  return (
    <div className="gallery-image">
      <img src={src} alt="Gallery Item" />
    </div>
  );
};

export default GalleryImage;
