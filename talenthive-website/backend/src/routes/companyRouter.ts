import { Router } from "express";
import * as companyController from "../controllers/companyController";
import multer from "multer";
import { authorizeRole, handleUploadAvatar, preserveBodyMiddleware } from "../middlewares/authMiddleware";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const companyRouter = Router();


companyRouter.get("/employer", authorizeRole(["employer"]), companyController.getMyCompanyAsEmployer); // used
companyRouter.post("/update", authorizeRole(["employer"]), preserveBodyMiddleware, upload.any(), handleUploadAvatar, companyController.updateCompanyByEmployer); // used
companyRouter.post("/verify-accession-code", authorizeRole(), companyController.verifyAccessionCode); // used

companyRouter.get("/:id/human-resources", authorizeRole(), companyController.getHumanResources); // used
companyRouter.post("/:id/accession-code", authorizeRole(["employer"]), companyController.generateAccessionCode); // used

companyRouter.route("/")
    .get(companyController.getAllCompanies)
    .post(authorizeRole(["employer"]), preserveBodyMiddleware, upload.any(), handleUploadAvatar, companyController.createCompany); // used

companyRouter.delete(
    "/:id",
    authorizeRole(["employer", "admin"]),
    companyController.deleteCompany
);

companyRouter.get("/:companyId",authorizeRole(), companyController.getACompany);
companyRouter.get("/employer/:employerId", companyController.getACompanyByEmployerId) // used
export default companyRouter;
