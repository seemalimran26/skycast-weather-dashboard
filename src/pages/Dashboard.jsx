import { Droplets, Wind, Gauge, Eye } from "lucide-react";
import Header from "../components/layout/Header";
import CurrentWeather from "../components/weather/CurrentWeather";
import StatCard from "../components/weather/StatCard";
import HourlyStrip from "../components/weather/HourlyStrip";
import ForecastStrip from "../components/weather/ForecastStrip";
import {
  mockWeather,
  mockForecast,
  mockHourly,
} from "../data/mockWeather";
import { useState } from "react";
import {
  searchLocations,
  getCurrentWeather,
  getForecast,
} from "../api/openweather";

function Dashboard({ onMenuClick }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    if (!city || !city.trim()) return;

    try {
      setLoading(true);
      setError("");

      // 1. Search city and get coordinates
      const locations = await searchLocations(city);

      if (!locations || locations.length === 0) {
        setError("City not found. Please try again.");
        setWeather(null);
        return;
      }

      const { lat, lon } = locations[0];

      // 2. Get weather using coordinates
      const data = await getCurrentWeather(lat, lon);

      console.log("CURRENT WEATHER DONE:", data);

      const forecastData = await getForecast(lat, lon);

      console.log("FORECAST DONE:", forecastData);

      setWeather(data);
      setForecast(forecastData);
    } catch (err) {
      console.error("Weather API Error:", err);
      console.error("Response:", err.response?.data);
      console.error("Status:", err.response?.status);

      setError(
        err.response?.data?.message ||
        "Unable to get weather. Please try again."
      );

      setWeather(null);
    } finally {
      setLoading(false);
    }
  };
  const stats = [
    {
      icon: Droplets,
      label: "Humidity",
      value: weather
        ? `${weather.main.humidity}%`
        : `${mockWeather.humidity}%`,
      color: "bg-sky-400/15 text-sky-300",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: weather
        ? `${Math.round(weather.wind.speed * 3.6)} km/h`
        : `${mockWeather.windSpeed} km/h`,
      color: "bg-emerald-400/15 text-emerald-300",
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: weather
        ? `${weather.main.pressure} hPa`
        : `${mockWeather.pressure} hPa`,
      color: "bg-amber-400/15 text-amber-300",
    },
    {
      icon: Eye,
      label: "Visibility",
      value: weather
        ? `${(weather.visibility / 1000).toFixed(1)} km`
        : `${mockWeather.visibility} km`,
      color: "bg-fuchsia-400/15 text-fuchsia-300",
    },
  ];

  return (
    <div className="min-w-0 flex-1">
      <Header
        onMenuClick={onMenuClick}
        onSearch={handleSearch}
      />

      <main className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 md:px-8 lg:grid-cols-3">

        <div className="space-y-6 lg:col-span-2">

          <CurrentWeather data={weather || mockWeather} />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <StatCard
                key={s.label}
                {...s}
                delay={i * 100}
              />
            ))}
          </div>

          <HourlyStrip
            items={
              forecast
                ? forecast.list.slice(0, 8).map((item, index) => ({
                  time:
                    index === 0
                      ? "Now"
                      : new Date(item.dt * 1000).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      }),
                  icon: item.weather[0].icon,
                  temp: Math.round(item.main.temp),
                }))
                : mockHourly
            }
          />

        </div>

        <div className="lg:col-span-1">
          <ForecastStrip items={mockForecast} />
        </div>

      </main>

      {loading && (
        <p className="text-center text-slate-400">
          Loading weather...
        </p>
      )}

      {error && (
        <p className="text-center text-red-400">
          {error}
        </p>
      )}

      {weather && !loading && !error && (
        <p className="text-center text-emerald-400">
          Weather loaded for {weather.name}
        </p>
      )}
    </div>
  );
}

export default Dashboard;