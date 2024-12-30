import { Router } from "express";

import * as adminController from "../controllers/adminController";

const adminRouter = Router();

// adminRouter.use(authorizeRole(["admin"]));

adminRouter.get("/monthly-logins", adminController.monthlyLogins);

export default adminRouter;
