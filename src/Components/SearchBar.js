import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { search } from "../Assets/Svg";

const apikey = "92df510d87771d3c5fd7268ad8085754";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

export default function SearchBar({
  city,
  setCity,
  cities,
  setCities,
  setIsLoading,
}) {
  const handleSearchChange = (e) => {
    setCity(e.target.value);
  };

  const checkWeather = async (e) => {
    e.preventDefault();
    if (cities.some((item) => item.name.toLowerCase() === city.toLowerCase())) {
      toast.warn("City already added!");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(apiurl + city + `&appid=${apikey}`);
      setCities([...cities, response.data]);
      setCity("");
      toast.success("City added successfully!");
    } catch (error) {
      console.error("Error fetching the weather data:", error);
      toast.error("Error fetching the weather data!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
}
