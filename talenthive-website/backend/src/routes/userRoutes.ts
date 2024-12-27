import { Request, Response, Router } from "express";
import * as userController from "../controllers/userController";
import { attachUserId, authorizeRole } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.route("/").delete(authorizeRole(["admin"]), userController.deleteUser);
userRouter.post("/lock", authorizeRole(["admin"]), userController.lockUser);
userRouter.post("/unlock", authorizeRole(["admin"]), userController.unlockUser);
userRouter.post("/admin", userController.createAdmin);
userRouter.get("/candidates", authorizeRole(["admin"]), userController.getCandidates);
userRouter.get("/employers", authorizeRole(["admin"]), userController.getEmployers);
userRouter.post("/follow/:companyId", userController.followCompany);
userRouter.delete("/unfollow/:companyId", userController.unfollowCompany);
userRouter.get("/followed", userController.getFollowedCompanies);

userRouter.get("/:id", userController.getUser);

export default userRouter;
