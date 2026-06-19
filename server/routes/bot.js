import express from "express"
import { createBot, createSystemPrompt, editBotData, getAllActiveBots, getBotDetails, getUserBots, handleBotChat, updateBotStatus } from "../controllers/bot.js"
import { verifyToken } from "../utils/verifyToken.js"

const router = express.Router()

router.post("/generate-prompt", verifyToken, createSystemPrompt)
router.post("/create", verifyToken, createBot)
router.post("/send-message", verifyToken, handleBotChat)
router.get("/user-bots", verifyToken, getUserBots)
router.get("/all", verifyToken, getAllActiveBots)
router.patch("/status/:id", verifyToken, updateBotStatus)
router.put("/:id", verifyToken, editBotData)
router.get("/:id", verifyToken, getBotDetails)

export default router;