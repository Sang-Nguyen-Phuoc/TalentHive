import { Router } from "express";

import * as jobController from "../controllers/jobController";

const router = Router();

router.post('/', jobController.createJob)
router.get("/", jobController.getAllJobs);
router.delete("/:jobId", jobController.deleteJob);

export default router;