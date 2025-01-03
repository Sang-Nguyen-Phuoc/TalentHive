import { Router } from "express";
import * as authController from "../controllers/authController";
import { authorizeRole, handleUploadAvatar, preserveBodyMiddleware } from "../middlewares/authMiddleware";
import multer from "multer";

const authRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 1 } });

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/forgotPassword", authController.forgotPassword);
authRouter.patch("/resetPassword/:token", authController.resetPassword);

authRouter.post("/logout", authorizeRole(), authController.logout);
authRouter.post("/change-password", authorizeRole(), authController.changePassword);
authRouter.delete("/me", authorizeRole(), authController.deleteMe);
authRouter.get("/me", authorizeRole(), authController.getMe);
authRouter.post(
    "/me",
    authorizeRole(),
    preserveBodyMiddleware,
    upload.any(),
    handleUploadAvatar,
    authController.updateMe
);

authRouter.post("/upload-photo", authorizeRole(), preserveBodyMiddleware, upload.any(), (req, res, next) => {
    req.body = { ...(req as any).savedBody, ...req.body };
    console.log(Object.keys(req.body || {}));

    const key = Object.keys((req.files as any)[0] || {});
    res.status(200).json({
        status: "success",
        data: {
            photo: null,
            key: key || null,
        },
    });
});

export default authRouter;
