import { Request, Response, Router } from "express";
import * as userController from "../controllers/userController";
import { attachUserId, authorizeRole } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.route("/").delete(attachUserId, authorizeRole(["admin"]), userController.deleteUser);
userRouter.post("/lock", attachUserId, authorizeRole(["admin"]), userController.lockUser);
userRouter.post("/unlock", attachUserId, authorizeRole(["admin"]), userController.unlockUser);
userRouter.post("/admin", attachUserId, userController.createAdmin);
userRouter.post("/follow/:companyId", attachUserId, userController.followCompany);
userRouter.delete("/unfollow/:companyId", attachUserId, userController.unfollowCompany);
userRouter.get("/followed", attachUserId, userController.getFollowedCompanies);

userRouter.route("/:id")
    .get(userController.getUser)
export default userRouter;
