import Attendance from "../models/Attendance.model.js";

export const attendanceOverview = async (req, res, next) => {
  try {
    const result = await Attendance.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalOnTime: {
            $sum: { $cond: [{ $eq: ["$status", "On-time"] }, 1, 0] },
          },
          totalLate: {
            $sum: { $cond: [{ $eq: ["$status", "Late"] }, 1, 0] },
          },
          totalAbsent: {
            $sum: { $cond: [{ $eq: ["$status", "Absent"] }, 1, 0] },
          },
          totalDayOff: {
            $sum: { $cond: [{ $eq: ["$status", "Day-off"] }, 1, 0] },
          },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
