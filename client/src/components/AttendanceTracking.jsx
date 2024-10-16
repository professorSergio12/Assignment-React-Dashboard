import React, { useEffect, useState } from "react";
import { BsCalendar2DateFill } from "react-icons/bs";
import { Button } from "flowbite-react";
import { TfiStatsUp } from "react-icons/tfi";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function AttendanceTracking() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const isDarkMode = useSelector((state) => state.theme.theme);

  const fetchData = async (year) => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/dashboard/attendanceOverview", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await res.json();
      console.log(result);
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalOnTime = data[0]?.totalOnTime || 0;
  const totalLate = data[0]?.totalLate || 0;
  const totalAbsent = data[0]?.totalAbsent || 0;
  const totalDayOff = data[0]?.totalDayOff || 0;

  const total = totalOnTime + totalAbsent;
  // Data for the Doughnut chart
  const chartData = {
    labels: ["totalOnTime", "totalLate", "totalDayOff", "totalAbsent"],
    datasets: [
      {
        data: [totalOnTime, totalLate, totalDayOff, totalAbsent],
        backgroundColor: ["#7F00FF", "#D70040", "#FF7F50", "#CBC3E3"],
        hoverOffset: 4,
        borderWidth: 1,
      },
    ],
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.restore();

      // Set the text color based on the theme (using Redux dark mode state)
      const textColor = "#518bbb"

      // Display the total at the top
      const totalText = `${total}`;
      const totalTextFontSize = (height / 100).toFixed(0);
      ctx.font = `${totalTextFontSize}em sans-serif`;
      ctx.textBaseline = "middle";
      ctx.fillStyle = textColor; // Use dynamic color for total text

      const totalTextX = Math.round(
        (width - ctx.measureText(totalText).width) / 2
      );
      const totalTextY = height / 2 - 10;

      ctx.fillText(totalText, totalTextX, totalTextY);

      // Display "/2000" just below the total
      const totalLabel = "/2000";
      const labelTextFontSize = (height / 300).toFixed(2);
      ctx.font = `${labelTextFontSize}em sans-serif`;
      ctx.fillStyle = textColor; // Use dynamic color for total label

      const labelTextX = Math.round(
        (width - ctx.measureText(totalLabel).width) / 2
      );
      const labelTextY = height / 2 + 15; // Move it below the total

      ctx.fillText(totalLabel, labelTextX, labelTextY);
      ctx.save();
    },
  };

  const chartOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false, // Hide the legend if you want to use custom dots below
      },
    },
    maintainAspectRatio: false, // Disable aspect ratio to control size
  };

  return (
    <div className="flex-wrap w-full max-w-sm mx-auto p-5 bg-[#F5F5F5] border border-gray-300 rounded-lg shadow-lg dark:bg-[#28282B]">
      <div className="flex justify-between">
        <div className="flex text-black font-semibold dark:text-white">
          <span className="py-1 px-1">
            <BsCalendar2DateFill />
          </span>
          Attendance
        </div>
        <div className="border-2 rounded-md">
          <button className="text-black font-medium p-1  dark:text-white">
            View Stats
          </button>
        </div>
      </div>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300" />

      {/* Doughnut Chart */}
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
          <div className="grid grid-cols-2 gap-2 pb-3 pt-2">
            {/* on time */}
            <div className="flex items-center">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#7F00FF" }}
              ></div>
              <p className="text-lg font-bold text-gray-800 px-1  dark:text-white">
                {totalOnTime}
              </p>
              <p className="text-sm text-gray-400  dark:text-white">on time</p>
            </div>

            {/* late attendance */}
            <div className="flex items-center">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#D70040" }}
              ></div>
              <p className="text-lg font-bold text-gray-800 px-1  dark:text-white">
                {totalLate}
              </p>
              <p className="text-sm text-gray-400  dark:text-white">
                late attendance
              </p>
            </div>

            {/* take day off */}
            <div className="flex items-center">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#FF7F50" }}
              ></div>
              <p className="text-lg font-bold text-gray-800 px-1  dark:text-white">
                {totalDayOff}
              </p>
              <p className="text-sm text-gray-400  dark:text-white">
                take day off
              </p>
            </div>

            {/* not present */}
            <div className="flex items-center">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#CBC3E3" }}
              ></div>
              <p className="text-lg font-bold text-gray-800 px-1  dark:text-white">
                {totalAbsent}
              </p>
              <p className="text-sm text-gray-400  dark:text-white">
                not present
              </p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500  dark:text-white">
          No data available
        </p>
      )}

      <div className=" bg-green-200 border-green-400 rounded-md p-1">
        <div className="flex justify-between">
          <div className="flex text-green-500 font-medium lg:font-semibold">
            <span className="p-1">
              <TfiStatsUp />
            </span>
            16% more than last week attendance
          </div>
        </div>
      </div>
    </div>
  );
}
