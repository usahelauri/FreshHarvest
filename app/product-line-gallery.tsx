"use client";

import { useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

export default function ProductLineGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="line-gallery">
      <div className="line-feature" aria-live="polite" aria-atomic="true">
        <img
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          width="1086"
          height="1448"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="line-thumbs" role="group" aria-label="Фотографии линейки">
        {images.map((image, imageIndex) => {
          const isActive = imageIndex === activeIndex;
          return (
            <button
              className={`line-thumb ${isActive ? "is-active" : ""}`}
              type="button"
              key={image.src}
              aria-label={`Открыть: ${image.alt}`}
              aria-pressed={isActive}
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") setActiveIndex(imageIndex);
              }}
              onFocus={() => setActiveIndex(imageIndex)}
              onClick={() => setActiveIndex(imageIndex)}
            >
              <img
                src={image.src}
                alt=""
                width="1086"
                height="1448"
                loading="lazy"
                decoding="async"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
