import { Router } from "express";
import * as companyController from "../controllers/companyController";
import multer from "multer";
import { attachUserId, authorizeRole } from "../middlewares/authMiddleware";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const companyRouter = Router();

companyRouter.use(attachUserId);

companyRouter.get("/", companyController.getAllCompanies);
companyRouter.post("/", authorizeRole(["employer"]), upload.any(), companyController.createCompany);
companyRouter.delete("/:id", authorizeRole(["employer", "admin"]), companyController.deleteCompany);
companyRouter.put("/:id", authorizeRole(["employer"]), upload.any(), companyController.updateCompany);

export default companyRouter;