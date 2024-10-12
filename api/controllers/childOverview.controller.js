import Child from "../models/Child.model.js";

export const childOverview = async (req, res, next) => {
  const total = await Child.countDocuments();
  const registered = await Child.countDocuments({ status: "registered" });
  const active = await Child.countDocuments({ status: "active" });
  const inactive = await Child.countDocuments({ status: "inactive" });

  res.json({ total, registered, active, inactive });
};
