import { Router } from "express";
import * as authController from "../controllers/authController";
import { attachUserId } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", authController.register);
router.post("/login",  authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(attachUserId);

router.post("/logout",  authController.logout);
router.post("/changePassword", authController.changePassword);
router.delete("/me", authController.deleteMe);
router.get("/me", authController.getMe);

export default router;