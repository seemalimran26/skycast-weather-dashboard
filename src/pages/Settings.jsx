import { Trash2 } from "lucide-react";

import Background from "../components/layout/Background";
import PageHeader from "../components/layout/PageHeader";
import { useApp } from "../context/AppContext";

// Simple on/off switch
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition ${
        checked ? "bg-sky-500" : "bg-white/20"
      }`}
    >
      <span
        className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function Section({ title, children }) {
  return (
    <section className="animate-fade-up rounded-3xl border border-white/10 bg-white/10 p-6 shadow-lg shadow-black/20 backdrop-blur-xl">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Row({ label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs text-slate-300">{description}</p>
        )}
      </div>

      {children}
    </div>
  );
}

function Settings({ onMenuClick }) {
  const { settings, updateSettings, savedCities, clearCities } = useApp();

  const handleClear = () => {
    if (window.confirm("Remove all saved cities?")) {
      clearCities();
    }
  };

  return (
    <div className="relative min-w-0 flex-1">
      <Background />

      <PageHeader
        title="Settings"
        subtitle="Customize how SkyCast works for you"
        onMenuClick={onMenuClick}
      />

      <main className="mx-auto max-w-2xl space-y-6 px-4 pb-10 md:px-8 lg:mx-0">
        {/* Units */}
        <Section title="Units">
          <Row
            label="Temperature unit"
            description="Used everywhere in the app"
          >
            <div className="flex shrink-0 rounded-full border border-white/10 bg-white/10 p-1">
              {["C", "F"].map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => updateSettings({ unit: u })}
                  className={`h-9 w-11 rounded-full text-sm font-semibold transition ${
                    settings.unit === u
                      ? "bg-white text-slate-900 shadow"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  °{u}
                </button>
              ))}
            </div>
          </Row>
        </Section>

        {/* Startup */}
        <Section title="When the app opens">
          <Row
            label="Use my current location"
            description="Ask the browser for your location on startup"
          >
            <Toggle
              checked={settings.useLocation}
              onChange={(value) => updateSettings({ useLocation: value })}
            />
          </Row>

          <div>
            <label htmlFor="default-city" className="text-sm font-medium">
              Default city
            </label>

            <p className="mt-0.5 text-xs text-slate-300">
              Shown when location is off or can't be found
            </p>

            <input
              id="default-city"
              type="text"
              value={settings.defaultCity}
              onChange={(e) => updateSettings({ defaultCity: e.target.value })}
              placeholder="e.g. Lahore"
              className="mt-3 w-full rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-400 outline-none transition focus:border-sky-300/50 focus:bg-white/15 focus:ring-4 focus:ring-sky-400/20"
            />
          </div>
        </Section>

        {/* Data */}
        <Section title="Data">
          <Row
            label="Saved cities"
            description={`${savedCities.length} saved on this device`}
          >
            <button
              type="button"
              onClick={handleClear}
              disabled={savedCities.length === 0}
              className="flex shrink-0 items-center gap-2 rounded-full border border-red-300/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 size={15} />
              Clear all
            </button>
          </Row>
        </Section>
      </main>
    </div>
  );
}

export default Settings;
