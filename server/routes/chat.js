import express from "express"
import { verifyToken } from "../utils/verifyToken.js"
import { getChatHistory } from "../controllers/chat.js"

const router = express.Router()

router.get("/history/:botId", verifyToken, getChatHistory )

export default router;