import { Request, Response, Router } from "express";
import * as userController from "../controllers/userController";
import { attachUserId, authorizeRole } from "../middlewares/authMiddleware";

const userRouter = Router();


userRouter.use(attachUserId);


userRouter.route("/")
.delete(authorizeRole(['admin']), userController.deleteUser);
userRouter.post('/lock', authorizeRole(['admin']), userController.lockUser);
userRouter.post('/unlock', authorizeRole(['admin']), userController.unlockUser);
userRouter.post('/admin', userController.createAdmin);


export default userRouter;