import React, { useState } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "../apiconfig.js"

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          access_key: API_KEY,
          query: city,
        },
      });

      if (response.data.success === false) {
        setError("City not found. Please try again.");
        setWeather(null);
      } else {
        setWeather(response.data);
      }
    } catch (err) {
      setError("Error fetching weather data. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
    <div className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-1 has-text-white">
            Weather<span className="has-text-warning">Baby</span>
          </h1>

          <div className="box">
            {/* Input Field */}
            <div className="field">
              <div className="control">
                <input
                  className="input is-large"
                  type="text"
                  placeholder="Enter city name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="field">
              <div className="control">
                <button
                  className={`button is-large is-fullwidth ${
                    loading ? "is-loading" : "is-primary"
                  }`}
                  onClick={fetchWeather}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Get Weather"}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="has-text-danger">{error}</p>}
          </div>

          {/* Weather Card */}
          {weather && (
            <div className="card mt-5" style={{ maxWidth: "500px", margin: "auto", color: "white" }}>
              <div className="card-content">
                <h2 className="title is-3">{`${weather.location.name}, ${weather.location.country}`}</h2>
                <p className="subtitle is-5">{weather.current.weather_descriptions[0]}</p>

                <div className="columns is-mobile is-vcentered">
                  <div className="column has-text-centered">
                    <h3 className="title is-2 has-text-info">
                      {Math.round(weather.current.temperature)}°C
                    </h3>
                    <img
                      src={weather.current.weather_icons[0]}
                      alt="Weather Icon"
                      style={{ width: "80px", height: "80px" }}
                    />
                  </div>
                </div>

                <div className="columns is-mobile">
                  <div className="column">
                    <p>
                      <strong>Humidity:</strong> {weather.current.humidity}%
                    </p>
                  </div>
                  <div className="column">
                    <p>
                      <strong>Wind Speed:</strong> {weather.current.wind_speed} km/h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="is-text is primary"> ©️ 2024 David Balishyan</p>
    </div>
    </>
  );
};

export default WeatherApp;
