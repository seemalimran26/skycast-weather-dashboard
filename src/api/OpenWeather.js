import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";

export async function searchLocations(query) {
  const res = await axios.get(GEO_URL, {
    params: { q: query, limit: 5, appid: API_KEY },
  });
  return res.data;
}

export async function getCurrentWeather(lat, lon) {
  const res = await axios.get(`${BASE_WEATHER_URL}/weather`, {
    params: { lat, lon, units: "metric", appid: API_KEY },
  });
  return res.data;
}

export async function getForecast(lat, lon) {
  const res = await axios.get(`${BASE_WEATHER_URL}/forecast`, {
    params: {
      lat,
      lon,
      units: "metric",
      appid: API_KEY,
    },
  });

  return res.data;
}
