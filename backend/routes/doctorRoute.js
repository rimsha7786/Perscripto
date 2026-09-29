import express from "express";
import { doctorList ,loginDoctor} from "../controllers/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.post("/test", (req, res) => {
    res.json({
        success: true,
        message: "Doctor route working"
    });
});
//list
doctorRouter.post("/list", doctorList);
doctorRouter.post('/login',loginDoctor)
export default doctorRouter;