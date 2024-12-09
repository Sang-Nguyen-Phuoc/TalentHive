import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRouter";
import jobRouter from "./routes/jobRouter";
import testRouter from "./routes/testRoutes";
import companyRouter from "./routes/companyRouter";
import candidateRouter from "./routes/candidateRouter";
import employerRouter from "./routes/employerRouter";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utils/appError";
import applicationRouter from "./routes/applicationRouter";
import savedJobRouter from "./routes/savedJobRoutes";
import { StatusCodes } from "http-status-codes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/companies", companyRouter);
app.use("/api/v1/candidates", candidateRouter);
app.use("/api/v1/employers", employerRouter);
app.use("/api/v1/candidates", candidateRouter);
app.use("/api/v1", applicationRouter);
app.use("/api/v1/test", testRouter);

app.use("/api/v1/saved-jobs", savedJobRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, StatusCodes.NOT_FOUND));
});

app.use(globalErrorHandler);

export default app;
