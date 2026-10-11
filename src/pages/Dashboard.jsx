import { Droplets, Wind, Gauge, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Background from "../components/layout/Background";
import Header from "../components/layout/Header";
import CurrentWeather from "../components/weather/CurrentWeather";
import StatCard from "../components/weather/StatCard";
import HourlyStrip from "../components/weather/HourlyStrip";
import ForecastStrip from "../components/weather/ForecastStrip";

import { useApp } from "../context/AppContext";
import { mockWeather, mockForecast, mockHourly } from "../data/mockWeather";

import {
  searchLocations,
  getCurrentWeather,
  getForecast,
} from "../api/OpenWeather";

// Background gradient based on weather condition
// (full class names so Tailwind can detect them)
const gradients = {
  Clear: "from-slate-900 via-blue-950 to-indigo-950",
  Clouds: "from-slate-500 via-slate-700 to-slate-900",
  Rain: "from-slate-700 via-blue-900 to-slate-950",
  Drizzle: "from-slate-600 via-blue-800 to-slate-950",
  Thunderstorm: "from-slate-800 via-purple-900 to-slate-950",
  Snow: "from-slate-800 via-sky-950 to-blue-950",
};

const defaultGradient = "from-slate-950 via-blue-950 to-indigo-950";

// Convert 3-hour forecast data into daily forecast data
function createDailyForecast(forecastData) {
  if (!forecastData?.list) return [];

  const timezoneOffset = forecastData.city?.timezone ?? 0;
  const days = new Map();

  forecastData.list.forEach((item) => {
    // Forecast item ko city ke local date mein convert karein
    const cityDate = new Date((item.dt + timezoneOffset) * 1000);
    const dateKey = cityDate.toISOString().slice(0, 10);

    if (!days.has(dateKey)) {
      days.set(dateKey, {
        date: cityDate,
        temps: [],
        icons: [],
      });
    }

    const day = days.get(dateKey);
    day.temps.push(item.main.temp);
    day.icons.push(item.weather[0].icon);
  });

  return [...days.values()].slice(0, 5).map((day) => {
    const iconCounts = {};

    day.icons.forEach((icon) => {
      iconCounts[icon] = (iconCounts[icon] || 0) + 1;
    });

    const mostCommonIcon = Object.keys(iconCounts).reduce((a, b) =>
      iconCounts[a] > iconCounts[b] ? a : b,
    );

    return {
      day: new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        timeZone: "UTC",
      }).format(day.date),
      low: Math.round(Math.min(...day.temps)),
      high: Math.round(Math.max(...day.temps)),
      icon: mostCommonIcon,
    };
  });
}

function Dashboard({ onMenuClick }) {
  // Shared app state (settings, saved cities, last loaded weather)
  const {
    settings,
    toggleUnit,
    convertTemp,
    weather,
    setWeather,
    forecast,
    setForecast,
    isSavedCity,
    toggleSaveCity,
  } = useApp();

  const unit = settings.unit;

  // Coordinates sent from the Locations page (when a saved city is clicked)
  const { state } = useLocation();
  const coordsFromState = state?.lat !== undefined ? state : null;

  // Loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch current weather + forecast and store them
  const fetchWeather = async (lat, lon) => {
    const [data, forecastData] = await Promise.all([
      getCurrentWeather(lat, lon),
      getForecast(lat, lon),
    ]);

    setWeather(data);
    setForecast(forecastData);
  };

  // Load weather for coordinates (location / saved city)
  const loadByCoords = async (
    lat,
    lon,
    failMessage = "Unable to get weather for this location. Please search for a city.",
  ) => {
    try {
      setLoading(true);
      setError("");

      await fetchWeather(lat, lon);
    } catch (err) {
      console.error("Location Weather Error:", err);

      setError(failMessage);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

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

      // Get current weather + forecast
      await fetchWeather(lat, lon);
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

  // Load weather when the page opens
  useEffect(() => {
    // 1. A saved city was clicked on the Locations page
    if (coordsFromState) {
      loadByCoords(
        coordsFromState.lat,
        coordsFromState.lon,
        "Unable to load weather for this city. Please try again.",
      );
      return;
    }

    // 2. Weather is already loaded (user came back from another page)
    if (weather) return;

    // 3. Fall back to the default city from Settings (if any)
    const loadDefaultCity = () => {
      if (settings.defaultCity.trim()) {
        handleSearch(settings.defaultCity);
      }
    };

    // 4. Use current location (if enabled in Settings)
    if (settings.useLocation && navigator.geolocation) {
      setLoading(true);
      setError("");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          loadByCoords(
            latitude,
            longitude,
            "Unable to get weather for your current location. Please search for a city.",
          );
        },
        (err) => {
          console.error("Location Permission Error:", err);

          setLoading(false);
          loadDefaultCity();
        },
      );
    } else {
      loadDefaultCity();
    }
    // Run only when the page opens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Convert forecast data into daily data
  const dailyForecast = createDailyForecast(forecast);

  // Weather statistics
  const stats = [
    {
      icon: Droplets,
      label: "Humidity",
      value: weather ? `${weather.main.humidity}%` : `${mockWeather.humidity}%`,
      color: "bg-sky-400/20 text-sky-200",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: weather
        ? `${Math.round(weather.wind.speed * 3.6)} km/h`
        : `${mockWeather.windSpeed} km/h`,
      color: "bg-emerald-400/20 text-emerald-200",
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: weather
        ? `${weather.main.pressure} hPa`
        : `${mockWeather.pressure} hPa`,
      color: "bg-amber-400/20 text-amber-200",
    },
    {
      icon: Eye,
      label: "Visibility",
      value: weather
        ? `${(weather.visibility / 1000).toFixed(1)} km`
        : `${mockWeather.visibility} km`,
      color: "bg-fuchsia-400/20 text-fuchsia-200",
    },
  ];

  const gradient = gradients[weather?.weather?.[0]?.main] || defaultGradient;

  return (
    <div className="relative min-w-0 flex-1">
      {/* Weather-based background */}
      <Background gradient={gradient} />

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
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-sky-300"></div>

            <p className="text-sm font-medium text-slate-200">
              Loading weather...
            </p>
          </div>

          {/* Main Weather Skeleton */}
          <div className="animate-pulse rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl md:p-8">
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
                className="animate-pulse rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
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
            <div className="animate-pulse rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl lg:col-span-2">
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
            <div className="animate-pulse rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
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
          <div className="w-full max-w-md rounded-3xl border border-red-300/20 bg-red-500/10 p-8 text-center backdrop-blur-xl">
            <div className="mb-4 text-4xl">⚠️</div>

            <h2 className="mb-2 text-xl font-semibold text-white">
              Unable to find weather
            </h2>

            <p className="text-sm text-red-200">{error}</p>
          </div>
        </main>
      ) : (
        /* Normal Weather State */
        <main className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 md:px-8 lg:grid-cols-3">
          {/* Left column */}
          <div className="min-w-0 space-y-6 lg:col-span-2">
            {/* Current weather */}
            <CurrentWeather
              data={weather || mockWeather}
              unit={unit}
              convertTemp={convertTemp}
              isSaved={weather ? isSavedCity(weather) : false}
              onToggleSave={weather ? () => toggleSaveCity(weather) : undefined}
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
        <p className="pb-6 text-center text-sm text-emerald-300">
          Weather loaded for {weather.name}
        </p>
      )}
    </div>
  );
}

export default Dashboard;
