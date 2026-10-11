import { Menu } from "lucide-react";

// Simple header for Locations and Settings pages
function PageHeader({ title, subtitle, onMenuClick }) {
  return (
    <header className="flex items-center gap-3 px-4 py-5 md:px-8">
      <button
        onClick={onMenuClick}
        className="rounded-xl border border-white/10 bg-white/10 p-2.5 text-white backdrop-blur-xl md:hidden"
      >
        <Menu size={20} />
      </button>

      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && <p className="text-sm text-slate-300/80">{subtitle}</p>}
      </div>
    </header>
  );
}

export default PageHeader;
