import { Router } from "express";
import * as companyController from "../controllers/companyController";
import multer from "multer";
import { attachUserId, authorizeRole } from "../middlewares/authMiddleware";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const companyRouter = Router();

// companyRouter.use(attachUserId);

companyRouter.get("/", attachUserId, companyController.getAllCompanies);
companyRouter.post(
    "/",
    attachUserId,
    authorizeRole(["employer"]),
    upload.any(),
    companyController.createCompany
);
companyRouter.delete(
    "/:id",
    attachUserId,
    authorizeRole(["employer", "admin"]),
    companyController.deleteCompany
);
companyRouter.put(
    "/:id",
    attachUserId,
    authorizeRole(["employer"]),
    upload.any(),
    companyController.updateCompany
);
companyRouter.get("/:companyId", attachUserId, companyController.getACompany);

export default companyRouter;
