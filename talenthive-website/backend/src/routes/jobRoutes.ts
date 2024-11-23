import { Router } from "express";

import * as jobController from "../controllers/jobController";
import { attachUserId, authorizeRole } from "../middlewares/authMiddleware";

const router = Router();

router.use(attachUserId);

router.post("/", authorizeRole(["employer"]), jobController.createJob);
router.put("/:jobId", authorizeRole(["employer"]), jobController.updateJob);
router.delete("/:jobId", authorizeRole(["employer", "admin"]), jobController.deleteJob);
router.get("/", authorizeRole(["candidate", "employer", "admin"]), jobController.getAllJobs);
router.get("/:jobId", authorizeRole(["candidate", "employer", "admin"]), jobController.getAJob);

router.post("/:jobId/apply", authorizeRole(["candidate"]), jobController.applyForJob);
router.put("/:jobId/application/:applicationId", authorizeRole(["candidate"]), jobController.updateApplication);

export default router;
