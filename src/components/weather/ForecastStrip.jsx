import WeatherIcon from "./WeatherIcon";

function ForecastStrip({ items }) {
  const min = Math.min(...items.map((d) => d.low));
  const max = Math.max(...items.map((d) => d.high));
  const range = max - min || 1;

  return (
    <section className="animate-fade-up rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h3 className="mb-4 text-lg font-semibold">5-Day Forecast</h3>{" "}
      <div className="space-y-2">
        {items.map((d) => (
          <div
            key={d.day}
            className="flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-white/5"
          >
            <span className="w-10 text-sm font-medium text-slate-300">
              {d.day}
            </span>
            <WeatherIcon name={d.icon} size={26} />
            <span className="w-8 text-right text-sm text-slate-400">
              {d.low}°
            </span>

            <div className="relative h-1.5 flex-1 rounded-full bg-white/10">
              <div
                className="absolute h-full rounded-full bg-gradient-to-r from-sky-400 to-amber-300"
                style={{
                  left: `${((d.low - min) / range) * 100}%`,
                  width: `${((d.high - d.low) / range) * 100}%`,
                }}
              />
            </div>

            <span className="w-8 text-sm font-semibold">{d.high}°</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ForecastStrip;
