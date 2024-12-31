import { Router } from "express";
import * as applicationController from "../controllers/applicationController";
import { authorizeRole } from "../middlewares/authMiddleware";

const applicationRouter = Router();

applicationRouter.post(
    "/jobs/:jobId/applications/:applicationId",
    authorizeRole(["employer"]),
    applicationController.rejectOrAcceptApplication
);

applicationRouter.get("/applied-jobs", authorizeRole(["candidate"]), applicationController.getMyAppliedJobs);
applicationRouter.get("/:applicationId", authorizeRole(["candidate"]), applicationController.getApplication);
applicationRouter.delete("/:applicationId", authorizeRole(["candidate"]), applicationController.deleteApplication);
applicationRouter.get("/jobs/:jobId", authorizeRole(["candidate"]), applicationController.getApplicationForJob);

export default applicationRouter;