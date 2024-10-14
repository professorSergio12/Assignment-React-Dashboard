import mongoose from "mongoose";

const financialSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  revenue: {
    type: Number,
    required: true,
  },
  expenses: {
    type: Number,
    required: true,
  },
});

const Financial = mongoose.model("Financial", financialSchema);
export default Financial;
