import Enrollment from "../models/Enrollment.model.js";
import { errorHandler } from "../utils/error.js";

const getEnrollmentData = async (year) => {
  const enrollments = await Enrollment.find({
    date: {
      $gte: new Date(`${year}-01-01`), // Start of the year
      $lt: new Date(`${year + 1}-01-01`), // Start of the next year
    },
  });

  const groupByMonth = {};

  enrollments.forEach((enrollment) => {
    const date = new Date(enrollment.date);
    const month = date.getMonth() + 1;

    if (!groupByMonth[month]) {
      groupByMonth[month] = 0;
    }

    groupByMonth[month] += enrollment.newEnrollmentsCount;
  });

  // Format the response as an array of objects with month and count
  const res = Object.keys(groupByMonth).map((month) => ({
    month: parseInt(month), // Convert month to integer
    count: groupByMonth[month], // Total enrollments for that month
  }));
  return res;
};

export const enrollmentOverview = async (req, res, next) => {
  const { year } = req.query;

  if (!year) {
    return next(new errorHandler(400, "Year is required"));
  }

  try {
    const data = await getEnrollmentData(parseInt(year));
    res.json(data);
  } catch (error) {
    next(error);
  }
};
