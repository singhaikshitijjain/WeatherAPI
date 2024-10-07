import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import axios from 'axios';

function WeatherAPI({ onLocationChange }) {
  const [weatherData, setWeatherData] = useState({
    city: null,
    state: null,
    location: null,
  });

  const [coordinates, setCoordinates] = useState({
    latitude: '',
    longitude: '',
  });

  const [searchParams, setSearchParams] = useState({
    city: '',
    latitude: '',
    longitude: '',
  });

  const API_KEY = '7deba01708124220858100412240609';

  const handleCitySearch = async (e) => {
    e.preventDefault();
    const city = searchParams.city;

    try {
      const cityWeather = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      const state = cityWeather.data.location.region;
      const latitude = cityWeather.data.location.lat;
      const longitude = cityWeather.data.location.lon;

      const stateWeather = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${state}`
      );

      setWeatherData({
        city: cityWeather.data,
        state: stateWeather.data,
        location: cityWeather.data, // Use city weather for location
      });

      setCoordinates({ latitude, longitude });
      onLocationChange({ latitude, longitude }); // Trigger map zoom
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleCoordinateSearch = async (e) => {
    e.preventDefault();
    const { latitude, longitude } = searchParams;

    try {
      const locationWeather = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`
      );

      const city = locationWeather.data.location.name;
      const state = locationWeather.data.location.region;

      const stateWeather = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${state}`
      );

      setWeatherData({
        city: locationWeather.data,
        state: stateWeather.data,
        location: locationWeather.data,
      });

      setCoordinates({ latitude, longitude });
      onLocationChange({ latitude, longitude }); // Trigger map zoom
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleGPSClick = () => {
    if (navigator.geolocation) {
      alert('Using GPS for location...');
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setCoordinates({ latitude, longitude });
          setSearchParams({ latitude, longitude, city: '' });

          try {
            const locationWeather = await axios.get(
              `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`
            );

            const city = locationWeather.data.location.name;
            const state = locationWeather.data.location.region;

            const stateWeather = await axios.get(
              `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${state}`
            );

            setWeatherData({
              city: locationWeather.data,
              state: stateWeather.data,
              location: locationWeather.data,
            });

            onLocationChange({ latitude, longitude }); // Trigger map zoom
          } catch (error) {
            console.error('Error fetching weather data:', error);
          }
        },
        (err) => {
          console.error('Error accessing GPS:', err);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <form className="d-flex" onSubmit={handleCitySearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Enter City"
              aria-label="Search"
              value={searchParams.city}
              onChange={(e) =>
                setSearchParams({ ...searchParams, city: e.target.value })
              }
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
        <div>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--------OR--------</b>
        </div>
        <div className="container-fluid d-flex">
          <form className="d-flex" onSubmit={handleCoordinateSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Latitude"
              aria-label="Latitude"
              value={searchParams.latitude}
              onChange={(e) =>
                setSearchParams({ ...searchParams, latitude: e.target.value })
              }
            />
            <input
              className="form-control me-2"
              type="search"
              placeholder="Longitude"
              aria-label="Longitude"
              value={searchParams.longitude}
              onChange={(e) =>
                setSearchParams({ ...searchParams, longitude: e.target.value })
              }
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <button
            className="btn btn-outline-primary ms-auto"
            onClick={handleGPSClick}
          >
            Use GPS
          </button>
        </div>
      </nav>
      <CardGroup>
        {/* City Card */}
        <Card>
          <Card.Body>
            <Card.Title>
              {weatherData.city ? weatherData.city.location.name : 'Loading...'}
            </Card.Title>
            <Card.Text>
              {weatherData.city ? (
                <>
                  <p>Temperature: {weatherData.city.current.temp_c}°C</p>
                  <p>Humidity: {weatherData.city.current.humidity}%</p>
                </>
              ) : (
                'Loading weather data...'
              )}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Last updated{' '}
              {weatherData.city
                ? weatherData.city.current.last_updated
                : 'a moment ago'}
            </small>
          </Card.Footer>
        </Card>

        {/* State Card */}
        <Card>
          <Card.Body>
            <Card.Title>
              {weatherData.state ? weatherData.state.location.name : 'Loading...'}
            </Card.Title>
            <Card.Text>
              {weatherData.state ? (
                <>
                  <p>Temperature: {weatherData.state.current.temp_c}°C</p>
                  <p>Humidity: {weatherData.state.current.humidity}%</p>
                </>
              ) : (
                'Loading weather data...'
              )}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Last updated{' '}
              {weatherData.state
                ? weatherData.state.current.last_updated
                : 'a moment ago'}
            </small>
          </Card.Footer>
        </Card>

        {/* Location Card based on Latitude and Longitude */}
        <Card>
          <Card.Body>
            <Card.Title>
              {coordinates.latitude && coordinates.longitude
                ? `Lat: ${coordinates.latitude}, Lon: ${coordinates.longitude}`
                : 'Loading...'}
            </Card.Title>
            <Card.Text>
              {weatherData.location ? (
                <>
                  <p>Temperature: {weatherData.location.current.temp_c}°C</p>
                  <p>Humidity: {weatherData.location.current.humidity}%</p>
                </>
              ) : (
                'Loading weather data...'
              )}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Last updated{' '}
              {weatherData.location
                ? weatherData.location.current.last_updated
                : 'a moment ago'}
            </small>
          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
}

export default WeatherAPI;
