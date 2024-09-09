import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { postJob , getAllJobs, getASingleJob, getMyJobs, deleteJob } from "../controllers/jobController.js";

const router = express.Router();

router.post("/post", isAuthenticated, isAuthorized("Employer"), postJob);
router.get("/Getall", getAllJobs);
router.get("/Getmyjobs", isAuthenticated, isAuthorized("Employer"), getMyJobs);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Employer"), deleteJob);
router.get("/Get/:id", getASingleJob)


export default router;
