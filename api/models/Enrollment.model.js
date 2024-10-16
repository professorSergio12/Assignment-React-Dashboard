import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  newEnrollmentsCount: {
    type: Number,
    required: true,
  },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
