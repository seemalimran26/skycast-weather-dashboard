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
      className="flex w-full max-w-md items-center gap-2"
    >
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
        />
      </div>

      <button
        type="submit"
        className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-500/30 transition hover:bg-sky-600 active:scale-95"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
