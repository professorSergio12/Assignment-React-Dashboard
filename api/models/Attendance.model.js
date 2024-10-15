import mongoose, { mongo } from "mongoose";
import Child from "./Child.model.js";

const attendanceSchema = new mongoose.Schema(
  {
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child", 
      required: true,
    },
    status: {
      type: String,
      enum: ["On-time", "Late", "Absent", "Day-off"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
