import { Droplets, Wind, Gauge, Eye } from "lucide-react";
import Header from "../components/layout/Header";
import CurrentWeather from "../components/weather/CurrentWeather";
import StatCard from "../components/weather/StatCard";
import HourlyStrip from "../components/weather/HourlyStrip";
import ForecastStrip from "../components/weather/ForecastStrip";
import { mockWeather, mockForecast, mockHourly } from "../data/mockWeather";

function Dashboard({ onMenuClick }) {
  const handleSearch = (city) => console.log("Search:", city); // Module 2 mein API yahan lagegi

  const stats = [
    { icon: Droplets, label: "Humidity", value: `${mockWeather.humidity}%`, color: "bg-sky-400/15 text-sky-300" },
    { icon: Wind, label: "Wind Speed", value: `${mockWeather.windSpeed} km/h`, color: "bg-emerald-400/15 text-emerald-300" },
    { icon: Gauge, label: "Pressure", value: `${mockWeather.pressure} hPa`, color: "bg-amber-400/15 text-amber-300" },
    { icon: Eye, label: "Visibility", value: `${mockWeather.visibility} km`, color: "bg-fuchsia-400/15 text-fuchsia-300" },
  ];

  return (
    <div className="min-w-0 flex-1">
      <Header onMenuClick={onMenuClick} onSearch={handleSearch} />

      <main className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 md:px-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <CurrentWeather data={mockWeather} />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} delay={i * 100} />
            ))}
          </div>

          <HourlyStrip items={mockHourly} />
        </div>

        <div className="lg:col-span-1">
          <ForecastStrip items={mockForecast} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;