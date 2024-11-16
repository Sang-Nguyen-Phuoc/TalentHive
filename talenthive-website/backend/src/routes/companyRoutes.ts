import { Router } from "express";

import * as companyController from "../controllers/companyController";
import { attachUserId, authorizeRole } from "../middlewares/authMiddleware";

const router = Router();

router.use(attachUserId);

router.get("/:companyId", authorizeRole(["candidate", "employer", "admin"]), companyController.getACompany);

export default router;