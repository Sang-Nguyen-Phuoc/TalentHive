import { Router } from "express";
import { attachUserId, authorizeRole } from "../middlewares/authMiddleware";

import * as employerController from "../controllers/employerController";

const employerRouter = Router();

// employerRouter.use(attachUserId);
employerRouter.get("/", attachUserId, employerController.getAllEmployers);
employerRouter.put(
    "/",
    attachUserId,
    authorizeRole(["employer"]),
    employerController.updateEmployer
);
employerRouter.delete("/:employerId", attachUserId, employerController.deleteEmployerById);

export default employerRouter;
