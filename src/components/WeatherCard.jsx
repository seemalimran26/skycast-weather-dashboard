function WeatherCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-500 text-sm">Current Weather</p>
          <h3 className="text-2xl font-bold text-gray-800">
            Lahore, Pakistan
          </h3>
        </div>

        <div className="text-5xl">
          ☀️
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-5xl font-bold text-gray-800">
          28°C
        </h2>
        <p className="text-gray-500 mt-2">
          Sunny
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Temperature</p>
          <p className="text-xl font-semibold text-gray-800 mt-1">
            28°C
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Humidity</p>
          <p className="text-xl font-semibold text-gray-800 mt-1">
            65%
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Wind Speed</p>
          <p className="text-xl font-semibold text-gray-800 mt-1">
            12 km/h
          </p>
        </div>

      </div>

    </div>
  );
}

export default WeatherCard;