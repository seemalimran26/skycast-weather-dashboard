import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, X } from "lucide-react";

import Background from "../components/layout/Background";
import PageHeader from "../components/layout/PageHeader";
import WeatherIcon from "../components/weather/WeatherIcon";
import { useApp } from "../context/AppContext";
import { getCurrentWeather } from "../api/openweather";

function Locations({ onMenuClick }) {
  const { savedCities, removeCity, convertTemp, settings } = useApp();
  const navigate = useNavigate();

  // Current weather for each saved city, keyed by city id
  const [weatherById, setWeatherById] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (savedCities.length === 0) return;

    let cancelled = false;
    setLoading(true);

    Promise.allSettled(
      savedCities.map((c) => getCurrentWeather(c.lat, c.lon)),
    ).then((results) => {
      if (cancelled) return;

      const next = {};

      results.forEach((result, i) => {
        if (result.status === "fulfilled") {
          next[savedCities[i].id] = result.value;
        }
      });

      setWeatherById(next);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [savedCities]);

  // Open a saved city on the Weather page
  const openCity = (city) => {
    navigate("/", { state: { lat: city.lat, lon: city.lon } });
  };

  return (
    <div className="relative min-w-0 flex-1">
      <Background />

      <PageHeader
        title="Saved Locations"
        subtitle={
          savedCities.length > 0
            ? `${savedCities.length} saved ${
                savedCities.length === 1 ? "city" : "cities"
              }`
            : "Your favourite cities in one place"
        }
        onMenuClick={onMenuClick}
      />

      <main className="mx-auto max-w-7xl px-4 pb-10 md:px-8">
        {savedCities.length === 0 ? (
          /* Empty state */
          <div className="mx-auto mt-10 max-w-md animate-fade-up rounded-3xl border border-white/10 bg-white/10 p-8 text-center shadow-lg shadow-black/20 backdrop-blur-xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-300/15 text-amber-300">
              <Star size={26} />
            </div>

            <h3 className="text-lg font-semibold">No saved cities yet</h3>

            <p className="mt-2 text-sm text-slate-300">
              Search for a city on the Weather page and tap the star on the
              weather card to save it here.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 px-6 py-2.5 text-sm font-semibold shadow-lg shadow-sky-500/30 transition hover:brightness-110 active:scale-95"
            >
              Go to Weather
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {savedCities.map((city, i) => {
              const w = weatherById[city.id];

              return (
                <div
                  key={city.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => openCity(city)}
                  onKeyDown={(e) => e.key === "Enter" && openCity(city)}
                  style={{ animationDelay: `${i * 80}ms` }}
                  className="group relative animate-fade-up cursor-pointer rounded-3xl border border-white/10 bg-white/10 p-5 shadow-lg shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/15"
                >
                  {/* Remove button */}
                  <button
                    type="button"
                    aria-label={`Remove ${city.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCity(city.id);
                    }}
                    className="absolute right-3 top-3 rounded-full p-1.5 text-slate-400 transition hover:bg-white/15 hover:text-white"
                  >
                    <X size={16} />
                  </button>

                  <p className="flex items-center gap-1.5 text-sm font-medium text-slate-200">
                    <MapPin size={14} />
                    {city.name}
                    {city.country ? `, ${city.country}` : ""}
                  </p>

                  {w ? (
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-5xl font-light tracking-tight">
                          {convertTemp(w.main.temp)}°
                          <span className="ml-1 text-xl text-slate-300">
                            {settings.unit}
                          </span>
                        </p>

                        <p className="mt-1 text-sm capitalize text-slate-300">
                          {w.weather[0]?.description}
                        </p>
                      </div>

                      <WeatherIcon name={w.weather[0]?.icon} size={52} />
                    </div>
                  ) : loading ? (
                    <div className="mt-4 h-16 animate-pulse rounded-xl bg-white/15" />
                  ) : (
                    <p className="mt-4 text-sm text-slate-400">
                      Weather unavailable right now
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default Locations;
