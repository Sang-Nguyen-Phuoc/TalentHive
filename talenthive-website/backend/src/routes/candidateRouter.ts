import { Router } from "express";

import * as candidateController from "../controllers/candidateController";
import { authorizeRole } from "../middlewares/authMiddleware";

const candidateRouter = Router();

candidateRouter.route("/:id")
    .get(candidateController.getCandidate)

candidateRouter.post("/update",authorizeRole(["candidate"]), candidateController.updateCandidateInfo);
candidateRouter.route("/").get(candidateController.getAllCandidates);



export default candidateRouter;
