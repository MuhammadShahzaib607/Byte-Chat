import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js"
import botRoutes from "./routes/bot.js"
import cookieParser from "cookie-parser"
import { sendRes } from "./utils/responseHandler.js"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(helmet())

app.use("/api/user", authRoutes)
app.use("/api/bot", botRoutes)

app.get("/", (req, res)=> {
    sendRes(res, 200, true, "API Hit Successfully")
})

app.get("/health-check", (req, res)=> {
    sendRes(res, 200, true, "ok")
})

const connectDB = async ()=> {
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log("server connected to DB Successfully")
    } catch (error) {
        console.log(error.message)
    }
}

connectDB();

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

export default app;