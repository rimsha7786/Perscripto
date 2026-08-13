import express from "express";
import { doctorList } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.post("/test", (req, res) => {
    res.json({
        success: true,
        message: "Doctor route working"
    });
});

doctorRouter.post("/list", doctorList);

export default doctorRouter;