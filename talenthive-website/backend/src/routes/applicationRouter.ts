import { Router } from "express";
import * as applicationController from "../controllers/applicationController";
import { attachUserId, authorizeRole } from "../middlewares/authMiddleware";

const applicationRouter = Router();

applicationRouter.post(
    "/jobs/:jobId/applications/:applicationId",
    authorizeRole(["employer"]),
    applicationController.rejectOrAcceptApplication
);

export default applicationRouter;
