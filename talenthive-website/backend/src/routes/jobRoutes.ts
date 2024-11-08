import { Router } from "express";
import * as jobController from "../controllers/jobController";

const router = Router();

router.get("/", jobController.getAllJobs);


export default router;