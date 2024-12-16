import { Router } from "express";
import { attachUserId, authorizeRole } from "../middlewares/authMiddleware";

import * as employerController from "../controllers/employerController";

const employerRouter = Router();

employerRouter.get("/", employerController.getAllEmployers);
employerRouter.put("/", authorizeRole(["employer"]), employerController.updateEmployer);
employerRouter.delete("/:employerId", authorizeRole(["admin"]), employerController.deleteEmployerById);

export default employerRouter;
