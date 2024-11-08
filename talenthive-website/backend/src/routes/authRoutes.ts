import { Router } from "express";
import * as authController from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", authController.register);
router.post("/login",  authController.login);
router.post("/logout",  authController.logout);
router.post("/changePassword", authController.changePassword);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(protect);

export default router;