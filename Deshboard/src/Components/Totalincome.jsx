import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const Totalincome = () => {
  const [hover, setHover] = useState(false);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Income",
        data: [500, 700, 300, 900, 600],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        fill: {
          target: "origin",
          above: "rgba(239, 68, 68, 0.3)", 
        },
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: hover },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };
  return (
    <>
      <div
        className="relative w-[330px] rounded-xl bg-white p-4 shadow-md transition hover:shadow-lg"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-red-500 p-2 text-white">💰</div>
          <div>
            <p className="text-sm text-gray-600">Total Income</p>
            <p className="text-2xl font-bold">52,730</p>
          </div>
          <div className="ml-auto flex items-center text-sm font-semibold text-red-600">
            ⬆️ 2.34%
          </div>
        </div>
        <div className="mt-2 h-16">
          <Line data={data} options={options} />
        </div>
        {hover && (
          <div className="absolute left-0 top-12 rounded-md bg-white p-2 text-xs text-gray-700 shadow-md">
            Income increased by 2.34% this month.
          </div>
        )}
      </div>
    </>
  );
};

export default Totalincome;
