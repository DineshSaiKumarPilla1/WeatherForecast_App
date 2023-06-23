import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Spinner, Form, Button, InputGroup } from 'react-bootstrap';
import { FaSearch, FaExclamationTriangle, FaCloud, FaTemperatureHigh, FaTint, FaWind, FaUmbrella, FaEye } from 'react-icons/fa';
import './WeatherApp1.css';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');
  const [locationDetails, setLocationDetails] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const apiKey = 'a4888ddec31f46679e5150919232206';
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
      );
      if (response.ok) {
        const weatherData = await response.json();
        console.log(weatherData);
        setWeather(weatherData.current);
        setLocationDetails(weatherData.location);
        setError(null);
      } else {
        throw new Error('Failed to fetch weather data');
      }
    } catch (error) {
      setError(error.message);
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="weather-app">
      <div className="overlay"></div>
      <Container className="content-container">
      <h1 className="mt-4 text-center weather-app-title">Weather Forecasting App</h1>
        <Form className="my-4 text-center" onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Enter desired location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button variant="primary" type="submit">
              <FaSearch />
            </Button>
          </InputGroup>
        </Form>
        {error ? (
          <Card className="my-4 weather-card error-card">
            <Card.Body className="text-center">
              <FaExclamationTriangle className="error-icon" />
              <Card.Title>Error</Card.Title>
              <Card.Text>{error}</Card.Text>
            </Card.Body>
          </Card>
        ) : weather && locationDetails ? (
          <Card className="my-4 weather-card">
            <Card.Body>
              <Card.Title className="text-primary">
                <FaCloud className="weather-icon" />
                {locationDetails.name}, {locationDetails.country}
              </Card.Title>
              <Card.Text>
                <FaTemperatureHigh /> <strong>Temperature:</strong> {weather.temp_c}°C
              </Card.Text>
              <Card.Text>
                <FaTint /> <strong>Humidity:</strong> {weather.humidity}%
              </Card.Text>
              <Card.Text>
                <FaWind /> <strong>Wind Speed:</strong> {weather.wind_kph} km/h
              </Card.Text>
              <Card.Text>
                <FaUmbrella /> <strong>Precipitation:</strong> {weather.precip_mm} mm
              </Card.Text>
              <Card.Text>
                <FaEye /> <strong>Visibility:</strong> {weather.vis_km} km
              </Card.Text>
              <Card.Text>
                <strong>Weather Condition:</strong> {weather.condition.text}
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          weather || locationDetails ? (
            <Spinner animation="border" role="status" className="my-4">
              <span className="sr-only">Please wait</span>
            </Spinner>
          ) : null
        )}
      </Container>
    </div>
  );
};

export default WeatherApp;
