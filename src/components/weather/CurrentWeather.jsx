import { MapPin, Thermometer, ArrowUp, ArrowDown, Star } from "lucide-react";
import WeatherIcon from "./WeatherIcon";

function Chip({ icon: Icon, children }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur">
      {" "}
      <Icon size={14} />
      {children}
    </span>
  );
}

function CurrentWeather({ data, unit, convertTemp, isSaved, onToggleSave }) {
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

  const high = isApiData ? data.main.temp_max : data.high;
  const low = isApiData ? data.main.temp_min : data.low;

  const icon = isApiData ? data.weather[0]?.icon : data.icon;

  return (
    <section className="relative animate-fade-up overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-slate-900 via-sky-950 to-blue-950 p-6 text-white shadow-2xl shadow-slate-950/40 md:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />

      {/* Save location button */}
      {onToggleSave && (
        <button
          type="button"
          onClick={onToggleSave}
          aria-label={isSaved ? "Remove from saved locations" : "Save location"}
          title={isSaved ? "Remove from saved locations" : "Save location"}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-white/15 p-2.5 backdrop-blur transition hover:bg-white/25 active:scale-95"
        >
          <Star
            size={18}
            className={isSaved ? "fill-amber-300 text-amber-300" : "text-white"}
          />
        </button>
      )}

      <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur">
            {" "}
            <MapPin size={15} />
            {city}
            {country ? `, ${country}` : ""}
          </div>

          <h1 className="mt-5 text-8xl font-extralight leading-none tracking-tighter md:text-9xl">
            {temp}°
            <span className="ml-1 text-6xl font-light text-white/70">
              {unit}
            </span>
          </h1>

          <p className="mt-3 text-2xl font-medium capitalize text-white/90">
            {condition}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Chip icon={Thermometer}>
              Feels {feelsLike}°{unit}
            </Chip>

            {high !== undefined && low !== undefined && (
              <>
                <Chip icon={ArrowUp}>
                  {convertTemp(high)}°{unit}
                </Chip>

                <Chip icon={ArrowDown}>
                  {convertTemp(low)}°{unit}
                </Chip>
              </>
            )}
          </div>
        </div>
        <WeatherIcon
          name={icon}
          size={150}
          className="absolute right-5 top-24 h-16 w-16 self-center weather-float drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)] sm:static sm:h-36 sm:w-36"
        />
      </div>
    </section>
  );
}

export default CurrentWeather;
