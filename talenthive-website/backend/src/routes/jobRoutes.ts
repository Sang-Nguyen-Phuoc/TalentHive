import { Router } from "express";

import * as jobController from "../controllers/jobController";
import { attachUserId, authorizeRole } from "../middlewares/authMiddleware";
import { 
    validateJobFields, 
    trimJobFields,
    validateMissingJobFields } from "../middlewares/jobMiddleware";
import { 
    validateApplicationFields,
    validateMissingApplicationFields } from "../middlewares/applicationMiddleware";

const router = Router();

router.get("/search", trimJobFields, validateJobFields, jobController.searchJobs);

router.use(attachUserId);

router.post("/", authorizeRole(["employer"]), validateMissingJobFields, validateJobFields, jobController.createJob);
router.put("/:jobId", authorizeRole(["employer"]), validateJobFields, jobController.updateJob);
router.delete("/:jobId", authorizeRole(["employer", "admin"]), jobController.deleteJob);
router.get("/", authorizeRole(["candidate", "employer", "admin"]), jobController.getAllJobs);
router.get("/:jobId", authorizeRole(["candidate", "employer", "admin"]), jobController.getAJob);

router.post("/:jobId/apply", 
    authorizeRole(["candidate"]),
    validateMissingApplicationFields, 
    validateApplicationFields, 
    jobController.createApplication);

router.put("/:jobId/application", 
    authorizeRole(["candidate"]), 
    validateApplicationFields, 
    jobController.updateApplication);

router.delete("/:jobId/application", authorizeRole(["candidate"]), jobController.deleteApplication);

router.get("/:jobId/application", authorizeRole(["employer", "admin"]), jobController.getAJobApplication);

export default router;
