import mongoose from "mongoose";

const childSchema = new mongoose.Schema({
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
}, { timestamps: true });

const Child = mongoose.model("Child", childSchema);
export default Child;
