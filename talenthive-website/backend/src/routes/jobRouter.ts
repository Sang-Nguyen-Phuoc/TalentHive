import { Router } from "express";

import * as jobController from "../controllers/jobController";
import { attachUserId, authorizeRole } from "../middlewares/authMiddleware";
import {
    validateJobFields,
    trimJobFields,
    validateMissingJobFields,
} from "../middlewares/jobMiddleware";
import {
    validateApplicationFields,
    validateMissingApplicationFields,
} from "../middlewares/applicationMiddleware";

const jobRouter = Router();

jobRouter.get("/search", trimJobFields, validateJobFields, jobController.searchJobs);

jobRouter.use(attachUserId);

jobRouter.post(
    "/",
    attachUserId,
    authorizeRole(["employer"]),
    validateMissingJobFields,
    validateJobFields,
    jobController.createJob
);
jobRouter.put(
    "/:jobId",
    attachUserId,
    authorizeRole(["employer"]),
    validateJobFields,
    jobController.updateJob
);
jobRouter.delete(
    "/:jobId",
    attachUserId,
    authorizeRole(["employer", "admin"]),
    jobController.deleteJob
);
jobRouter.get(
    "/",
    attachUserId,
    authorizeRole(["candidate", "employer", "admin"]),
    jobController.getAllJobs
);
jobRouter.get(
    "/:jobId",
    attachUserId,
    authorizeRole(["candidate", "employer", "admin"]),
    jobController.getAJob
);

jobRouter.post(
    "/:jobId/apply",
    attachUserId,
    authorizeRole(["candidate"]),
    validateMissingApplicationFields,
    validateApplicationFields,
    jobController.createApplication
);

jobRouter.get(
    "/:jobId/applications",
    attachUserId,
    authorizeRole(["employer", "admin"]),
    jobController.getAllJobApplications
);

jobRouter.put(
    "/:jobId/application",
    attachUserId,
    authorizeRole(["candidate"]),
    validateApplicationFields,
    jobController.updateApplication
);

jobRouter.delete(
    "/:jobId/application",
    attachUserId,
    authorizeRole(["candidate"]),
    jobController.deleteApplication
);

jobRouter.get(
    "/:jobId/application",
    attachUserId,
    authorizeRole(["employer", "admin"]),
    jobController.getAJobApplication
);

jobRouter.post(
    "/:jobId/application/:response",
    attachUserId,
    authorizeRole(["employer"]),
    validateApplicationFields,
    jobController.responseToJobApplication
);

export default jobRouter;
