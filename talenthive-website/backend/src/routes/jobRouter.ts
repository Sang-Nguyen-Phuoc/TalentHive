import { Router } from "express";

import * as jobController from "../controllers/jobController";
import { authorizeRole } from "../middlewares/authMiddleware";
import { validateJobFields, trimJobFields } from "../middlewares/jobMiddleware";
import { validateApplicationFields, validateMissingApplicationFields } from "../middlewares/applicationMiddleware";

const jobRouter = Router();

jobRouter.get("/search", jobController.searchJobs);
jobRouter.get("/public", jobController.getPublicJobList); // used
jobRouter.get("/employer", authorizeRole(["employer"]), jobController.getJobListingsByEmployer); // used
jobRouter.get("/types", jobController.getJobTypeList); // used
jobRouter.get("/categories", jobController.getJobCategoryList); // used
jobRouter.get("/locations", jobController.getJobLocationList); // used

jobRouter.post("/approve", authorizeRole(["admin"]), jobController.approveJob);
jobRouter.post("/reject", authorizeRole(["admin"]), jobController.rejectJob);


jobRouter.get("/companies/:companyId", jobController.getJobsByCompany); // used

jobRouter.post("/:jobId/apply", authorizeRole(["candidate"]), jobController.createApplication); // used

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
    .post(authorizeRole(["employer"]), jobController.createJob); // used

jobRouter
    .route("/:jobId")
    .get(jobController.getAJobById) // used
    .put(authorizeRole(["employer"]), jobController.updateJob) // used
    .delete(authorizeRole(["employer", "admin"]), jobController.deleteJob); // used


export default jobRouter;
