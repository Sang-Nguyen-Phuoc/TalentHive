import { Router } from "express";

import * as candidateController from "../controllers/candidateController";
import { authorizeRole } from "../middlewares/authMiddleware";

const router = Router();

router.delete("/:id", authorizeRole(["admin"]), candidateController.deleteUserByCandidateId);
router.put("/", candidateController.updateCandidateInfo);
router.route("/").get(candidateController.getAllCandidates);

export default router;