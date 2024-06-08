import React from "react";
import { suns, moon } from "../Assets/Svg";

export default function ToggleButton({ darkMode, setDarkMode }) {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
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
  );
}
