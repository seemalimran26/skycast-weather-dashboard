import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSnow,
  CloudFog,
  CloudMoon,
  Moon,
} from "lucide-react";

const fallbackIcons = {
  "01d": Sun,
  "01n": Moon,
  "02d": CloudSun,
  "02n": CloudMoon,
  "03d": Cloud,
  "03n": Cloud,
  "04d": Cloud,
  "04n": Cloud,
  "09d": CloudRain,
  "09n": CloudRain,
  "10d": CloudRain,
  "10n": CloudRain,
  "11d": CloudLightning,
  "11n": CloudLightning,
  "13d": CloudSnow,
  "13n": CloudSnow,
  "50d": CloudFog,
  "50n": CloudFog,

  sunny: Sun,
  partly: CloudSun,
  cloudy: Cloud,
  rain: CloudRain,
  storm: CloudLightning,
  snow: CloudSnow,
  mist: CloudFog,
  night: Moon,
  nightCloud: CloudMoon,
};

function WeatherIcon({ name, size = 32, className = "" }) {
  const isOpenWeatherCode = /^[0-9]{2}[dn]$/.test(name ?? "");
  const FallbackIcon = fallbackIcons[name] || Cloud;

  if (!isOpenWeatherCode) {
    return <FallbackIcon size={size} className={className} />;
  }

  return (
    <img
      src={`https://openweathermap.org/img/wn/${name}@2x.png`}
      alt=""
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  );
}

export default WeatherIcon;
