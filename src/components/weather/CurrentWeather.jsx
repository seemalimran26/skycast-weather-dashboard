import { MapPin, Thermometer, ArrowUp, ArrowDown } from "lucide-react";
import WeatherIcon from "./WeatherIcon";

function Chip({ icon: Icon, children }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur">
      <Icon size={14} />
      {children}
    </span>
  );
}

function CurrentWeather({ data, unit, convertTemp }) {
  // Check whether the data is from OpenWeather API
  const isApiData = data?.main && data?.weather;

  const city = isApiData ? data.name : data.city;
  const country = isApiData ? data.sys?.country : data.country;

  // Convert temperature according to selected unit
  const temp = isApiData ? convertTemp(data.main.temp) : convertTemp(data.temp);

  const condition = isApiData ? data.weather[0]?.description : data.condition;

  const feelsLike = isApiData
    ? convertTemp(data.main.feels_like)
    : convertTemp(data.feelsLike);

  const icon = isApiData ? data.weather[0]?.icon : data.icon;

  return (
    <section className="relative animate-fade-up overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 p-6 shadow-2xl shadow-blue-900/40 md:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-cyan-300/30 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur">
            <MapPin size={15} />
            {city}, {country}
          </div>

          <h1 className="mt-5 text-7xl font-bold leading-none tracking-tighter md:text-8xl">
            {temp}°{unit}
          </h1>

          <p className="mt-3 text-2xl font-semibold capitalize">{condition}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Chip icon={Thermometer}>
              Feels {feelsLike}°{unit}
            </Chip>

            {!isApiData && (
              <>
                <Chip icon={ArrowUp}>
                  {convertTemp(data.high)}°{unit}
                </Chip>

                <Chip icon={ArrowDown}>
                  {convertTemp(data.low)}°{unit}
                </Chip>
              </>
            )}
          </div>
        </div>

        <WeatherIcon
          name={icon}
          size={150}
          className="animate-float self-center drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
        />
      </div>
    </section>
  );
}

export default CurrentWeather;
