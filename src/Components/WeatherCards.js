import React from "react";
import CardSkeleton from "./CardSkeleton";
import { getWeatherImage } from "../utils/getWeatherImage";

export default function WeatherCards({ cities, isLoading, setCities }) {
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

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 ">
      {" "}
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
      {isLoading && <CardSkeleton />}
    </div>
  );
}
