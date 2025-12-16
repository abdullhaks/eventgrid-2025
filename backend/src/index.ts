import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import adminRouter from "./routes/adminRoutes";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [process.env.CLIENT_URL as string,"http://localhost:5173","https://eventgrid-2025.vercel.app/"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  })
);

app.get("/", (req, res) => {
  res.send("my health is running....");
});

connectDB();

app.use(express.json());
app.use(cookieParser());


app.use('/api/user',userRouter);
app.use('/api/admin',adminRouter);




app.listen(port, () => {
  console.log(`MyHealth is running on port 3000 http://localhost:${port}`);
});

