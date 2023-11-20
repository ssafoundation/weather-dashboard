import { Button, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const DataVisualization = () => {
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("London");
  const [error, setError] = useState(null);

  //-- api key --------
  const apiKey = "31e618eacc32c5120abf649973fe9e73";
  //-- api url --------
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  //-- Data fetch --------
  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setForecast(response.data.list);
      setError(null);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
      setForecast([]);
      setError("Invalid or non-existent location. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);
  // ----Handle  Search --------
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  // ----Handle Search --------
  const handleSearch = () => {
    fetchData();
  };

  const processData = () => {
    const dailyData = {};
    forecast.forEach((data) => {
      const date = new Date(data.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = { high: -Infinity, low: Infinity };
      }
      if (data.main.temp_max > dailyData[date].high) {
        dailyData[date].high = data.main.temp_max;
      }
      if (data.main.temp_min < dailyData[date].low) {
        dailyData[date].low = data.main.temp_min;
      }
    });
    return Object.keys(dailyData).map((date) => ({
      date,
      high: dailyData[date].high,
      low: dailyData[date].low,
    }));
  };

  const chartData = {
    options: {
      chart: {
        type: "area",
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Temperature (°C)",
        },
      },
      title: {
        text: "5-Day Weather Forecast",
      },
    },
    series: [
      {
        name: "High Temperature",
        data: processData().map((data) => ({
          x: new Date(data.date).getTime(),
          y: data.high,
        })),
      },
      {
        name: "Low Temperature",
        data: processData().map((data) => ({
          x: new Date(data.date).getTime(),
          y: data.low,
        })),
      },
    ],
  };

  return (
    <div className="App">
      <div className="weather-search-city">
        <Input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default DataVisualization;
