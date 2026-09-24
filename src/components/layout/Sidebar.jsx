import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#0f172a] text-white md:hidden"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 w-64 min-h-screen bg-[#0f172a] text-white px-6 py-8 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="mb-14">
          <h1 className="text-2xl font-bold tracking-tight">
            SkyCast
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Weather Dashboard
          </p>
        </div>

        <nav>
          <p className="text-[11px] uppercase tracking-[0.15em] text-slate-500 font-semibold mb-4">
            Overview
          </p>

          <a
            href="#"
            className="flex items-center px-4 py-3 rounded-lg bg-sky-500 text-white text-sm font-medium"
          >
            Dashboard
          </a>

          <a
            href="#"
            className="flex items-center px-4 py-3 mt-2 rounded-lg text-slate-400 text-sm hover:bg-slate-800 hover:text-white"
          >
            Locations
          </a>

          <a
            href="#"
            className="flex items-center px-4 py-3 mt-2 rounded-lg text-slate-400 text-sm hover:bg-slate-800 hover:text-white"
          >
            Settings
          </a>
        </nav>

        <div className="absolute bottom-8 w-52">
          <p className="text-xs text-slate-500">
            SkyCast
          </p>

          <p className="text-xs text-slate-600 mt-1">
            Simple weather insights
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;