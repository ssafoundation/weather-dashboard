import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const FiveDaysForcast = () => {
  const [forecast, setForecast] = useState([]);
  const apiKey = "31e618eacc32c5120abf649973fe9e73";
  const city = "London";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setForecast(response.data.list);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, [apiUrl]);

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
        data: processData().map((data) => [
          new Date(data.date).getTime(),
          data.high,
        ]),
      },
      {
        name: "Low Temperature",
        data: processData().map((data) => [
          new Date(data.date).getTime(),
          data.low,
        ]),
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

export default FiveDaysForcast;
