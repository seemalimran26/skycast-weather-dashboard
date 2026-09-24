import { Menu } from "lucide-react";
import SearchBar from "../weather/SearchBar";

function Header({ onMenuClick, onSearch }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-4 py-5 md:px-8">
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

      <SearchBar onSearch={onSearch} />
    </header>
  );
}

export default Header;