import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://crio-location-selector.onrender.com/countries"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (country) => {
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");

    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      );
      setStates(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleStateChange = async (state) => {
    setSelectedState(state);
    setSelectedCity("");

    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
      );
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="location-selector">
      <h2>Select Location</h2>
      <div className="dropdown-group">
        <select
          value={selectedCountry}
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          value={selectedState}
          onChange={(e) => handleStateChange(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={(e) => handleCityChange(e.target.value)}
          disabled={!selectedState}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {selectedCity && selectedState && selectedCountry && (
        <p>
           <strong>You Selected {selectedCity}</strong>, {selectedState}, {selectedCountry}
        </p>
      )}
    </div>
  );
};

export default LocationSelector;