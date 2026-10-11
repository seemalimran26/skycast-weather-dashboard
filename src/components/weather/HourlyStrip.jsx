import WeatherIcon from "./WeatherIcon";

function HourlyStrip({ items }) {
  return (
    <section className="animate-fade-up rounded-3xl border border-white/15 bg-slate-950/70 p-6 text-white shadow-xl shadow-slate-950/30 backdrop-blur-xl">
      <h3 className="mb-4 text-lg font-semibold">Today</h3>

      <div className="no-scrollbar flex gap-3 overflow-x-auto">
        {items.map((h, i) => (
          <div
            key={`${h.time}-${i}`}
            className={`flex min-w-[76px] flex-col items-center gap-2 rounded-2xl px-3 py-4 transition hover:bg-white/15 ${
              i === 0 ? "bg-sky-400/20 ring-1 ring-sky-200/30" : "bg-white/5"
            }`}
          >
            <span className="text-xs text-slate-200">{h.time}</span>
            <WeatherIcon name={h.icon} size={30} />
            <span className="text-sm font-semibold">{h.temp}°</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HourlyStrip;
