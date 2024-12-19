import { Router } from "express";
import * as authController from "../controllers/authController";
import { attachUserId, authorizeRole } from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/forgotPassword", authController.forgotPassword);
authRouter.patch("/resetPassword/:token", authController.resetPassword);

authRouter.post("/logout", authorizeRole(), authController.logout);
authRouter.post("/change-password",authorizeRole(), authController.changePassword);
authRouter.delete("/me",authorizeRole(), authController.deleteMe);
authRouter.get("/me",authorizeRole(), authController.getMe);
authRouter.post("/me",authorizeRole(), authController.updateMe);

export default authRouter;
