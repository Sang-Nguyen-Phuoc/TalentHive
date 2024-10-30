import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';


const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.use(router);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
