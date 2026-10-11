import { useState } from "react";
import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 md:w-96"
    >
      <div className="relative min-w-0 flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full rounded-full border border-white/20 bg-slate-950/50 py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-300 outline-none backdrop-blur-xl transition focus:border-sky-300/60 focus:bg-slate-950/70 focus:ring-4 focus:ring-sky-400/20"
        />
      </div>

      <button
        type="submit"
        className="shrink-0 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-950/30 transition hover:bg-sky-400 active:scale-95"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
