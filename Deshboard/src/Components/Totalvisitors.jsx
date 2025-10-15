import React from "react";
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
import { Line } from "react-chartjs-2";

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

const Totalvisitors = () => {
  const [hover, setHover] = useState(false);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Total Visitors",
        data: [1000, 1200, 800, 1500, 1100],
        borderColor: "#1E90FF",
        backgroundColor: "rgba(30, 144, 255, 0.2)",
        fill: {
          target: "origin",
          above: "rgba(30, 144, 255, 0.3)", 
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
          <div className="rounded-full bg-[#1E90FF] p-2 text-white">👥</div>
          <div>
            <p className="text-sm text-gray-600">Total Visitors</p>
            <p className="text-2xl font-bold">12,350</p>
          </div>
          <div className="ml-auto flex items-center text-sm font-semibold text-[#1E90FF]">
            ⬆️ 3.25%
          </div>
        </div>
        <div className="mt-2 h-16">
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default Totalvisitors;
