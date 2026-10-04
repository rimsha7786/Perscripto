import express from "express";
import { doctorList ,loginDoctor,appointmentsDoctor, doctorDashboard,appointmentComplete, 
    appointmentCancel,doctorProfile,updateDoctorProfile } from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

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
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.get('/appointments-test', (req, res) => {
    res.json({
        success: true,
        message: "Appointments test working"
    });
});

doctorRouter.get('/appointments', authDoctor, appointmentsDoctor);
doctorRouter.get('/dashboard', authDoctor, doctorDashboard);
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete);
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel);
doctorRouter.get('/profile', authDoctor, doctorProfile);
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile);
export default doctorRouter;