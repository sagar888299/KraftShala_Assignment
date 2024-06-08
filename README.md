Weather App

This is a React-based weather application that allows users to search for weather information for various cities. Users can add cities to their list, and the app provides detailed weather data including temperature, humidity, wind speed, visibility, and local time. The app also supports dark mode toggling.

Features
- Search for weather information by city name.
- Add multiple cities to view their weather data.
- Remove cities from the list.
- Toggle between light mode and dark mode.
- Automatically updates weather data every 60 seconds.
- Displays weather details including temperature, humidity, wind speed, visibility, and local time.
- Toast notifications for successful actions and error handling.
- React skeleton for loading states.

Technologies Used
- React
- Axios
- OpenWeatherMap API
- React Toastify
- React Skeleton
- Tailwind CSS

Installation

Clone the repository:
- git clone https://github.com/your-username/weather-app.git

Navigate to the project directory:
- cd weather-app

Install the dependencies:
- npm install

Start the development server:

- npm start
- Open your browser and go to http://localhost:3000 to view the app.

Components:
Home Component
The main component of the application that handles the following:

- State management for cities, dark mode, and search input.
- Fetching weather data from the OpenWeatherMap API.
- Adding and removing cities.
- Toggling dark mode.
- Displaying weather details for each city.
- Handling automatic updates every 60 seconds.

This README file provides an overview of the project, its features, technologies used, and instructions on how to set up and run the application. Be sure to replace the placeholder URLs and paths with the actual ones for your project.