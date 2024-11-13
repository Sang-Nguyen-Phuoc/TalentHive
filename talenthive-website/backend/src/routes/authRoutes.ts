import { Router } from "express";
import * as authController from "../controllers/authController";
import { attachUserId, protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", authController.register);
router.post("/login",  authController.login);
router.post("/logout",  authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(attachUserId);

router.post("/changePassword", authController.changePassword);
router.delete("/me", authController.deleteMe);


export default router;