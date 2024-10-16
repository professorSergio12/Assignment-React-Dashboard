import React, { useEffect, useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register the components needed for the Bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

export default function EnrollmentsRecord() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2023");

  const fetchData = async (year) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/user/dashboard/enrollmentOverview?year=${year}`,
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
      console.log(result);
      setData(result); // Set the fetched data
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  // Prepare data for the Bar chart
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const counts = Array(12).fill(0); // Initialize counts for each month

  // Populate counts based on fetched data
  data.forEach((item) => {
    const monthIndex = item.month - 1; // Adjust month (1-12) to (0-11)
    counts[monthIndex] = item.count; // Assign count to the corresponding month
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        barThickness: 25,
        maxBarThickness: 30,
        minBarLength: 15,
        data: counts,
        backgroundColor: "rgb(127, 0, 255)",
        borderWidth: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to fill the container
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="flex flex-col w-full h-full p-5 bg-[#F5F5F5] border border-gray-300 rounded-lg shadow-lg dark:bg-[#28282B]">
      <div className="flex justify-between">
        <div className="flex text-black font-semibold dark:text-white">
          <span className="py-1 px-1">
            <BsFillPersonPlusFill />
          </span>
          Enrollments Record
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
        <p className="text-center text-gray-500 dark:text-white">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Failed to load data.</p>
      ) : data.length > 0 ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-full h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No data available</p>
      )}
    </div>
  );
}
