import { Router } from "express";
import * as authController from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", authController.register);
router.post("/login",  authController.login);
router.post("/logout",  authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.delete("/me", authController.deleteMe);

router.use(protect);
router.post("/changePassword", authController.changePassword);
router.get("/me", authController.getCurrentUserProfile);

export default router;