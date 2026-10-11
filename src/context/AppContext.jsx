import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

const SETTINGS_KEY = "skycast-settings";
const CITIES_KEY = "skycast-saved-cities";

const defaultSettings = {
  unit: "C",
  useLocation: true,
  defaultCity: "",
};

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable, ignore
  }
}

// Build a saved-city object from an OpenWeather current-weather response
function cityFromWeather(w) {
  const country = w.sys?.country ?? "";

  return {
    id: `${w.name}-${country}`,
    name: w.name,
    country,
    lat: w.coord.lat,
    lon: w.coord.lon,
  };
}

export function AppProvider({ children }) {
  const [settings, setSettings] = useState(() => ({
    ...defaultSettings,
    ...readStorage(SETTINGS_KEY, {}),
  }));
  const [savedCities, setSavedCities] = useState(() =>
    readStorage(CITIES_KEY, []),
  );

  // Kept here so weather is not lost when switching pages
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => writeStorage(SETTINGS_KEY, settings), [settings]);
  useEffect(() => writeStorage(CITIES_KEY, savedCities), [savedCities]);

  const updateSettings = (patch) =>
    setSettings((prev) => ({ ...prev, ...patch }));

  const toggleUnit = () =>
    setSettings((prev) => ({
      ...prev,
      unit: prev.unit === "C" ? "F" : "C",
    }));

  // Convert Celsius to the selected unit
  const convertTemp = (temp) =>
    settings.unit === "C" ? Math.round(temp) : Math.round((temp * 9) / 5 + 32);

  const isSavedCity = (w) =>
    !!w?.coord && savedCities.some((c) => c.id === cityFromWeather(w).id);

  const toggleSaveCity = (w) => {
    if (!w?.coord) return;

    const city = cityFromWeather(w);

    setSavedCities((prev) =>
      prev.some((c) => c.id === city.id)
        ? prev.filter((c) => c.id !== city.id)
        : [...prev, city],
    );
  };

  const removeCity = (id) =>
    setSavedCities((prev) => prev.filter((c) => c.id !== id));

  const clearCities = () => setSavedCities([]);

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        toggleUnit,
        convertTemp,
        savedCities,
        isSavedCity,
        toggleSaveCity,
        removeCity,
        clearCities,
        weather,
        setWeather,
        forecast,
        setForecast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return ctx;
}
