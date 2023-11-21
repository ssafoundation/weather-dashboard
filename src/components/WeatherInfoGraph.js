import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const WeatherInfoGraph = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const apiKey = "31e618eacc32c5120abf649973fe9e73";
  const city = "London";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setCurrentWeather(response.data);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, [apiUrl]);

  const chartData = {
    options: {
      xaxis: {
        categories: ["Temperature", "Humidity", "Wind Speed"],
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      title: {
        text: "Current Weather Conditions",
      },
    },
    series: [
      {
        name: "Temperature",
        data: [currentWeather.main?.temp || 0],
      },
      {
        name: "Humidity",
        data: [currentWeather.main?.humidity || 0],
      },
      {
        name: "Wind Speed",
        data: [currentWeather.wind?.speed || 0],
      },
    ],
  };

  return (
    <div className="App">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default WeatherInfoGraph;
