import { Router } from "express";
import * as authController from "../controllers/authController";
import { attachUserId } from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/forgotPassword", authController.forgotPassword);
authRouter.patch("/resetPassword/:token", authController.resetPassword);

authRouter.post("/logout", attachUserId, authController.logout);
authRouter.post("/changePassword", attachUserId, authController.changePassword);
authRouter.delete("/me", attachUserId, authController.deleteMe);
authRouter.get("/me", attachUserId, authController.getMe);

export default authRouter;
