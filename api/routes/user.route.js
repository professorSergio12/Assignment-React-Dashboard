import express from "express";
const router = express.Router();

import { childOverview } from "../controllers/childOverview.controller.js";
import { CareGiverOverview } from "../controllers/CareGiverOverview.controller.js";
import { financialOverView } from "../controllers/financialOverview.controller.js";
import { attendanceOverview } from "../controllers/Attendance.controller.js";
import {enrollmentOverview} from "../controllers/EnrollmentOverview.controller.js"
import { signout } from "../controllers/signout.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

router.get("/dashboard/childOverview", verifyToken, childOverview);
router.get("/dashboard/CareGiverOverview", verifyToken, CareGiverOverview);
router.get("/dashboard/financialOverview", verifyToken, financialOverView);
router.get("/dashboard/attendanceOverview", verifyToken, attendanceOverview);
router.get("/dashboard/enrollmentOverview", verifyToken, enrollmentOverview);

router.post("/signout", signout);

export default router;
