import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Progress = () => {
  // Placeholder data for the graph
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Range of Motion (°)",
        data: [80, 90, 100, 110, 120],
        borderColor: "#0D47A1",
        backgroundColor: "rgba(13, 71, 161, 0.2)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Pain Level",
        data: [7, 5, 4, 3, 2],
        borderColor: "#FF5252",
        backgroundColor: "rgba(255, 82, 82, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      {/* Page Header */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: "#0D47A1" }}>
          Progress Overview
        </h1>
        <p className="text-gray-700">
          Track your recovery progress, metrics, and estimated recovery time.
        </p>
      </section>

      {/* Estimated Recovery Section */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#0D47A1" }}>
            Estimated Recovery Time
          </h2>
          <p className="text-gray-700">
            Your recovery is expected to take <strong>6–12 months</strong>. This
            estimate will adjust based on your progress and therapist feedback.
          </p>
        </div>
      </section>

      {/* Metrics Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2" style={{ color: "#0D47A1" }}>
            Range of Motion
          </h3>
          <p className="text-gray-700">120°</p>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2" style={{ color: "#0D47A1" }}>
            Pain Level
          </h3>
          <p className="text-gray-700">2 / 10</p>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2" style={{ color: "#0D47A1" }}>
            Quadriceps Strength
          </h3>
          <p className="text-gray-700">85%</p>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2" style={{ color: "#0D47A1" }}>
            Adherence
          </h3>
          <p className="text-gray-700">90%</p>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2" style={{ color: "#0D47A1" }}>
            Flexion
          </h3>
          <p className="text-gray-700">120°</p>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2" style={{ color: "#0D47A1" }}>
            Extension
          </h3>
          <p className="text-gray-700">0°</p>
        </div>
      </section>

      {/* Graph Section */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#0D47A1" }}>
            Progress Graph
          </h2>
          <div className="w-full h-96">
            <Line data={data} options={options} />
          </div>
        </div>
      </section>

      {/* Historical Data Table */}
      <section>
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#0D47A1" }}>
            Historical Data
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Week</th>
                <th className="border border-gray-300 px-4 py-2">Pain Level</th>
                <th className="border border-gray-300 px-4 py-2">ROM (°)</th>
                <th className="border border-gray-300 px-4 py-2">
                  Quadriceps Strength (%)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Week 1</td>
                <td className="border border-gray-300 px-4 py-2">7</td>
                <td className="border border-gray-300 px-4 py-2">80°</td>
                <td className="border border-gray-300 px-4 py-2">60%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Week 2</td>
                <td className="border border-gray-300 px-4 py-2">5</td>
                <td className="border border-gray-300 px-4 py-2">90°</td>
                <td className="border border-gray-300 px-4 py-2">65%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Week 3</td>
                <td className="border border-gray-300 px-4 py-2">4</td>
                <td className="border border-gray-300 px-4 py-2">100°</td>
                <td className="border border-gray-300 px-4 py-2">70%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Progress;
