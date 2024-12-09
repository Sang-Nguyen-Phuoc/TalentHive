import { Router } from "express";

import * as candidateController from "../controllers/candidateController";
import { authorizeRole } from "../middlewares/authMiddleware";

const candidateRouter = Router();

candidateRouter.delete(
    "/:id",
    authorizeRole(["admin"]),
    candidateController.deleteUserByCandidateId
);
candidateRouter.put("/", candidateController.updateCandidateInfo);
candidateRouter.route("/").get(candidateController.getAllCandidates);

export default candidateRouter;
