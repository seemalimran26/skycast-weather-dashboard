import { Droplets, Wind, Gauge, Eye } from "lucide-react";
import { useEffect, useState } from "react";

import Header from "../components/layout/Header";
import CurrentWeather from "../components/weather/CurrentWeather";
import StatCard from "../components/weather/StatCard";
import HourlyStrip from "../components/weather/HourlyStrip";
import ForecastStrip from "../components/weather/ForecastStrip";

import { mockWeather, mockForecast, mockHourly } from "../data/mockWeather";

import {
  searchLocations,
  getCurrentWeather,
  getForecast,
} from "../api/openweather";

// Convert 3-hour forecast data into daily forecast data
function createDailyForecast(forecastData) {
  if (!forecastData?.list) return [];

  const days = {};

  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split("T")[0];

    if (!days[dateKey]) {
      days[dateKey] = {
        date: date,
        temps: [],
        icons: [],
      };
    }

    days[dateKey].temps.push(item.main.temp);
    days[dateKey].icons.push(item.weather[0].icon);
  });

  return Object.values(days)
    .slice(0, 5)
    .map((day) => {
      const iconCounts = {};

      day.icons.forEach((icon) => {
        iconCounts[icon] = (iconCounts[icon] || 0) + 1;
      });

      const mostCommonIcon = Object.keys(iconCounts).reduce((a, b) =>
        iconCounts[a] > iconCounts[b] ? a : b,
      );

      return {
        day: day.date.toLocaleDateString([], {
          weekday: "short",
        }),
        low: Math.round(Math.min(...day.temps)),
        high: Math.round(Math.max(...day.temps)),
        icon: mostCommonIcon,
      };
    });
}

function Dashboard({ onMenuClick }) {
  // Weather state
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  // Loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Temperature unit
  const [unit, setUnit] = useState("C");

  // Toggle Celsius / Fahrenheit
  const toggleUnit = () => {
    setUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  // Convert Celsius to selected unit
  const convertTemp = (temp) => {
    if (unit === "C") {
      return Math.round(temp);
    }

    return Math.round((temp * 9) / 5 + 32);
  };

  // Automatically get weather from current location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Location access is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const data = await getCurrentWeather(latitude, longitude);
          const forecastData = await getForecast(latitude, longitude);

          setWeather(data);
          setForecast(forecastData);
        } catch (err) {
          console.error("Location Weather Error:", err);

          setError(
            "Unable to get weather for your current location. Please search for a city.",
          );
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("Location Permission Error:", err);

        setLoading(false);
        setError("");
      },
    );
  }, []);

  // Convert forecast data into daily data
  const dailyForecast = createDailyForecast(forecast);

  // Search and load weather
  const handleSearch = async (city) => {
    if (!city || !city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Search city
      const locations = await searchLocations(city.trim());

      if (!locations || locations.length === 0) {
        setError("City not found. Please try again.");
        setWeather(null);
        setForecast(null);
        return;
      }

      // Get coordinates
      const { lat, lon } = locations[0];

      // Get current weather
      const data = await getCurrentWeather(lat, lon);

      // Get forecast
      const forecastData = await getForecast(lat, lon);

      // Update weather data
      setWeather(data);
      setForecast(forecastData);
    } catch (err) {
      console.error("Weather API Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to get weather. Please check your internet connection and try again.",
      );

      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  // Weather statistics
  const stats = [
    {
      icon: Droplets,
      label: "Humidity",
      value: weather ? `${weather.main.humidity}%` : `${mockWeather.humidity}%`,
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
      {/* Header */}
      <Header
        onMenuClick={onMenuClick}
        onSearch={handleSearch}
        unit={unit}
        onToggleUnit={toggleUnit}
      />

      {/* Loading State */}
      {loading ? (
        <main className="mx-auto max-w-7xl space-y-6 px-4 pb-10 md:px-8">
          {/* Loading text */}
          <div className="flex items-center justify-center gap-3 py-4">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-sky-400"></div>

            <p className="text-sm font-medium text-slate-300">
              Loading weather...
            </p>
          </div>

          {/* Main Weather Skeleton */}
          <div className="animate-pulse rounded-[2rem] bg-gradient-to-br from-sky-400/30 via-blue-600/30 to-indigo-700/30 p-6 md:p-8">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
              <div className="space-y-5">
                <div className="h-8 w-40 rounded-full bg-white/30"></div>

                <div className="h-20 w-48 rounded-xl bg-white/30"></div>

                <div className="h-7 w-36 rounded-lg bg-white/30"></div>

                <div className="flex gap-2">
                  <div className="h-8 w-28 rounded-full bg-white/30"></div>
                  <div className="h-8 w-24 rounded-full bg-white/30"></div>
                </div>
              </div>

              <div className="mx-auto h-32 w-32 rounded-full bg-white/30 sm:mx-0"></div>
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-white/10 bg-white/10 p-5"
              >
                <div className="mb-4 h-9 w-9 rounded-lg bg-white/30"></div>
                <div className="mb-3 h-4 w-20 rounded bg-white/30"></div>
                <div className="h-6 w-16 rounded bg-white/30"></div>
              </div>
            ))}
          </div>

          {/* Bottom Skeleton */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Hourly */}
            <div className="animate-pulse rounded-2xl border border-white/10 bg-white/10 p-5 lg:col-span-2">
              <div className="mb-5 h-5 w-32 rounded bg-white/30"></div>

              <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-24 min-w-[75px] rounded-xl bg-white/20"
                  ></div>
                ))}
              </div>
            </div>

            {/* Forecast */}
            <div className="animate-pulse rounded-2xl border border-white/10 bg-white/10 p-5">
              <div className="mb-6 h-6 w-40 rounded bg-white/30"></div>

              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-14 rounded-xl bg-white/20"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      ) : error ? (
        /* Error State */
        <main className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 md:px-8">
          <div className="w-full max-w-md rounded-2xl border border-red-400/20 bg-red-400/10 p-8 text-center">
            <div className="mb-4 text-4xl">⚠️</div>

            <h2 className="mb-2 text-xl font-semibold text-white">
              Unable to find weather
            </h2>

            <p className="text-sm text-red-300">{error}</p>

            <p className="mt-3 text-sm text-slate-400">
              Please check the city name and try again.
            </p>
          </div>
        </main>
      ) : (
        /* Normal Weather State */
        <main className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 md:px-8 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Current weather */}
            <CurrentWeather
              data={weather || mockWeather}
              unit={unit}
              convertTemp={convertTemp}
            />

            {/* Weather statistics */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((s, i) => (
                <StatCard key={s.label} {...s} delay={i * 100} />
              ))}
            </div>

            {/* Hourly forecast */}
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
                      temp: convertTemp(item.main.temp),
                    }))
                  : mockHourly
              }
            />
          </div>

          {/* Right column */}
          <div className="lg:col-span-1">
            <ForecastStrip
              items={
                dailyForecast.length > 0
                  ? dailyForecast.map((day) => ({
                      ...day,
                      low: convertTemp(day.low),
                      high: convertTemp(day.high),
                    }))
                  : mockForecast
              }
            />
          </div>
        </main>
      )}

      {/* Success message */}
      {weather && !loading && !error && (
        <p className="pb-6 text-center text-sm text-emerald-400">
          Weather loaded for {weather.name}
        </p>
      )}
    </div>
  );
}

export default Dashboard;
