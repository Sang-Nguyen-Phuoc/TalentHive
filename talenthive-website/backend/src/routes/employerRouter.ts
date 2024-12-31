import { Router } from "express";
import { authorizeRole, handleUploadAvatar, preserveBodyMiddleware } from "../middlewares/authMiddleware";

import * as employerController from "../controllers/employerController";
import multer from "multer";

const employerRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 1 } });

employerRouter.post(
    "/update",
    authorizeRole(["employer"]),
    preserveBodyMiddleware,
    upload.any(),
    handleUploadAvatar,
    employerController.updateEmployerInfo
);
employerRouter.get("/", employerController.getAllEmployers);
employerRouter.get("/:id", employerController.getEmployer);

employerRouter.put("/", authorizeRole(["employer"]), employerController.updateEmployer);
employerRouter.delete("/:employerId", authorizeRole(["admin"]), employerController.deleteEmployerById);

export default employerRouter;
