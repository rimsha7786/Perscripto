import express from "express";

import {
  addDoctor,
  allDoctors,
  loginAdmin,
  appointments
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post(
    "/add-doctor",
    authAdmin,
    upload.single("image"),
    addDoctor
);

adminRouter.post(
    "/all-doctors",
    authAdmin,
    allDoctors
);

adminRouter.post(
    "/login",
    loginAdmin
);
//change route
adminRouter.post(
    "/change-availability",
    authAdmin,changeAvailability
);
adminRouter.get(
    "/appointments",
    authAdmin,appointments
);
export default adminRouter;