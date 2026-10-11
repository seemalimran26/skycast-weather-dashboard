import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Locations from "./pages/Locations";
import Settings from "./pages/Settings";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = () => setMenuOpen(true);

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="relative isolate flex min-h-screen overflow-x-hidden bg-slate-950 text-white">
          <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

          <Routes>
            <Route path="/" element={<Dashboard onMenuClick={openMenu} />} />
            <Route
              path="/locations"
              element={<Locations onMenuClick={openMenu} />}
            />
            <Route
              path="/settings"
              element={<Settings onMenuClick={openMenu} />}
            />
            {/* Unknown URL -> Dashboard */}
            <Route path="*" element={<Dashboard onMenuClick={openMenu} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
