import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import authRouter from "./routes/authRoutes";
import morgan from "morgan";
import cookieParser from "cookie-parser";

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

export default app;
