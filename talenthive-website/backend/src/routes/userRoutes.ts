import { Request, Response, Router } from "express";
import * as userController from "../controllers/userController";

const userRouter = Router();

// userRouter.get("/", userController.getAllUsers);
// userRouter.get("/:id", userController.getUserById);
// userRouter.post("/", userController.createUser);
// userRouter.put("/:id", userController.updateUser);

userRouter.route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .delete(userController.deleteUser);

userRouter.route("/:id")
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);





export default userRouter;