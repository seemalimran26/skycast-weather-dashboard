import { NavLink } from "react-router-dom";
import { CloudSun, MapPin, Settings } from "lucide-react";

const links = [
  { to: "/", label: "Weather", icon: CloudSun },
  { to: "/locations", label: "Locations", icon: MapPin },
  { to: "/settings", label: "Settings", icon: Settings },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex min-h-screen w-64 transform flex-col border border-white/10 bg-slate-950/80 px-6 py-8 text-white backdrop-blur-xl transition-transform duration-300 md:sticky md:bg-slate-900/80 md:rounded-3xl
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="mb-12">
          <h1 className="bg-gradient-to-r from-sky-300 to-indigo-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
            SkyCast
          </h1>
          <p className="mt-1 text-small text-slate-400">Weather Dashboard</p>
        </div>

        <nav className="space-y-5 ">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">
            Overview
          </p>

          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-white/15 font-medium text-white shadow-lg shadow-sky-500/10 ring-1 ring-white/20"
                    : "text-slate-400 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto">
          <p className="text-xs text-slate-500">SkyCast</p>
          <p className="mt-1 text-xs text-slate-600">Simple weather insights</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
