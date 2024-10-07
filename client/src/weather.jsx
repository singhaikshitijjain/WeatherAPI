import React, { useState } from 'react';
import WeatherAPI from './weatherapi'; // Import the WeatherAPI function

const Weather = () => {
  const [mapCoordinates, setMapCoordinates] = useState({
    latitude: 24.69009515037612, // Default latitude (India)
    longitude: 73.02451656116589, // Default longitude (India)
  });

  const handleLocationChange = ({ latitude, longitude }) => {
    setMapCoordinates({ latitude, longitude });
  };

  const iframeSrc = `https://www.google.com/maps/embed/v1/view?key=AIzaSyDORf4PAs2FfiqyQecL3rjZ0HTfwmKh4T8&center=${mapCoordinates.latitude},${mapCoordinates.longitude}&zoom=10`;

  return (
    <>
      <div>
        <iframe
          src={iframeSrc}
          frameborder="0"
          style={{ height: '50vh', width: '100%' }}
        />
      </div>
      <div>
        <WeatherAPI onLocationChange={handleLocationChange} />
      </div>
    </>
  );
};

export default Weather;