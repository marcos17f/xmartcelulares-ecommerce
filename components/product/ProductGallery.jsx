'use client';

import { useEffect, useState } from 'react';

export default function ProductGallery({ mainImage, thumbnails = [] }) {
  const gallery = thumbnails.length ? thumbnails : [mainImage];
  const [activeImage, setActiveImage] = useState(mainImage);

  useEffect(() => {
    setActiveImage(mainImage);
  }, [mainImage]);

  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        {activeImage ? <img src={activeImage} alt="Produto" /> : null}
      </div>
      <div className="product-gallery-thumbs">
        {gallery.map((thumb, i) => (
          <button
            key={thumb + i}
            type="button"
            className={thumb === activeImage ? 'product-gallery-thumb active' : 'product-gallery-thumb'}
            onClick={() => setActiveImage(thumb)}
            aria-label={`Ver imagem ${i + 1}`}
          >
            {thumb ? <img src={thumb} alt={`Miniatura ${i + 1}`} /> : null}
          </button>
        ))}
      </div>
    </div>
  );
}
