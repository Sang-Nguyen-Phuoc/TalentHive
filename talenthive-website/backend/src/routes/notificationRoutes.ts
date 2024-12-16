import { Router } from "express";
import * as notificationController from "../controllers/notificationController";

const router = Router();

router.put("/:notificationId/markAsRead", notificationController.markNotificationAsRead);

export default router;
