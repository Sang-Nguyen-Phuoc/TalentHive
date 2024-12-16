import { Router } from "express";
import * as savedJobController from "../controllers/savedJobController";

const savedJobRoutes = Router();

savedJobRoutes.get("/", savedJobController.getAllSavedJobs);
savedJobRoutes.post("/", savedJobController.saveJob);
savedJobRoutes.delete("/:id", savedJobController.deleteSavedJob);

export default savedJobRoutes;
