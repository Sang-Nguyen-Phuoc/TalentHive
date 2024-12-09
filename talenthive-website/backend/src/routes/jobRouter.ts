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

jobRouter.post(
    "/",
    authorizeRole(["employer"]),
    validateMissingJobFields,
    validateJobFields,
    jobController.createJob
);
jobRouter.put("/:jobId", authorizeRole(["employer"]), validateJobFields, jobController.updateJob);
jobRouter.delete("/:jobId", authorizeRole(["employer", "admin"]), jobController.deleteJob);
jobRouter.get("/", authorizeRole(["candidate", "employer", "admin"]), jobController.getAllJobs);
jobRouter.get("/:jobId", authorizeRole(["candidate", "employer", "admin"]), jobController.getAJob);

jobRouter.post(
    "/:jobId/apply",
    authorizeRole(["candidate"]),
    validateMissingApplicationFields,
    validateApplicationFields,
    jobController.createApplication
);

jobRouter.get(
    "/:jobId/applications",
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
    authorizeRole(["candidate"]),
    jobController.deleteApplication
);

jobRouter.get(
    "/:jobId/application",
    authorizeRole(["employer", "admin"]),
    jobController.getAJobApplication
);

jobRouter.post(
    "/:jobId/application/:response",
    authorizeRole(["employer"]),
    validateApplicationFields,
    jobController.responseToJobApplication
);

export default jobRouter;
