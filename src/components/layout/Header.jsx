import SearchBar from "../weather/SearchBar";
import { Menu } from "lucide-react";

function TimeIcon({ period }) {
  if (period === "night") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        className="h-8 w-8 drop-shadow-[0_0_10px_rgba(129,140,248,0.45)]"
      >
        <defs>
          <linearGradient id="moonGradient" x1="8" y1="5" x2="32" y2="34">
            <stop stopColor="#F8FAFC" />
            <stop offset="1" stopColor="#A5B4FC" />
          </linearGradient>
        </defs>
        <path
          d="M29 25.5A13 13 0 0 1 14.5 8 14 14 0 1 0 29 25.5Z"
          fill="url(#moonGradient)"
        />
        <circle cx="13" cy="25" r="1.2" fill="#818CF8" opacity=".65" />
        <circle cx="17" cy="30" r=".8" fill="#818CF8" opacity=".55" />
      </svg>
    );
  }

  const isWarm = period === "evening";
  const sunColor = isWarm ? "#FDBA74" : "#FDE68A";
  const rayColor = isWarm ? "#FB923C" : "#FACC15";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className="h-8 w-8 drop-shadow-[0_0_10px_rgba(251,191,36,0.35)]"
    >
      <defs>
        <radialGradient id="sunGradient" cx="35%" cy="30%">
          <stop stopColor="#FFF7C2" />
          <stop offset=".65" stopColor={sunColor} />
          <stop offset="1" stopColor={rayColor} />
        </radialGradient>
      </defs>
      <g stroke={rayColor} strokeWidth="2" strokeLinecap="round" opacity=".9">
        <path d="M20 3v4M20 33v4M3 20h4M33 20h4M8 8l3 3M29 29l3 3M32 8l-3 3M11 29l-3 3" />
      </g>
      <circle cx="20" cy="20" r="9" fill="url(#sunGradient)" />
      {(period === "morning" || period === "evening") && (
        <path
          d="M7 31h26"
          stroke={rayColor}
          strokeWidth="2"
          strokeLinecap="round"
          opacity=".8"
        />
      )}
    </svg>
  );
}

function Header({ onMenuClick, onSearch, unit, onToggleUnit }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const hour = new Date().getHours();

  const { greeting, period } =
    hour >= 20 || hour < 5
      ? { greeting: "Good Night", period: "night" }
      : hour < 12
        ? { greeting: "Good Morning", period: "morning" }
        : hour < 17
          ? { greeting: "Good Afternoon", period: "day" }
          : { greeting: "Good Evening", period: "evening" };

  return (
    <header className="mx-4 mb-6 mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/15 bg-slate-950/30 px-4 py-4 text-white shadow-xl shadow-slate-950/20 backdrop-blur-xl md:mx-8 md:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-xl border border-white/10 bg-white/10 p-2.5 text-white backdrop-blur-xl md:hidden"
        >
          <Menu size={20} />
        </button>

        <div>
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            {greeting}
            <TimeIcon period={period} />
          </h2>
          <p className="text-sm text-slate-300/80">{today}</p>
        </div>
      </div>

      <div className="flex w-full items-center gap-3 md:w-auto">
        <div className="min-w-0 flex-1 md:flex-none">
          <SearchBar onSearch={onSearch} />
        </div>

        <div className="flex shrink-0 rounded-full border border-white/10 bg-white/10 p-1 backdrop-blur-xl">
          {["C", "F"].map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => unit !== u && onToggleUnit()}
              className={`h-9 w-11 rounded-full text-sm font-semibold transition ${
                unit === u
                  ? "bg-white text-slate-900 shadow"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              °{u}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
