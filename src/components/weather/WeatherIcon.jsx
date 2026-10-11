import clearDay from "@meteocons/svg/fill/clear-day.svg";
import clearNight from "@meteocons/svg/fill/clear-night.svg";
import partlyDay from "@meteocons/svg/fill/partly-cloudy-day.svg";
import partlyNight from "@meteocons/svg/fill/partly-cloudy-night.svg";
import cloudy from "@meteocons/svg/fill/cloudy.svg";
import overcast from "@meteocons/svg/fill/overcast.svg";
import rain from "@meteocons/svg/fill/rain.svg";
import dayRain from "@meteocons/svg/fill/partly-cloudy-day-rain.svg";
import nightRain from "@meteocons/svg/fill/partly-cloudy-night-rain.svg";
import dayStorm from "@meteocons/svg/fill/thunderstorms-day-rain.svg";
import nightStorm from "@meteocons/svg/fill/thunderstorms-night-rain.svg";
import snow from "@meteocons/svg/fill/snow.svg";
import fogDay from "@meteocons/svg/fill/fog-day.svg";
import fogNight from "@meteocons/svg/fill/fog-night.svg";

const icons = {
  "01d": clearDay,
  "01n": clearNight,
  "02d": partlyDay,
  "02n": partlyNight,
  "03d": cloudy,
  "03n": cloudy,
  "04d": overcast,
  "04n": overcast,
  "09d": rain,
  "09n": rain,
  "10d": dayRain,
  "10n": nightRain,
  "11d": dayStorm,
  "11n": nightStorm,
  "13d": snow,
  "13n": snow,
  "50d": fogDay,
  "50n": fogNight,

  sunny: clearDay,
  partly: partlyDay,
  cloudy,
  rain,
  storm: dayStorm,
  snow,
  mist: fogDay,
  night: clearNight,
  nightCloud: partlyNight,
};

function WeatherIcon({ name, size = 32, className = "" }) {
  const src = icons[name] || cloudy;

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
    />
  );
}

export default WeatherIcon;
