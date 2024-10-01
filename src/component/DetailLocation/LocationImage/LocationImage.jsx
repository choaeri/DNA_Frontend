import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LocationImage.css';

export default function LocationImage({ locationName }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_CRAWLING_URL}?location=${locationName}&size=15`);
        setImages(response.data.images);
      } catch (error) {
        setError("Failed to load images.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [locationName]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="LocationImage">
      <div className="imageGrid">
        {images.length > 0 ? (
          images.map((src, index) => (
            <div className="imageContainer" key={index}>
              <img src={src} alt={`Location ${index + 1}`} />
            </div>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>
    </div>
  );
}
