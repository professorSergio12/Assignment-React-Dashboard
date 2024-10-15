import React, { useEffect, useState } from "react";
import { MdChildCare } from "react-icons/md";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function ChildOverview() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedYear, setSelectedYear] = useState("2023");

  const fetchData = async (year) => {
    setLoading(true); // Start loading when fetching data
    try {
      const res = await fetch(
        `/api/user/dashboard/childOverview?year=${year}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await res.json();
      setData(result);
      setLoading(false); // Stop loading once data is fetched
    } catch (err) {
      setError(true);
      setLoading(false); // Stop loading on error
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  // Ensure data exists before accessing
  const totalRegistered = data[0]?.totalRegistered || 0;
  const totalActive = data[0]?.totalActive || 0;
  const totalInactive = data[0]?.totalInactive || 0;

  const total = totalRegistered + totalActive + totalInactive;

  // Data for the Doughnut chart
  const chartData = {
    labels: ["Registered", "Active", "Inactive"],
    datasets: [
      {
        data: [totalRegistered, totalActive, totalInactive],
        backgroundColor: ["#8B4000", "#FF7F50", "#F88379"],
        hoverOffset: 4,
        borderWidth: 1,
      },
    ],
  };

  // Custom plugin for displaying "TOTAL" inside the chart
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.restore();

      const labelText = "TOTAL";
      const labelTextFontSize = (height / 300).toFixed(2);
      ctx.font = `${labelTextFontSize}em sans-serif`;
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000";

      const labelTextX = Math.round(
        (width - ctx.measureText(labelText).width) / 2
      );
      const labelTextY = height / 1.8;

      ctx.fillText(labelText, labelTextX, labelTextY);

      const totalText = `${total}`;
      const totalTextFontSize = (height / 100).toFixed(0);
      ctx.font = `${totalTextFontSize}em sans-serif`;

      const totalTextX = Math.round(
        (width - ctx.measureText(totalText).width) / 2
      );
      const totalTextY = height / 2 + 35;

      ctx.fillText(totalText, totalTextX, totalTextY);
      ctx.save();
    },
  };

  const chartOptions = {
    cutout: "70%",
    circumference: 180,
    rotation: 270,
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex-wrap w-full max-w-sm mx-auto p-5 bg-[#F5F5F5] border border-gray-300 rounded-lg shadow-lg">
      <div className="flex justify-between">
        <div className="flex text-black font-semibold">
          <span className="py-1 px-1">
            <MdChildCare />
          </span>
          Children Overview
        </div>
        <div>
          <form>
            <select
              name="year"
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="p-1 rounded-md border-gray-300 text-black"
            >
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </form>
        </div>
      </div>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300" />

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Failed to load data.</p>
      ) : data.length > 0 ? (
        <>
          <div
            className="flex justify-center mt-4 mx-auto"
            style={{ height: "200px", width: "200px" }}
          >
            <Doughnut
              data={chartData}
              options={chartOptions}
              plugins={[centerTextPlugin]}
            />
          </div>
          <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300" />
          <div className="flex justify-between mt-4">
            <div className="text-center">
              <div
                className="w-2 h-2 rounded-full mb-1 mx-auto"
                style={{ backgroundColor: "#8B4000" }}
              />
              <p className="text-sm text-gray-400">Registered</p>
              <p className="text-lg font-bold text-gray-800">
                {totalRegistered}
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-2 h-2 rounded-full mb-1 mx-auto"
                style={{ backgroundColor: "#FF7F50" }}
              />
              <p className="text-sm text-gray-400">Active</p>
              <p className="text-lg font-bold text-gray-800">{totalActive}</p>
            </div>
            <div className="text-center">
              <div
                className="w-2 h-2 rounded-full mb-1 mx-auto"
                style={{ backgroundColor: "#F88379" }}
              />
              <p className="text-sm text-gray-400">Inactive</p>
              <p className="text-lg font-bold text-gray-800">{totalInactive}</p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No data available</p>
      )}
    </div>
  );
}
