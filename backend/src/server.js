import express from "express";
import taskRoute from "./routes/taskRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import helmet from "helmet";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();

// middlewares
app.use(express.json());

// Chỉ áp dụng CSP cho production
if (process.env.NODE_ENV === "production") {
    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "blob:", "https:"],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https:", "'unsafe-hashes'"],
                connectSrc: ["'self'", "https:"],
                fontSrc: ["'self'", "data:", "https:"],
                objectSrc: ["'none'"],
                mediaSrc: ["'self'"],
            },
        })
    );
}

if (process.env.NODE_ENV !== "production") {
    app.use(cors({ origin: "http://localhost:5173" }));
}

app.use("/api/tasks", taskRoute);



if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server bắt đầu trên cổng ${PORT}`);
    });
});