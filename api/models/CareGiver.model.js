import mongoose from "mongoose";

const CareGiverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["registered", "active", "inactive"],
      required: true,
    },
    enrollmentYear: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const CareGiver = mongoose.model("CareGiver", CareGiverSchema);
export default CareGiver;
