import React, { useEffect, useState } from 'react';

function WaterUsage() {
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/app/data')  // Update the URL to match the FastAPI endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();  // Fetch the image as a blob
      })
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);  // Set the blob URL as the source for the image
      })
      .catch(error => {
        console.error('Error fetching image:', error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      {error ? <p>Error: {error}</p> : imageSrc ? <img src={imageSrc} alt="Water Usage Chart" /> : <p style={{display:'flex',alignContent:'center',justifyContent:'center',fontSize:'100px', color:'gray'}}>Loading...</p>}
    </div>
  );
}

export default WaterUsage;
