import { Router } from "express";

import * as candidateController from "../controllers/candidateController";
import { authorizeRole, handleUploadAvatar, preserveBodyMiddleware } from "../middlewares/authMiddleware";
import multer from "multer";

const candidateRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 1 } });

candidateRouter.route("/:id").get(candidateController.getCandidate);

candidateRouter.post(
    "/update",
    authorizeRole(["candidate"]),
    preserveBodyMiddleware,
    upload.any(),
    handleUploadAvatar,
    candidateController.updateCandidateInfo
);
candidateRouter.route("/").get(candidateController.getAllCandidates);

export default candidateRouter;
