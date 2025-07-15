import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import { connectDB } from "./config/db.js";
import noteRoute from "./routes/noteRoute.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config({ debug: false }); // Load environment variables from .env file
const app = express();



app.use(express.json());
// Middleware to parse JSON bodies
app.use(cors({
    origin:"http://localhost:5173",
    
}));
app.use(ratelimiter)//
app.use('/api/notes', noteRoute);

connectDB().then(() => {
    app.listen(process.env.PORT || 5001, () => {
        console.log("Server is running on http://localhost:3000");
    });
})
