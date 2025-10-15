import React from "react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const weeklyData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Revenue",
      data: [5000, 7000, 8000, 6000, 9000, 7500, 8500],
      backgroundColor: "#2563eb",
      borderRadius: 4,
    },
    {
      label: "Profit",
      data: [2500, 4000, 5000, 3000, 6000, 4500, 5000],
      backgroundColor: "rgba(37, 99, 235, 0.3)",
      borderRadius: 4,
    },
  ],
};

const monthlyData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  datasets: [
    {
      label: "Revenue",
      data: [20000, 30000, 15000, 22000, 35000, 28000, 9000, 20000],
      backgroundColor: "#2563eb",
      borderRadius: 4,
    },
    {
      label: "Profit",
      data: [10000, 15000, 8000, 14000, 20000, 16000, 5000, 12000],
      backgroundColor: "rgba(37, 99, 235, 0.3)",
      borderRadius: 4,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: true,
      },
      ticks: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      titleColor: "#fff",
      bodyColor: "#fff",
      padding: 8,
      displayColors: false,
    },
  },
};

const Earningchart = () => {
  const [isWeekly, setIsWeekly] = useState(false);
  return (
    <>
      <div className="mt-8 w-full  rounded-2xl bg-white p-4 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Earnings</h2>
          <button
            className="text-gray-500"
            onClick={() => setIsWeekly(!isWeekly)}
          >
            {isWeekly ? "Show Monthly" : "Show Weekly"}
          </button>
        </div>
        <div className="mb-4 flex justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600"></span>
            <span className="text-sm text-gray-600">Revenue</span>
            <span className="text-xl font-bold">
              {isWeekly ? "$8,500" : "$37,802"}
            </span>
            <span className="text-sm text-green-600">▲ 0.56%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-300"></span>
            <span className="text-sm text-gray-600">Profit</span>
            <span className="text-xl font-bold">
              {isWeekly ? "$5,000" : "$28,305"}
            </span>
            <span className="text-sm text-green-600">▲ 0.56%</span>
          </div>
        </div>
        <div className="h-60">
          <Bar data={isWeekly ? weeklyData : monthlyData} options={options} />
        </div>
      </div>
    </>
  );
};

export default Earningchart;
