import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../.env") });
import connectToDatabase from "./database/config";
connectToDatabase();
import app from "./app";


const port = parseInt(process.env.PORT || "3002", 10);
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
