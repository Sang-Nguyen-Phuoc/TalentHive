import { Router } from "express";

import * as jobController from "../controllers/jobController";
import { attachUserId, authorizeRole } from "../middlewares/authMiddleware";
import { validateJobFields, trimJobFields, validateMissingJobFields } from "../middlewares/jobMiddleware";
import { validateApplicationFields, validateMissingApplicationFields } from "../middlewares/applicationMiddleware";

const jobRouter = Router();

jobRouter.get("/search", trimJobFields, validateJobFields, jobController.searchJobs);
jobRouter.get("/public", jobController.getPublicJobList);
jobRouter.get("/employer", authorizeRole(["employer"]), jobController.getJobListingsByEmployer);

jobRouter.post(
    "/:jobId/apply",
    authorizeRole(["candidate"]),
    validateMissingApplicationFields,
    validateApplicationFields,
    jobController.createApplication
);

jobRouter
    .route("/:jobId/application")
    .get(authorizeRole(["employer", "admin"]), jobController.getAJobApplication)
    .put(authorizeRole(["candidate"]), validateApplicationFields, jobController.updateApplication)
    .delete(authorizeRole(["candidate"]), jobController.deleteApplication);

jobRouter.get("/:jobId/all-applications", authorizeRole(["employer", "admin"]), jobController.getAllJobApplications);

jobRouter.post(
    "/:jobId/application/:response",
    authorizeRole(["employer"]),
    validateApplicationFields,
    jobController.responseToJobApplication
);

jobRouter
    .route("/")
    .get(authorizeRole(), jobController.getJobList)
    .post(authorizeRole(["employer"]), validateMissingJobFields, validateJobFields, jobController.createJob);

jobRouter
    .route("/:jobId")
    .get(jobController.getAJob)
    .put(authorizeRole(["employer"]), validateJobFields, jobController.updateJob)
    .delete(authorizeRole(["employer", "admin"]), jobController.deleteJob);

export default jobRouter;
