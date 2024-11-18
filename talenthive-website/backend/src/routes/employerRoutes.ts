import { Router } from "express";
import { attachUserId, authorizeRole } from "../middlewares/authMiddleware";

import * as employerController from "../controllers/employerController";

const employerRouter = Router();

employerRouter.use(attachUserId);
employerRouter.get("/", employerController.getAllEmployers);
employerRouter.put("/" , authorizeRole(['employer']) ,employerController.updateEmployer);

export default employerRouter;