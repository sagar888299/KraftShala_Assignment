import React, { useState, useEffect } from "react";
import axios from "axios";
import { getWeatherImage } from "../utils/getWeatherImage";
import { suns, moon, search } from "../Assets/Svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apikey = "92df510d87771d3c5fd7268ad8085754";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

export default function Home() {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleSearchChange = (e) => {
    setCity(e.target.value);
  };

  const checkWeather = async (e) => {
    e.preventDefault();
    if (cities.some((item) => item.name.toLowerCase() === city.toLowerCase())) {
      toast.warn("City already added!");
      return;
    }
    try {
      const response = await axios.get(apiurl + city + `&appid=${apikey}`);
      setCities([...cities, response.data]);
      setCity("");
      toast.success("City added successfully!");
    } catch (error) {
      console.error("Error fetching the weather data:", error);
      toast.error("Error fetching the weather data!");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const removeCity = (cityName) => {
    setCities(cities.filter((city) => city.name !== cityName));
  };

  const getLocalTime = (timezone) => {
    const utcOffset = timezone / 3600; // Convert seconds to hours
    const localTime = new Date();
    localTime.setUTCMinutes(
      localTime.getUTCMinutes() + localTime.getTimezoneOffset() + utcOffset * 60
    );

    const optionsDate = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
    };

    const date = localTime.toLocaleDateString([], optionsDate);
    const time = localTime.toLocaleTimeString([], optionsTime);

    return `${date} ${time}`;
  };

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
      <ToastContainer />
      <div className="w-full flex gap-4">
        <form className="w-full mx-auto" onSubmit={checkWeather}>
          <label
            htmlFor="default-search"
            className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center pl-4 pointer-events-none">
              <img
                src={search}
                className="w-6 h-6 text-gray-500 dark:text-gray-400 hidden lg:block md:block"
                alt="searchIcon"
              />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-5 pl-2 lg:pl-12 md:pl-12 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter city name"
              value={city}
              onChange={handleSearchChange}
              required
            />
            <button
              type="submit"
              className="dark:text-white absolute right-3 bottom-3 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg py-3 lg:px-5 "
            >
              ADD CITY
            </button>
          </div>
        </form>
        <div
          className="flex min-w-[60px] border rounded-lg"
          onClick={toggleDarkMode}
        >
          <input
            type="checkbox"
            name="light-switch"
            className="light-switch sr-only"
          />
          <label
            className="relative cursor-pointer p-2 items-center flex justify-center"
            htmlFor="light-switch"
          >
            <img
              src={suns}
              alt="Light mode"
              className={`w-6 h-6 ml-3 mt-1 text-gray-100 dark:text-gray-400 ${
                darkMode ? "hidden" : "block"
              }`}
            />
            <img
              src={moon}
              alt="Dark mode"
              className={`w-6 h-6 ml-3 mt-1 text-gray-100 dark:text-gray-400 ${
                darkMode ? "block invert" : "hidden"
              }`}
            />
          </label>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 ">
        {cities.map((weatherData, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md w-80 sm:w-80 relative"
          >
            <button
              onClick={() => removeCity(weatherData.name)}
              className="absolute bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white rounded-full w-8 h-8 right-[-10px] translate-y-[-35px]"
            >
              &times;
            </button>
            <div className="mt-10 text-center font-sans font-bold">
              <h2 className="text-6xl font-semibold mb-4 text-gray-400 truncate p-3">
                {weatherData.name}
              </h2>
              <p className="text-5xl mb-4 p-3">{weatherData.main.temp} °C</p>
              <img
                src={getWeatherImage(weatherData.weather[0].main)}
                alt={weatherData.weather[0].main}
                className="mx-auto my-4 p-3"
              />
            </div>
            <div id="answer" className="mt-10 grid grid-cols-1 gap-6">
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <p className="flex flex-col gap-2 ">
                  <div className="font-sans font-bold text-base text-gray-400">
                    Weather
                  </div>
                  <div className="font-sans font-bold text-4xl">
                    {weatherData.weather[0].main}
                  </div>
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <p className="flex flex-col gap-2 ">
                  <div className="font-sans font-bold text-base text-gray-400">
                    Humidity
                  </div>
                  <div className="font-sans font-bold text-4xl">
                    {weatherData.main.humidity} %
                  </div>
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <p className="flex flex-col gap-2 ">
                  <div className="font-sans font-bold text-base text-gray-400">
                    Wind Speed
                  </div>
                  <div className="font-sans font-bold text-4xl">
                    {weatherData.wind.speed} m/s
                  </div>
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <p className="flex flex-col gap-2 ">
                  <div className="font-sans font-bold text-base text-gray-400">
                    Visibility
                  </div>
                  <div className="font-sans font-bold text-4xl">
                    {weatherData.visibility / 1000} km
                  </div>
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <p className="flex flex-col gap-2 ">
                  <div className="font-sans font-bold text-base text-gray-400">
                    Date & Time
                  </div>
                  <div className="font-sans font-bold text-4xl">
                    {getLocalTime(weatherData.timezone)}
                  </div>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
