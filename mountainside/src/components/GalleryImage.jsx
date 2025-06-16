import React from 'react';
import './GalleryImage.css';

const GalleryImage = ({ src }) => {
  return (
    <div className="gallery-image">
      <img src={src} alt="Gallery item" />
    </div>
  );
};

export default GalleryImage;
