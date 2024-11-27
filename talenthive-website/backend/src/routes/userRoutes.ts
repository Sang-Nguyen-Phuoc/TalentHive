import { Request, Response, Router } from "express";
import * as userController from "../controllers/userController";
import { attachUserId, authorizeRole } from "../middlewares/authMiddleware";

const userRouter = Router();

// userRouter.get("/", userController.getAllUsers);
// userRouter.get("/:id", userController.getUserById);
// userRouter.post("/", userController.createUser);
// userRouter.put("/:id", userController.updateUser);

userRouter.post('/admin', userController.createAdmin);

userRouter.use(attachUserId);


userRouter.route("/")
        .delete(authorizeRole(['admin']), userController.deleteUser);
userRouter.post('/lock', authorizeRole(['admin']), userController.lockUser);


export default userRouter;