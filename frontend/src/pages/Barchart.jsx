
/// src/components/BarChart.jsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { io } from "socket.io-client";
import { BASE_URL } from "../config";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const socket = io(`${BASE_URL}`); // Adjust if your backend is hosted elsewhere

function BarChart() {
  const [busData, setBusData] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    fetchBusWiseData();

    // Realtime updates from socket
    socket.on("attendanceUpdated", () => {
      console.log("📡 Attendance updated, refetching chart data...");
      fetchBusWiseData();
    });

    return () => {
      socket.off("attendanceUpdated");
    };
  }, []);

  const fetchBusWiseData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/attendance/bus-wise`);
      setBusData(res.data);
    } catch (err) {
      console.error("Error fetching bus-wise data", err);
    }
  };

  const chartData = {
    labels: busData.map((item) => item._id),
    datasets: [
      {
        label: "Students per Bus",
        data: busData.map((item) => item.studentCount),
        backgroundColor: "#FF8100", // Glowing Orange
        borderRadius: 10,
        barPercentage: 0.6,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedBus({
          busNumber: chartData.labels[index],
          count: chartData.datasets[0].data[index],
        });
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1a1a1a",
        titleColor: "#ffffff",
        bodyColor: "#FF8100",
        borderColor: "#FF8100",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#FFFFFF", // Y-axis text color
        },
        grid: {
          color: "#333333",
        },
      },
      x: {
        ticks: {
          color: "#FFFFFF", // X-axis text color
        },
        grid: {
          color: "#333333",
        },
      },
    },
  };

   return (
    <div className="chart-container"       style={{
    height: "300px",
    maxWidth: "2000px",
    margin: "auto",
    background: "#0D0D0D",
    color:'#ffffff',
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    padding: "10px",
    overflow: "hidden",
  }}>
      <Bar data={chartData} options={options} />
      {selectedBus && (
        <div className="bus-info">
          🚌 Bus {selectedBus.busNumber}: {selectedBus.count} Students
        </div>
      )}
    </div>
  );
}

export default BarChart;