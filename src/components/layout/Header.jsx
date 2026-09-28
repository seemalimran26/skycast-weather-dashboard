import SearchBar from "../weather/SearchBar";
import { Menu } from "lucide-react";

function Header({ onMenuClick, onSearch, unit, onToggleUnit }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-4 py-5 md:px-8">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-xl border border-white/10 bg-white/10 p-2.5 text-white lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-sm text-slate-400">{today}</p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex w-full items-center gap-3 md:w-auto">
        <div className="min-w-0 flex-1 md:flex-none">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Fahrenheit / Celsius Button */}
        <button
          type="button"
          onClick={onToggleUnit}
          style={{
            display: "flex",
            width: "56px",
            height: "44px",
            minWidth: "56px",
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
            backgroundColor: "#f1f5f9",
            border: "1px solid #cbd5e1",
            color: "#0f172a",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          °{unit === "C" ? "F" : "C"}
        </button>
      </div>
    </header>
  );
}

export default Header;
