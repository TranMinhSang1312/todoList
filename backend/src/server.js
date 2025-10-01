import express from 'express';
import taskRoutes from "./routes/taskRoutes.js";
import { connectDB } from './config/db.js';
import 'dotenv/config';
import cors from 'cors'


const app = express();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5001;

//middleware
app.use(express.json());
app.use(cors(
    { origin: 'http://localhost:5173' }
))

app.use('/api/tasks', taskRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`sever chay tai cong ${PORT}`);
    });
});


