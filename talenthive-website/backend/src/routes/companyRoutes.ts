import { Router } from "express";
import * as companyController from "../controllers/companyController";

const companyRouter = Router();

companyRouter.get("/", companyController.getAllCompanies);

export default companyRouter;