import Financial from "../models/financial.model.js";
import { errorHandler } from "../utils/error.js";

const calculateProfitMargin = (income, revenue) => {
  return revenue > 0 ? (income / revenue) * 100 : 0;
};

export const financialOverView = async (req, res, next) => {
  try {
    // Get the date 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Find all records from the last 30 days
    const records = await Financial.find({
      date: { $gte: thirtyDaysAgo },
    });

    let totalRevenue = 0;
    let totalExpenses = 0;
    records.forEach((record) => {
      totalRevenue += record.revenue;
      totalExpenses += record.expenses;
    });

    const income = totalRevenue - totalExpenses;
    const profitMargin = calculateProfitMargin(income, totalRevenue);

    res.json({
      totalRevenue,
      totalExpenses,
      income,
      profitMargin: `${profitMargin.toFixed(0)}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
