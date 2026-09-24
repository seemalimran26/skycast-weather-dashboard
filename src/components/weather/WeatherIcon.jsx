import { Sun, CloudSun, Cloud, CloudRain, CloudLightning, CloudSnow, Moon, Sunset } from "lucide-react";

const icons = {
  sunny: { Icon: Sun, color: "text-amber-300" },
  partly: { Icon: CloudSun, color: "text-yellow-200" },
  cloudy: { Icon: Cloud, color: "text-slate-200" },
  rain: { Icon: CloudRain, color: "text-sky-300" },
  storm: { Icon: CloudLightning, color: "text-violet-300" },
  snow: { Icon: CloudSnow, color: "text-cyan-200" },
  night: { Icon: Moon, color: "text-indigo-200" },
  sunset: { Icon: Sunset, color: "text-orange-300" },
};

function WeatherIcon({ name, size = 32, className = "" }) {
  const { Icon, color } = icons[name] || icons.cloudy;
  return <Icon size={size} strokeWidth={1.75} className={`${color} ${className}`} />;
}

export default WeatherIcon;