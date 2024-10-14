import CareGiver from "../models/CareGiver.model.js";
import { errorHandler } from "../utils/error.js";

const getDataByEnrollmentYear = async (enrollmentYear) => {
    // console.log(enrollmentYear)
  try {
    const result = await CareGiver.aggregate([
      {
        $match: {
          enrollmentYear: enrollmentYear,
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalRegistered: {
            $sum: { $cond: [{ $eq: ["$status", "registered"] }, 1, 0] },
          },
          totalActive: {
            $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
          },
          totalInactive: {
            $sum: { $cond: [{ $eq: ["$status", "inactive"] }, 1, 0] },
          },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    return result;
  } catch (err) {
    throw new Error("Error fetching data by enrollment year: " + err.message);
  }
};

export const CareGiverOverview = async (req, res, next) => {
  const { year } = req.query;
//   console.log(year);

  if (!year) {
    return next(new errorHandler(400, "Year is required"));
  }

  try {
    const data = await getDataByEnrollmentYear(parseInt(year));
    res.json(data);
  } catch (error) {
    next(error);
  }
};
