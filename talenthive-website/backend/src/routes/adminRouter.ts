import { Router } from "express";

import * as adminController from "../controllers/adminController";

const adminRouter = Router();

// adminRouter.use(authorizeRole(["admin"]));



adminRouter.get("/monthly-logins", adminController.monthlyLogins);

adminRouter.get("/overview", adminController.overview);

adminRouter.get("/activities", adminController.getActivitiesTrendData);

adminRouter.get("/logs", adminController.getLogs);


export default adminRouter;
