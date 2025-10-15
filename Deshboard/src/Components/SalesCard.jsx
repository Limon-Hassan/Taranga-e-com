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

const salesCard = () => {
  const [hover, setHover] = useState(false);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [200, 400, 150, 600, 350],
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        fill: {
          target: "origin",
          above: "rgba(34, 197, 94, 0.3)", 
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
          <div className="rounded-full bg-green-500 p-2 text-white">🛍️</div>
          <div>
            <p className="text-sm text-gray-600">Total Sales</p>
            <p className="text-2xl font-bold">34,945</p>
          </div>
          <div className="ml-auto flex items-center text-sm font-semibold text-green-600">
            ⬆️ 1.56%
          </div>
        </div>
        <div className="mt-2 h-16">
          <Line data={data} options={options} />
        </div>
        {hover && (
          <div className="absolute left-0 top-12 rounded-md bg-white p-2 text-xs text-gray-700 shadow-md">
            Sales increased by 1.56% this month.
          </div>
        )}
      </div>
    </>
  );
};

export default salesCard;
