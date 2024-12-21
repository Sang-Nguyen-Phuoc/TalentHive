import { Router } from "express";
import { authorizeRole } from "../middlewares/authMiddleware";

import * as employerController from "../controllers/employerController";

const employerRouter = Router();

employerRouter.get("/", employerController.getAllEmployers);
employerRouter.get("/:id", employerController.getEmployer);

employerRouter.put("/", authorizeRole(["employer"]), employerController.updateEmployer);
employerRouter.delete("/:employerId", authorizeRole(["admin"]), employerController.deleteEmployerById);

export default employerRouter;
