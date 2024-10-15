import React, { useEffect, useState } from "react";
import { BiDollarCircle } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";

export default function FinanceOverview() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2023");

  const fetchData = async (year) => {
    try {
      const res = await fetch("/api/user/dashboard/financialOverview", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await res.json();
      // console.log(result);
      setData(result);
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  const revenue = data?.totalRevenue || 0;
  const expenses = data.totalExpenses || 0;
  const income = data?.income || 0;
  const profitMargin = data?.profitMargin || 0;

  return (
    <div className="flex-wrap w-full max-w-sm mx-auto p-3 bg-[#F5F5F5] border border-gray-300 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex text-black font-semibold">
          <span className="py-1 px-1">
            <BiDollarCircle />
          </span>
          Financial Overview
        </div>
      </div>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 pb-3 pt-2">
        {/* Total Revenue */}
        <div className="p-4 border-2 rounded-xl flex flex-col items-start w-full">
          <div className="flex items-center mb-3 border-2 rounded-full px-1.5 bg-slate-200">
            <div
              className="w-2.5 h-2.5 border-3  rounded-full mr-2"
              style={{ backgroundColor: "#8B4000" }}
            ></div>
            <span className="text-sm font-semibold text-black">
              Total Revenue
            </span>
          </div>
          <p className="text-2xl font-bold text-black">${revenue}</p>
          <p className="text-sm text-gray-400">Last 30 days</p>
        </div>

        {/* Profit Margin */}
        <div className="p-4 border-2 rounded-xl flex flex-col items-start w-full">
          <div className="flex items-center mb-3 border-2 rounded-full px-1.5 bg-slate-200">
            <div
              className="w-2.5 h-2.5 border-3  rounded-full mr-2"
              style={{ backgroundColor: "#FFA500" }}
            ></div>
            <span className="text-sm font-semibold text-black">
              Profit Margin
            </span>
          </div>
          <p className="text-2xl font-bold text-black">{profitMargin}%</p>
          <p className="text-sm text-gray-400">Last 30 days</p>
        </div>

        {/* Income */}
        <div className="p-4 border-2 rounded-xl flex flex-col items-start w-full">
          <div className="flex items-center mb-3 border-2 rounded-full px-1.5 bg-slate-200">
            <div
              className="w-2.5 h-2.5 border-3  rounded-full mr-2"
              style={{ backgroundColor: "#4CBB17" }}
            ></div>
            <span className="text-sm font-semibold text-black">Income</span>
          </div>
          <p className="text-2xl font-bold text-black">${income}</p>
          <p className="text-sm text-gray-400">Last 30 days</p>
        </div>

        {/* Total Expenses */}
        <div className="p-4 border-2 rounded-xl flex flex-col items-start w-full">
          <div className="flex items-center mb-3 border-2 rounded-full px-1.5 bg-slate-200">
            <div
              className="w-2.5 h-2.5 border-3  rounded-full mr-2"
              style={{ backgroundColor: "#D22B2B" }}
            ></div>
            <span className="text-sm font-semibold text-black">Expenses</span>
          </div>
          <p className="text-2xl font-bold text-black">${expenses}</p>
          <p className="text-sm text-gray-400">Last 30 days</p>
        </div>
      </div>

      <div className=" bg-slate-200 border-2 rounded-md p-1">
        <div className="flex justify-between ">
          <div className="flex text-slate-600 font-bold lg:font-semibold">
            <span className="p-1">
              <FaInfoCircle />
            </span>
            Check daily to keep it on track
          </div>
        </div>
      </div>
    </div>
  );
}
