export const mockWeather = {
  city: "Lahore",
  country: "PK",
  temp: 28,
  feelsLike: 30,
  high: 31,
  low: 22,
  condition: "Sunny",
  icon: "sunny",
  humidity: 65,
  windSpeed: 12,
  pressure: 1012,
  visibility: 10,
};

const dayName = (offset) => {
  if (offset === 0) return "Today";
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("en-US", { weekday: "short" });
};

const forecastBase = [
  { icon: "sunny", high: 31, low: 22 },
  { icon: "partly", high: 29, low: 21 },
  { icon: "rain", high: 26, low: 20 },
  { icon: "storm", high: 25, low: 19 },
  { icon: "partly", high: 28, low: 21 },
];

export const mockForecast = forecastBase.map((d, i) => ({
  ...d,
  day: dayName(i),
}));

export const mockHourly = [
  { time: "Now", icon: "sunny", temp: 28 },
  { time: "1 PM", icon: "sunny", temp: 30 },
  { time: "2 PM", icon: "partly", temp: 31 },
  { time: "3 PM", icon: "partly", temp: 30 },
  { time: "4 PM", icon: "cloudy", temp: 29 },
  { time: "5 PM", icon: "cloudy", temp: 27 },
  { time: "6 PM", icon: "sunset", temp: 25 },
  { time: "7 PM", icon: "night", temp: 23 },
];
