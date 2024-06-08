// src/utils/getWeatherImage.js

import { rain, fog, sun, snow, storm } from '../Assets/Images';

const weatherImages = {
  Rain: rain,
  Drizzle: rain,
  Thunderstorm: storm,
  Snow: snow,
  Mist: fog,
  Smoke: fog,
  Haze: fog,
  Dust: fog,
  Fog: fog,
  Sand: fog,
  Ash: fog,
  Squall: storm,
  Tornado: storm,
  Clear: sun,
  Clouds: sun 
};

export function getWeatherImage(weatherCondition) {
  return weatherImages[weatherCondition] || sun; // Default to sun if condition not found
}
