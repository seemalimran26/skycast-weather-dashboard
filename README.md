# SkyCast - Weather Dashboard

SkyCast is a responsive weather dashboard built with React and Tailwind CSS. It provides current weather information, hourly forecasts, daily forecasts, and temperature unit conversion.

## Features

- Search weather by city name
- Celsius (°C) and Fahrenheit (°F) conversion
- Current temperature, humidity, wind speed, pressure, and visibility
- Hourly weather forecast
- 5-day weather forecast
- Error handling for invalid cities, empty searches, and network issues
- Responsive design for mobile, tablet, and desktop
- Mobile-friendly sidebar navigation

## Technologies Used

- React
- Vite
- Tailwind CSS
- JavaScript
- OpenWeather API
- Lucide React

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/seemalimran26/skycast-weather-dashboard.git
cd skycast-weather-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the environment variable

Create a `.env` file in the project root:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

### 4. Start the development server

```bash
npm run dev
```

## Project Structure

```text
src/
├── api/
│   └── openweather.js
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   └── weather/
│       ├── SearchBar.jsx
│       ├── CurrentWeather.jsx
│       ├── ForecastStrip.jsx
│       ├── HourlyStrip.jsx
│       ├── StatCard.jsx
│       └── WeatherIcon.jsx
├── data/
│   └── mockWeather.js
└── pages/
    └── Dashboard.jsx
```

## Repository

GitHub: [seemalimran26/skycast-weather-dashboard](https://github.com/seemalimran26/skycast-weather-dashboard)
