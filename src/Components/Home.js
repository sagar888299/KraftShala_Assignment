import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WeatherCards from "./WeatherCards";
import SearchBar from "./SearchBar";
import ToggleButton from "./ToggleButton";

const apikey = "92df510d87771d3c5fd7268ad8085754";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

export default function Home() {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const updatedCities = await Promise.all(
        cities.map(async (city) => {
          try {
            const response = await axios.get(
              apiurl + city.name + `&appid=${apikey}`
            );
            return response.data;
          } catch (error) {
            console.error("Error updating the weather data:", error);
            return city;
          }
        })
      );
      setCities(updatedCities);
    }, 60000); // Update every 60 seconds
    return () => clearInterval(interval);
  }, [cities]);

  return (
    <div className="relative min-h-screen flex flex-col items-center text-gray-800 p-4 bg-gray-100 dark:bg-gray-800 dark:text-white transition-colors duration-300">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="w-full flex gap-4">
        <SearchBar
          city={city}
          setCity={setCity}
          cities={cities}
          setCities={setCities}
          setIsLoading={setIsLoading}
        />
        <ToggleButton darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <WeatherCards
        cities={cities}
        setCities={setCities}
        isLoading={isLoading}
      />
    </div>
  );
}
