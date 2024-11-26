import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import jobRouter from "./routes/jobRoutes";
import testRouter from "./routes/testRoutes";
import companyRouter from "./routes/companyRoutes";
import candidateRouter from "./routes/candidateRoutes";
import employerRouter from "./routes/employerRoutes";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utils/appError";

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

app.use('/api/v1/test', testRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler);

export default app;
