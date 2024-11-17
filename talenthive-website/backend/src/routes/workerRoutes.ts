import { Router } from "express";
import * as workerController from "../controllers/workerController";

const workerRouter = Router();

workerRouter.route("/").get(workerController.getAllWorkers);

export default workerRouter;